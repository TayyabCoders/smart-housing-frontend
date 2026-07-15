const PARKING_API = (
  process.env.NEXT_PUBLIC_PARKING_API_URL || 'http://localhost:8000'
).replace(/\/$/, '')

export interface DetectResult {
  detected: boolean
  plate_number: string | null
  confidence: number | null
  snapshot_url: string | null
  message: string
}

export interface EntryResult {
  plate_number: string
  cnic_number: string | null
  entry_time: string
  status: 'IN'
  message: string
  entry_image_url: string | null
}

export interface ParkingLogEntry {
  plate_number: string
  status: 'IN' | 'OUT'
  entry_time: string
  exit_time: string | null
  duration_minutes: number | null
  fee: number | null
  elapsed_minutes: number | null
  current_fee: number | null
}

export interface ParkingLogsResponse {
  total: number
  page: number
  limit: number
  data: ParkingLogEntry[]
}

export async function detectPlate(
  imageBlob: Blob,
  filename = 'capture.jpg',
): Promise<DetectResult> {
  const form = new FormData()
  form.append('image_file', imageBlob, filename)
  const res = await fetch(`${PARKING_API}/api/v1/parking/detect`, {
    method: 'POST',
    body: form,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as any).detail || `Detection failed (${res.status})`)
  }
  return res.json()
}

export async function recordEntry(
  plateNumber: string,
  cnicNumber?: string,
): Promise<EntryResult> {
  const form = new FormData()
  form.append('plate_number', plateNumber)
  if (cnicNumber) form.append('cnic_number', cnicNumber)
  const res = await fetch(`${PARKING_API}/api/v1/parking/entry`, {
    method: 'POST',
    body: form,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as any).detail || `Entry recording failed (${res.status})`)
  }
  return res.json()
}

export async function fetchParkingLogs(
  page = 1,
  limit = 50,
): Promise<ParkingLogsResponse> {
  const res = await fetch(
    `${PARKING_API}/api/v1/parking/all?page=${page}&limit=${limit}`,
  )
  if (!res.ok) throw new Error(`Failed to fetch parking logs (${res.status})`)
  return res.json()
}
