// lib/socket/socket.io.ts
import { io, type Socket } from "socket.io-client";
import { socketConfig } from "./config";
import { logger } from "@/logger/logger";

let socket: Socket | null = null;

export function getSocketIO(): Socket {
  if (!socket) {
    // Get token from localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    
    socket = io(socketConfig.socketIOUrl, {
      autoConnect: socketConfig.autoConnect,
      withCredentials: true,
      reconnection: socketConfig.reconnection,
      reconnectionAttempts: socketConfig.reconnectionAttempts,
      reconnectionDelay: socketConfig.reconnectionDelay,
      reconnectionDelayMax: socketConfig.reconnectionDelayMax,
      randomizationFactor: socketConfig.randomizationFactor,
      timeout: socketConfig.timeout,
      transports: socketConfig.transports,
      upgrade: socketConfig.upgrade,
      auth: {
        token: token || process.env.NEXT_PUBLIC_SOCKET_TOKEN || "anonymous",
      },
      extraHeaders: {
        "X-Client-Version": "1.0.0",
        "X-Environment": process.env.NODE_ENV || "development",
      },
      forceNew: false,
      rememberUpgrade: true,
      closeOnBeforeunload: true,
      autoUnref: false,
    });

    // Event listeners with proper logging
    socket.on("connect", () => {
      logger.info({ id: socket?.id }, "[Socket.IO] Connected");
    });

    socket.on("connecting", () => {
      logger.info("[Socket.IO] Connecting...");
    });

    socket.on("connect_error", (err) => {
      logger.error({ error: err?.message }, "[Socket.IO] Connection Error");
    });

    socket.on("disconnect", (reason) => {
      logger.warn({ reason }, "[Socket.IO] Disconnected");
    });

    socket.io.on("reconnect_attempt", (attempt) => {
      logger.info({ attempt }, "[Socket.IO] Reconnect Attempt");
    });

    socket.io.on("reconnect_error", (err) => {
      logger.error({ error: err?.message }, "[Socket.IO] Reconnection Error");
    });

    socket.io.on("reconnect_failed", () => {
      logger.error("[Socket.IO] Reconnection Failed - giving up");
    });

    socket.io.on("reconnect", (attempt) => {
      logger.info({ attempt }, "[Socket.IO] Successfully Reconnected");
    });

    socket.io.on("ping", () => {
      logger.debug("[Socket.IO] Ping sent to server");
    });

    // Note: pong event is not available in socket.io client
    // socket.io.on("pong", () => {
    //   logger.debug("[Socket.IO] Pong received");
    // });

    socket.onAny((event, ...args) => {
      logger.debug({ event, args }, `[Socket.IO] Event received: ${event}`);
    });
  }

  return socket;
}

export function closeSocketIO() {
  if (socket) {
    socket.disconnect();
    logger.info("[Socket.IO] Connection closed manually");
    socket = null;
  }
}
