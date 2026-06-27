import { VehicleDetection, FaceDetection, AlertItem, Camera } from "../types";

export const recentVehicles: VehicleDetection[] = [
  { id: "v1", plate: "BLA-123", owner: "Ahmed Khan", flat: "A-203", vehicleType: "Sedan", status: "resident", camera: "Gate 1", time: "10:31 PM", confidence: 98 },
  { id: "v2", plate: "KHI-8821", owner: "Visitor — Foodpanda", vehicleType: "Bike", status: "visitor", camera: "Gate 2", time: "10:24 PM", confidence: 94 },
  { id: "v3", plate: "AEK-554", owner: "Unknown", vehicleType: "Hatchback", status: "unknown", camera: "Gate 1", time: "10:18 PM", confidence: 87 },
  { id: "v4", plate: "BLA-902", owner: "Sara Malik", flat: "C-104", vehicleType: "SUV", status: "resident", camera: "Gate 1", time: "10:11 PM", confidence: 99 },
  { id: "v5", plate: "XYZ-007", owner: "Flagged Vehicle", vehicleType: "Sedan", status: "blacklist", camera: "Gate 2", time: "09:58 PM", confidence: 96 },
  { id: "v6", plate: "BLA-345", owner: "Bilal Qureshi", flat: "B-410", vehicleType: "Bike", status: "resident", camera: "Gate 1", time: "09:47 PM", confidence: 97 },
];

export const recentFaces: FaceDetection[] = [
  { id: "f1", name: "Ali Raza", role: "Resident", flat: "A-302", status: "resident", camera: "Lobby", time: "10:32 PM", confidence: 98 },
  { id: "f2", name: "Hira Sheikh", role: "Resident", flat: "B-201", status: "resident", camera: "Gate 1", time: "10:28 PM", confidence: 96 },
  { id: "f3", name: "Cleaning Staff #14", role: "Staff", status: "staff", camera: "Service Gate", time: "10:21 PM", confidence: 93 },
  { id: "f4", name: "Unknown Person", role: "Unidentified", status: "unknown", camera: "Gate 2", time: "10:15 PM", confidence: 71 },
  { id: "f5", name: "Visitor — Family", role: "Visitor (C-104)", flat: "C-104", status: "visitor", camera: "Gate 1", time: "10:09 PM", confidence: 89 },
  { id: "f6", name: "Flagged Individual", role: "Watchlist", status: "blacklist", camera: "Gate 2", time: "09:54 PM", confidence: 95 },
];

export const alerts: AlertItem[] = [
  { id: "a1", kind: "blacklist", title: "Blacklisted vehicle detected", description: "Plate XYZ-007 attempted entry at Gate 2", time: "09:58 PM", camera: "Gate 2", severity: "high" },
  { id: "a2", kind: "unknown", title: "Unknown face at Gate 2", description: "No identity match. Confidence 71%", time: "10:15 PM", camera: "Gate 2", severity: "medium" },
  { id: "a3", kind: "tailgate", title: "Possible tailgating", description: "Two faces detected during single entry", time: "10:02 PM", camera: "Lobby", severity: "medium" },
  { id: "a4", kind: "expired", title: "Expired visitor pass", description: "Visitor for B-110 exceeded allowed window", time: "09:41 PM", camera: "Gate 1", severity: "low" },
];

export const cameras: Camera[] = [
  { id: "gate-1", name: "Main Gate", location: "Entry / Exit" },
  { id: "gate-2", name: "Side Gate", location: "Secondary entry" },
  { id: "lobby", name: "Lobby", location: "Reception" },
  { id: "parking", name: "Parking", location: "Basement" },
];
