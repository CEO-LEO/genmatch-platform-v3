// Task Types for GenMatch Platform

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  status: TaskStatus;
  location: string;
  budget: number; // ชั่วโมงจิตอาสา
  hours: number; // จำนวนชั่วโมงที่ใช้
  createdAt: string;
  updatedAt?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  creator: TaskCreator;
  acceptedBy?: TaskAccepter;
  images?: string[];
  requirements?: string[];
  tags?: string[];
  isLiked?: boolean;
  likeCount?: number;
  commentCount?: number;
  shareCount?: number;
  coordinates?: TaskCoordinates;
  priority: TaskPriority;
  difficulty: TaskDifficulty;
  estimatedDuration: number; // in minutes
  actualDuration?: number; // in minutes
  completionNotes?: string;
  rating?: number;
  review?: TaskReview;
}

export type TaskCategory = 'HOSPITAL' | 'TEMPLE' | 'EXERCISE' | 'REPAIR';

export type TaskStatus = 'PENDING' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export type TaskDifficulty = 'EASY' | 'MODERATE' | 'HARD' | 'EXPERT';

export interface TaskCreator {
  id: string;
  name: string;
  avatar: string;
  userType: 'STUDENT' | 'ELDERLY';
  rating: number;
  totalHours: number;
  completedTasks: number;
  isVerified: boolean;
  joinDate: string;
}

export interface TaskAccepter {
  id: string;
  name: string;
  avatar: string;
  userType: 'STUDENT' | 'ELDERLY';
  rating: number;
  totalHours: number;
  completedTasks: number;
  acceptedAt: string;
  estimatedArrivalTime?: string;
  actualArrivalTime?: string;
}

export interface TaskCoordinates {
  lat: number;
  lng: number;
  address: string;
  district: string;
  province: string;
  postalCode: string;
}

export interface TaskReview {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  isPublic: boolean;
  helpfulCount: number;
  images?: string[];
}

// Task Form for creating/editing tasks
export interface TaskForm {
  title: string;
  description: string;
  category: TaskCategory;
  location: string;
  budget: number;
  hours: number;
  scheduledDate: string;
  scheduledTime: string;
  requirements: string[];
  tags: string[];
  priority: TaskPriority;
  difficulty: TaskDifficulty;
  estimatedDuration: number;
  images?: File[];
  coordinates?: TaskCoordinates;
}

// Task Filter for search and filtering
export interface TaskFilter {
  category?: TaskCategory;
  status?: TaskStatus;
  location?: string;
  budget?: {
    min: number;
    max: number;
  };
  hours?: {
    min: number;
    max: number;
  };
  priority?: TaskPriority;
  difficulty?: TaskDifficulty;
  date?: string;
  creatorType?: 'STUDENT' | 'ELDERLY';
  hasImages?: boolean;
  isUrgent?: boolean;
  rating?: number;
  tags?: string[];
}

// Task Statistics
export interface TaskStatistics {
  totalTasks: number;
  pendingTasks: number;
  activeTasks: number;
  completedTasks: number;
  cancelledTasks: number;
  totalHours: number;
  averageRating: number;
  categoryDistribution: CategoryDistribution[];
  statusDistribution: StatusDistribution[];
  monthlyProgress: MonthlyTaskProgress[];
  locationDistribution: LocationDistribution[];
}

export interface CategoryDistribution {
  category: TaskCategory;
  count: number;
  hours: number;
  percentage: number;
  averageRating: number;
}

export interface StatusDistribution {
  status: TaskStatus;
  count: number;
  percentage: number;
}

export interface MonthlyTaskProgress {
  month: string;
  tasks: number;
  hours: number;
  rating: number;
  completionRate: number;
}

export interface LocationDistribution {
  location: string;
  count: number;
  percentage: number;
  averageRating: number;
}

// Task Actions
export interface TaskAction {
  id: string;
  taskId: string;
  userId: string;
  action: 'ACCEPT' | 'START' | 'COMPLETE' | 'CANCEL' | 'PAUSE' | 'RESUME';
  timestamp: string;
  notes?: string;
  metadata?: Record<string, any>;
}

