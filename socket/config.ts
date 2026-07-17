// config.ts
export type SocketMode = "socketio" | "websocket";

export interface SocketConfig {
  mode: SocketMode;
  socketIOUrl: string;
  webSocketUrl: string;
  autoConnect: boolean;
  reconnection: boolean;
  reconnectionAttempts: number;
  reconnectionDelay: number;
  reconnectionDelayMax: number;
  randomizationFactor: number;
  timeout: number;
  pingTimeout: number;
  pingInterval: number;
  transports: string[];
  upgrade: boolean;
  perMessageDeflate: boolean;
}

export const socketConfig: SocketConfig = {
  mode: (process.env.NEXT_PUBLIC_SOCKET_MODE as SocketMode) || "websocket",
  socketIOUrl: process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8000",
  webSocketUrl: process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000",
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  randomizationFactor: 0.5,
  timeout: 20000,
  pingTimeout: 5000,
  pingInterval: 25000,
  transports: ["websocket", "polling"],
  upgrade: true,
  perMessageDeflate: true,
};
