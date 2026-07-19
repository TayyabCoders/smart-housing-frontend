const PARKING_API = (
  process.env.NEXT_PUBLIC_PARKING_API_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  ""
).replace(/\/$/, "");

export interface DetectResult {
  detected: boolean;
  plate_number: string | null;
  confidence: number | null;
  snapshot_url: string | null;
  message: string;
  resident_status: "resident" | "visitor" | "staff" | "blacklist" | "unknown" | null;
  owner_name: string | null;
  flat_number: string | null;
  vehicle_type: string | null;
}

export interface RegisteredVehicle {
  plate_number: string;
  owner_name: string;
  flat_number: string | null;
  vehicle_type: string | null;
  color: string | null;
  status: string;
}

export interface EntryResult {
  plate_number: string;
  cnic_number: string | null;
  entry_time: string;
  status: "IN";
  message: string;
  entry_image_url: string | null;
}

export interface ParkingLogEntry {
  plate_number: string;
  status: "IN" | "OUT";
  entry_time: string;
  exit_time: string | null;
  duration_minutes: number | null;
  fee: number | null;
  elapsed_minutes: number | null;
  current_fee: number | null;
}

export interface ParkingLogsResponse {
  total: number;
  page: number;
  limit: number;
  data: ParkingLogEntry[];
}

export async function detectPlate(
  imageBlob: Blob,
  filename = "capture.jpg"
): Promise<DetectResult> {
  const form = new FormData();
  form.append("image_file", imageBlob, filename);
  const res = await fetch(`${PARKING_API}/api/v1/parking/detect`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).detail || `Detection failed (${res.status})`);
  }
  return res.json();
}

export async function recordEntry(plateNumber: string, cnicNumber?: string): Promise<EntryResult> {
  const form = new FormData();
  form.append("plate_number", plateNumber);
  if (cnicNumber) form.append("cnic_number", cnicNumber);
  const res = await fetch(`${PARKING_API}/api/v1/parking/entry`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).detail || `Entry recording failed (${res.status})`);
  }
  return res.json();
}

export async function fetchParkingLogs(page = 1, limit = 50): Promise<ParkingLogsResponse> {
  const res = await fetch(`${PARKING_API}/api/v1/parking/all?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error(`Failed to fetch parking logs (${res.status})`);
  return res.json();
}

export async function fetchRegisteredVehicles(): Promise<RegisteredVehicle[]> {
  const res = await fetch(`${PARKING_API}/api/v1/vehicle`);
  if (!res.ok) throw new Error(`Failed to fetch vehicles (${res.status})`);
  return res.json();
}

export async function registerVehicle(data: {
  plate_number: string;
  owner_name: string;
  flat_number?: string;
  vehicle_type?: string;
  color?: string;
  status?: string;
  notes?: string;
}): Promise<RegisteredVehicle> {
  const res = await fetch(`${PARKING_API}/api/v1/vehicle`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).detail || `Failed to register vehicle (${res.status})`);
  }
  return res.json();
}

export async function updateVehicleStatus(
  plateNumber: string,
  newStatus: string
): Promise<RegisteredVehicle> {
  const res = await fetch(
    `${PARKING_API}/api/v1/vehicle/${encodeURIComponent(plateNumber)}/status`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    }
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).detail || `Failed to update vehicle status (${res.status})`);
  }
  return res.json();
}

// ── Access Log API ────────────────────────────────────────────────────────────

export interface AccessLogEntry {
  id: number;
  plate_number: string;
  vehicle_status: string; // resident | visitor | staff | blacklist | unknown
  action: string; // GRANTED | DENIED
  owner_name: string | null;
  flat_no: string | null;
  snapshot_url: string | null;
  accessed_at: string;
}

export interface AccessStatsToday {
  detected_today: number;
  residents: number;
  visitors: number;
  staff: number;
  blacklist_hits: number;
  unknown: number;
}

export async function grantAccess(payload: {
  plate_number: string;
  vehicle_status: string;
  owner_name?: string | null;
  flat_no?: string | null;
  snapshot_url?: string | null;
}): Promise<AccessLogEntry> {
  const res = await fetch(`${PARKING_API}/api/v1/access/grant`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).detail || `Grant access failed (${res.status})`);
  }
  return res.json();
}

export async function denyAccess(payload: {
  plate_number: string;
  vehicle_status: string;
  owner_name?: string | null;
  flat_no?: string | null;
  snapshot_url?: string | null;
}): Promise<AccessLogEntry> {
  const res = await fetch(`${PARKING_API}/api/v1/access/deny`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).detail || `Deny access failed (${res.status})`);
  }
  return res.json();
}

export async function fetchRecentActivity(limit = 50): Promise<AccessLogEntry[]> {
  const res = await fetch(`${PARKING_API}/api/v1/access/recent?limit=${limit}`);
  if (!res.ok) throw new Error(`Failed to fetch activity (${res.status})`);
  return res.json();
}

export async function fetchTodayStats(): Promise<AccessStatsToday> {
  const res = await fetch(`${PARKING_API}/api/v1/access/stats/today`);
  if (!res.ok) throw new Error(`Failed to fetch stats (${res.status})`);
  return res.json();
}