// Task Timeline
export interface TaskTimeline {
  id: string;
  taskId: string;
  events: TaskTimelineEvent[];
}

export interface TaskTimelineEvent {
  id: string;
  type: 'CREATED' | 'ACCEPTED' | 'STARTED' | 'PAUSED' | 'RESUMED' | 'COMPLETED' | 'CANCELLED' | 'NOTE_ADDED' | 'PHOTO_ADDED';
  timestamp: string;
  userId: string;
  userName: string;
  userAvatar: string;
  description: string;
  metadata?: Record<string, any>;
}

// Task Requirements
export interface TaskRequirement {
  id: string;
  taskId: string;
  requirement: string;
  isRequired: boolean;
  category: 'SKILL' | 'EQUIPMENT' | 'EXPERIENCE' | 'CERTIFICATION' | 'OTHER';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}

// Task Tags
export interface TaskTag {
  id: string;
  name: string;
  category: 'SKILL' | 'LOCATION' | 'TYPE' | 'DIFFICULTY' | 'CUSTOM';
  color: string;
  usageCount: number;
  isSystem: boolean;
}

// Task Matching
export interface TaskMatch {
  id: string;
  taskId: string;
  userId: string;
  score: number;
  reasons: string[];
  isRecommended: boolean;
  matchDate: string;
}

export interface TaskMatchCriteria {
  location: number; // weight 0-100
  skills: number;
  availability: number;
  rating: number;
  experience: number;
  preferences: number;
}

// Task Notifications
export interface TaskNotification {
  id: string;
  taskId: string;
  userId: string;
  type: 'TASK_CREATED' | 'TASK_ACCEPTED' | 'TASK_STARTED' | 'TASK_COMPLETED' | 'TASK_CANCELLED' | 'TASK_REMINDER' | 'TASK_UPDATE';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}

// Task Comments
export interface TaskComment {
  id: string;
  taskId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  isEdited: boolean;
  likes: number;
  replies: TaskCommentReply[];
  attachments?: TaskCommentAttachment[];
}

export interface TaskCommentReply {
  id: string;
  commentId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface TaskCommentAttachment {
  id: string;
  type: 'IMAGE' | 'FILE' | 'LOCATION';
  url: string;
  name: string;
  size?: number;
}

// Task Reports
export interface TaskReport {
  id: string;
  taskId: string;
  reporterId: string;
  reporterName: string;
  reason: TaskReportReason;
  description: string;
  evidence?: string[];
  status: 'PENDING' | 'INVESTIGATING' | 'RESOLVED' | 'DISMISSED';
  createdAt: string;
  resolvedAt?: string;
  moderatorNotes?: string;
}

export type TaskReportReason = 'INAPPROPRIATE_CONTENT' | 'SPAM' | 'FRAUD' | 'SAFETY_CONCERN' | 'OTHER';

// Task Analytics
export interface TaskAnalytics {
  taskId: string;
  views: number;
  uniqueViews: number;
  applications: number;
  shares: number;
  bookmarks: number;
  completionRate: number;
  averageCompletionTime: number;
  userSatisfaction: number;
  costEffectiveness: number;
}

// Export all task-related types
export type {
  Task,
  TaskCategory,
  TaskStatus,
  TaskPriority,
  TaskDifficulty,
  TaskCreator,
  TaskAccepter,
  TaskCoordinates,
  TaskReview,
  TaskForm,
  TaskFilter,
  TaskStatistics,
  CategoryDistribution,
  StatusDistribution,
  MonthlyTaskProgress,
  LocationDistribution,
  TaskAction,
  TaskTimeline,
  TaskTimelineEvent,
  TaskRequirement,
  TaskTag,
  TaskMatch,
  TaskMatchCriteria,
  TaskNotification,
  TaskComment,
  TaskCommentReply,
  TaskCommentAttachment,
  TaskReport,
  TaskReportReason,
  TaskAnalytics,
};
