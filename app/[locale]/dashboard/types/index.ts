export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  date: string;
  status: "completed" | "processing" | "cancelled";
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  total: number;
  status: "completed" | "processing" | "pending" | "cancelled";
  date: string;
}

export interface Complaint {
  id: string;
  fullname: string;
  gender: string;
  complaint_detail: string;
  tracking_id: string;
  status: "pending" | "in_progress" | "resolved" | "rejected";
  date?: string;
  created_at: string;
  updated_at: string;
}

export interface MetricData {
  totalUsers: number;
  totalComplaints: number;
  pendingComplaints: number;
  totalVoters: number;
}

export interface ChartDataPoint {
  month?: string;
  revenue?: number;
  users?: number;
  orders?: number;
  product?: string;
  sales?: number;
  profit?: number;
  name?: string;
  value?: number;
  color?: string;
  time?: string;
  active?: number;
}

export type SortDirection = "asc" | "desc" | null;

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
}

export interface FilterOption {
  label: string;
  value: any;
}

export interface DataTableProps<T> {
  title: string;
  data: T[];
  columns: TableColumn<T>[];
  icon?: React.ComponentType<any>;
  searchKey?: keyof T;
  filterOptions?: {
    key: keyof T;
    options: FilterOption[];
  };
  isLoading?: boolean;
}

export interface DashboardProps {
  isLoading?: boolean;
  data?: {
    metrics?: MetricData;
    products?: Product[];
    orders?: Order[];
    complaints?: Complaint[];
    complaintCounts?: {
      pending: number;
      in_progress: number;
      resolved: number;
      rejected: number;
    };
  };
}
