/**
 * Centralized icon exports from lucide-react
 * This file serves as a single source of truth for all icons used across the application
 */

// Import all icons from lucide-react
import {
  Home,
  Menu,
  X,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PanelLeftIcon,
  User,
  Users,
  UserCheck,
  LogOut,
  Settings,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  PieChart,
  Plus,
  Trash2,
  Edit,
  Search,
  SearchIcon,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Loader2,
  Eye,
  EyeOff,
  Calendar,
  CheckIcon,
  AlertTriangle,
  Bug,
  HelpCircle,
  FileText,
  Image,
  Camera,
  Mail,
  Shield,
  ShieldAlert,
  Globe,
  MoreHorizontal,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Circle,
  Minus,
  GripVertical,
  Slash,
  DollarSign,
  ShoppingCart,
  ShoppingBag,
  Percent,
  Palette,
  WifiOff,
  Router,
  Server,
  CheckCircle,
  XCircle,
  Video,
  Car,
  ScanFace,
  LayoutDashboard,
  ShieldCheck,
  Vote,
  Lock,
  MessageCircle,
  Bot,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

// Re-export all icons with their original names
export {
  Home,
  Menu,
  X,
  ChevronsLeft,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PanelLeftIcon,
  User,
  Users,
  UserCheck,
  LogOut,
  Settings,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  PieChart,
  Plus,
  Trash2,
  Edit,
  Search,
  SearchIcon,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Loader2,
  Eye,
  EyeOff,
  Calendar,
  CheckIcon,
  AlertTriangle,
  Bug,
  HelpCircle,
  FileText,
  Image,
  Camera,
  Mail,
  Shield,
  ShieldAlert,
  Globe,
  MoreHorizontal,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Circle,
  Minus,
  GripVertical,
  Slash,
  DollarSign,
  ShoppingCart,
  ShoppingBag,
  Percent,
  Palette,
  WifiOff,
  Router,
  Server,
  CheckCircle,
  XCircle,
  Video,
  Car,
  ScanFace,
  LayoutDashboard,
  ShieldCheck,
  Vote,
  Lock,
  MessageCircle,
  Bot,
  type LucideIcon,
  type LucideProps,
};

// Export icon aliases for better semantics
export const CalendarInputIcon = Calendar;
export const CameraUploadIcon = Camera;
export const LoadingIcon = Loader2;
export const CloseIcon = X;
export const AddIcon = Plus;
export const DeleteIcon = Trash2;
export const EditIcon = Edit;
export const SearchInputIcon = Search;
export const FilterIcon = Filter;
export const DownloadIcon = Download;
export const UploadIcon = Upload;
export const RefreshIcon = RefreshCw;
export const MenuIcon = Menu;
export const HomeIcon = Home;
export const UserIcon = User;
export const UsersIcon = Users;
export const SettingsIcon = Settings;
export const LogoutIcon = LogOut;
export const BarChartIcon = BarChart3;
export const TrendingUpIcon = TrendingUp;
export const TrendingDownIcon = TrendingDown;
export const ActivityIcon = Activity;
export const PieChartIcon = PieChart;
export const AlertIcon = AlertTriangle;
export const BugIcon = Bug;
export const HelpIcon = HelpCircle;
export const FileIcon = FileText;
export const FileTextIcon = FileText;
export const ImageIcon = Image;
export const CameraIcon = Camera;
export const MailIcon = Mail;
export const ShieldIcon = Shield;
export const ShieldAlertIcon = ShieldAlert;
export const VideoIcon = Video;
export const CarIcon = Car;
export const ScanFaceIcon = ScanFace;
export const LayoutDashboardIcon = LayoutDashboard;
export const GlobeIcon = Globe;
export const MoreIcon = MoreHorizontal;
export const BackIcon = ArrowLeft;
export const ForwardIcon = ArrowRight;
export const UpIcon = ArrowUp;
export const DownIcon = ArrowDown;
export const SortIcon = ArrowUpDown;
export const DollarIcon = DollarSign;
export const CartIcon = ShoppingCart;
export const BagIcon = ShoppingBag;
export const PercentIcon = Percent;
export const PaletteIcon = Palette;
export const VisibilityIcon = Eye;
export const SidebarCollapseIcon = ChevronsLeft;
export { ChevronsRight };
export const ExpandIcon = ChevronDown;
export const CollapseIcon = ChevronRight;
export const NavigateLeftIcon = ChevronLeft;
export const NavigateRightIcon = ChevronRight;
export const SidebarIcon = PanelLeftIcon;
export const CheckboxIcon = CheckIcon;
export const RadioIcon = Circle;
export const DragHandleIcon = GripVertical;
export const SeparatorIcon = Slash;
export const UserCheckIcon = UserCheck;
export const ChatIcon = MessageCircle;
export const VoteIcon = Vote;
export const ChatbotIcon = Bot;

// Icon size presets for consistency
export const ICON_SIZES = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;

// Common icon props for consistency
export const DEFAULT_ICON_PROPS: LucideProps = {
  size: ICON_SIZES.md,
  strokeWidth: 1.5,
};

// Icon class names for consistent styling
export const ICON_CLASSES = {
  default: "h-5 w-5",
  small: "h-4 w-4",
  large: "h-6 w-6",
  interactive: "h-5 w-5 transition-colors duration-200",
  muted: "h-4 w-4 text-muted-foreground",
} as const;
