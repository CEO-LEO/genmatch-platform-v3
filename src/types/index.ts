// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: 'STUDENT' | 'ELDERLY';
  studentId?: string;
  university?: string;
  address: string;
  avatar?: string;
  rating?: number;
  totalHours?: number;
  completedTasks?: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  bio?: string;
  skills?: string[];
  interests?: string[];
  availability?: {
    days: string[];
    timeSlots: string[];
  };
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

// Task Types
export interface Task {
  id: string;
  title: string;
  description: string;
  category: 'HOSPITAL' | 'TEMPLE' | 'EXERCISE' | 'REPAIR';
  status: 'PENDING' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  location: string;
  budget: number;
  hours: number;
  createdAt: string;
  updatedAt?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  creator: {
    id: string;
    name: string;
    avatar: string;
    userType: string;
    rating: number;
  };
  acceptedBy?: {
    id: string;
    name: string;
    avatar: string;
    userType: string;
  };
  images?: string[];
  requirements?: string[];
  tags?: string[];
  isLiked?: boolean;
  likeCount?: number;
  commentCount?: number;
  shareCount?: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface TaskForm {
  title: string;
  description: string;
  category: 'HOSPITAL' | 'TEMPLE' | 'EXERCISE' | 'REPAIR';
  location: string;
  budget: number;
  hours: number;
  scheduledDate: string;
  scheduledTime: string;
  requirements: string[];
  tags: string[];
}

export interface TaskFilter {
  category?: string;
  location?: string;
  budget?: {
    min: number;
    max: number;
  };
  hours?: {
    min: number;
    max: number;
  };
  status?: string;
  date?: string;
}

// Chat Types
export interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
    userType: string;
  };
  timestamp: string;
  isRead: boolean;
  attachments?: {
    type: 'image' | 'file' | 'location';
    url: string;
    name?: string;
  }[];
}

export interface ChatRoom {
  id: string;
  taskId: string;
  taskTitle: string;
  participants: {
    id: string;
    name: string;
    avatar: string;
    userType: string;
  }[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'TASK_UPDATE' | 'MESSAGE' | 'ACHIEVEMENT' | 'SYSTEM' | 'REMINDER';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  metadata?: {
    taskId?: string;
    userId?: string;
    achievementId?: string;
  };
  icon?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}

// Achievement Types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'VOLUNTEER' | 'COMMUNITY' | 'SKILL' | 'MILESTONE' | 'SPECIAL';
  level: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND';
  points: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  requirement: string;
  reward?: string;
  rarity: 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
}

// Statistics Types
export interface UserStatistics {
  totalHours: number;
  completedTasks: number;
  activeTasks: number;
  averageRating: number;
  totalPoints: number;
  achievements: number;
  monthlyProgress: MonthlyStat[];
  categoryDistribution: CategoryStat[];
  locationDistribution: LocationStat[];
}

export interface MonthlyStat {
  month: string;
  hours: number;
  tasks: number;
  rating: number;
}

export interface CategoryStat {
  category: string;
  count: number;
  hours: number;
  percentage: number;
}

export interface LocationStat {
  location: string;
  count: number;
  percentage: number;
}

// Feed Types
export interface FeedPost {
  id: string;
  type: 'TASK_COMPLETED' | 'NEW_ACHIEVEMENT' | 'COMMUNITY_HIGHLIGHT' | 'TIPS';
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    userType: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
  shares: number;
  image?: string;
  tags: string[];
  location?: string;
  taskDetails?: {
    title: string;
    category: string;
    hours: number;
    rating: number;
  };
  achievementDetails?: {
    title: string;
    level: string;
    points: number;
  };
}

// Review Types
export interface Review {
  id: string;
  taskId: string;
  reviewer: {
    id: string;
    name: string;
    avatar: string;
    userType: string;
  };
  reviewee: {
    id: string;
    name: string;
    avatar: string;
    userType: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
  isPublic: boolean;
  helpfulCount: number;
}

// Search Types
export interface SearchResult {
  tasks: Task[];
  users: User[];
  totalResults: number;
  filters: TaskFilter;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  userType: 'STUDENT' | 'ELDERLY';
  studentId?: string;
  university?: string;
  address: string;
}

export interface ProfileForm {
  name: string;
  phone: string;
  address: string;
  bio?: string;
  skills?: string[];
  interests?: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

// Settings Types
export interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    taskUpdates: boolean;
    messages: boolean;
    achievements: boolean;
    reminders: boolean;
  };
  privacy: {
    profileVisibility: 'PUBLIC' | 'FRIENDS' | 'PRIVATE';
    showLocation: boolean;
    showContactInfo: boolean;
    showStatistics: boolean;
  };
  preferences: {
    language: 'th' | 'en';
    theme: 'light' | 'dark' | 'auto';
    timezone: string;
    currency: string;
  };
}

// Error Types
export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

// Utility Types
export type Status = 'idle' | 'loading' | 'success' | 'error';

export type SortOrder = 'asc' | 'desc';

export type SortField = 'createdAt' | 'updatedAt' | 'title' | 'rating' | 'budget' | 'hours';

export interface SortOption {
  field: SortField;
  order: SortOrder;
  label: string;
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'date' | 'time';
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  helperText?: string;
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
}

// Event Types
export interface AppEvent {
  id: string;
  type: string;
  data: any;
  timestamp: string;
  userId?: string;
}

// Analytics Types
export interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  timestamp: string;
  userId?: string;
  sessionId?: string;
}

// Export all types
export type {
  User,
  UserProfile,
  Task,
  TaskForm,
  TaskFilter,
  Message,
  ChatRoom,
  Notification,
  Achievement,
  UserStatistics,
  MonthlyStat,
  CategoryStat,
  LocationStat,
  FeedPost,
  Review,
  SearchResult,
  ApiResponse,
  PaginatedResponse,
  LoginForm,
  RegisterForm,
  ProfileForm,
  UserSettings,
  ApiError,
  ValidationError,
  Status,
  SortOrder,
  SortField,
  SortOption,
  BaseComponentProps,
  ButtonProps,
  InputProps,
  ModalProps,
  AppEvent,
  AnalyticsEvent,
};
