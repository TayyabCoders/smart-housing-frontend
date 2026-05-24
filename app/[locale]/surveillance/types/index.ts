export type VehicleStatus = "resident" | "visitor" | "blacklist" | "unknown";
export type FaceStatus = "resident" | "staff" | "visitor" | "blacklist" | "unknown";

export interface VehicleDetection {
  id: string;
  plate: string;
  owner: string;
  flat?: string;
  vehicleType: string;
  status: VehicleStatus;
  camera: string;
  time: string;
  confidence: number;
}

export interface FaceDetection {
  id: string;
  name: string;
  role: string;
  flat?: string;
  status: FaceStatus;
  camera: string;
  time: string;
  confidence: number;
}

export interface AlertItem {
  id: string;
  kind: "blacklist" | "unknown" | "tailgate" | "expired";
  title: string;
  description: string;
  time: string;
  camera: string;
  severity: "high" | "medium" | "low";
}

export interface Camera {
  id: string;
  name: string;
  location: string;
}

export interface BoundingBox {
  id: string;
  x: number; // percent
  y: number;
  w: number;
  h: number;
  label: string;
  confidence: number;
  tone: "success" | "warning" | "danger";
}
