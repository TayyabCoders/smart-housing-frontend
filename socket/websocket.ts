// lib/socket/websocket.ts
import { socketConfig } from "./config";
import { logger } from "@/logger/logger";
import { getToken, getUserFromCookies } from "@/lib/cookie/cookie";

let ws: WebSocket | null = null;
let reconnectTimer: NodeJS.Timeout | null = null;
let reconnectAttempts = 0;

export function getWebSocket(): WebSocket | null {
  if (typeof window === "undefined") return null; // SSR guard

  if (!ws || ws.readyState === WebSocket.CLOSED) {
    if (reconnectAttempts >= socketConfig.reconnectionAttempts) {
      logger.error("[WebSocket] Max reconnection attempts reached");
      return null;
    }
    
    // Get token from cookies
    const token = getToken();
    // Use email as user_id to match backend (backend uses email from JWT sub claim)
    const user = getUserFromCookies();
    const user_email = user?.email || "anonymous";
    const client_id = user_email;
    
    // Construct WebSocket URL with client_id and token
    const wsUrl = `${socketConfig.webSocketUrl}/ws/${client_id}${token ? `?token=${token}` : ''}`;
    
    ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      logger.info("[WebSocket] Connected");
      reconnectAttempts = 0;
      if (reconnectTimer) clearTimeout(reconnectTimer);
      reconnectTimer = null;
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        logger.debug({ data }, "[WebSocket] Message received");
        // Emit events similar to Socket.IO for compatibility
        window.dispatchEvent(new CustomEvent("ws:message", { detail: data }));
      } catch (err) {
        logger.debug({ data: event.data }, "[WebSocket] Raw message received");
      }
    };

    ws.onclose = (event) => {
      logger.warn({ code: event.code, reason: event.reason }, "[WebSocket] Disconnected");
      reconnectAttempts++;
      scheduleReconnect();
    };

    ws.onerror = (err) => {
      logger.error({ error: err }, "[WebSocket] Error occurred");
      ws?.close();
    };
  }

  return ws;
}

function scheduleReconnect() {
  if (reconnectTimer || reconnectAttempts >= socketConfig.reconnectionAttempts) return;

  const delay = Math.min(
    socketConfig.reconnectionDelay *
      Math.pow(2, reconnectAttempts) *
      (Math.random() * socketConfig.randomizationFactor + 1),
    socketConfig.reconnectionDelayMax
  );

  reconnectTimer = setTimeout(() => {
    logger.info({ attempt: reconnectAttempts + 1 }, "[WebSocket] Attempting reconnect...");
    ws = null;
    getWebSocket();
  }, delay);
}

export function closeWebSocket() {
  if (ws) {
    ws.close(1000, "Manual close");
    logger.info("[WebSocket] Connection closed manually");
    ws = null;
    reconnectAttempts = 0;
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
  }
}
