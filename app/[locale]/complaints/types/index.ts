export type ComplaintStatus = 'pending' | 'in_progress' | 'resolved' | 'rejected';

export interface Complaint {
  id: string;
  fullname: string;
  gender: string;
  complaint_detail: string;
  tracking_id: string;
  status: ComplaintStatus;
  created_at: string;
  updated_at: string;
}
