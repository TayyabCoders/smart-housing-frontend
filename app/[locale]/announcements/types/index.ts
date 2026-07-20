export interface Announcement {
  id: string;
  title: string;
  summary: string;
  description: string;
  created_by: string;
  created_at: string;
  updated_at?: string | null;
}

export interface AnnouncementsResponse {
  total: number;
  rows: Announcement[];
  offset: number;
  limit: number;
}
