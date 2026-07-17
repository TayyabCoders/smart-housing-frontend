import { useEffect } from "react";
import { useAppDispatch } from "@/redux/store";
import { addMessage, setUserOnline, setUserOffline, updateMessageReadStatus } from "@/redux/slices/chat-slice";
import { getActiveSocket, initializeSocket } from "./index";
import { logger } from "@/logger/logger";
import type { Message } from "@/redux/slices/chat-slice";

export function useChatSocket() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initialize socket if not already initialized
    const socket = initializeSocket();
    
    if (!socket) {
      logger.warn("[ChatSocket] No active socket found");
      return;
    }

    // Handle incoming messages
    const handleMessage = (data: any) => {
      logger.debug({ data }, "[ChatSocket] Message received");

      if (data.type === "chat_message" && data.data) {
        const message: Message = data.data;
        dispatch(addMessage({ 
          userId: message.sender_id, 
          message 
        }));
      }

      if (data.type === "read_receipt" && data.message_id && data.sender_id) {
        dispatch(updateMessageReadStatus({ 
          userId: data.sender_id, 
          messageId: data.message_id 
        }));
      }

      if (data.type === "typing" && data.sender_id) {
        // Handle typing indicator if needed
        logger.debug(`[ChatSocket] User ${data.sender_id} is typing: ${data.is_typing}`);
      }
    };

    // Listen to socket events based on socket type
    if ("on" in socket) {
      // Socket.IO
      socket.on("message", handleMessage);
      socket.on("read_receipt", handleMessage);
      socket.on("typing", handleMessage);
    } else {
      // Native WebSocket
      const handleWebSocketMessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          handleMessage(data);
        } catch (error) {
          logger.error("[ChatSocket] Error parsing WebSocket message:", error);
        }
      };

      socket.addEventListener("message", handleWebSocketMessage);
      
      // Also listen to custom events dispatched by websocket.ts
      const handleCustomEvent = (event: CustomEvent) => {
        handleMessage(event.detail);
      };
      
      window.addEventListener("ws:message", handleCustomEvent as EventListener);

      return () => {
        socket.removeEventListener("message", handleWebSocketMessage);
        window.removeEventListener("ws:message", handleCustomEvent as EventListener);
      };
    }

    // Cleanup for Socket.IO
    return () => {
      if ("off" in socket) {
        socket.off("message", handleMessage);
        socket.off("read_receipt", handleMessage);
        socket.off("typing", handleMessage);
      }
    };
  }, [dispatch]);

  // Send message through socket
  const sendMessage = (receiverId: string, content: string) => {
    const socket = getActiveSocket();
    if (!socket) {
      logger.error("[ChatSocket] No active socket to send message");
      return;
    }

    const payload = {
      type: "chat_message",
      payload: {
        receiver_id: receiverId,
        content,
        timestamp: new Date().toISOString(),
      },
    };

    if ("emit" in socket) {
      // Socket.IO
      socket.emit("chat_message", payload);
    } else if ("send" in socket) {
      // Native WebSocket
      socket.send(JSON.stringify(payload));
    }
  };

  // Send typing indicator
  const sendTypingIndicator = (receiverId: string, isTyping: boolean) => {
    const socket = getActiveSocket();
    if (!socket) return;

    const payload = {
      type: "typing",
      payload: {
        receiver_id: receiverId,
        is_typing: isTyping,
      },
    };

    if ("emit" in socket) {
      socket.emit("typing", payload);
    } else if ("send" in socket) {
      socket.send(JSON.stringify(payload));
    }
  };

  // Send read receipt
  const sendReadReceipt = (messageId: string, senderId: string) => {
    const socket = getActiveSocket();
    if (!socket) return;

    const payload = {
      type: "read_receipt",
      payload: {
        message_id: messageId,
        sender_id: senderId,
      },
    };

    if ("emit" in socket) {
      socket.emit("read_receipt", payload);
    } else if ("send" in socket) {
      socket.send(JSON.stringify(payload));
    }
  };

  return {
    sendMessage,
    sendTypingIndicator,
    sendReadReceipt,
  };
}
