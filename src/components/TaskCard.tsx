'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  User, 
  Calendar,
  Eye,
  MessageCircle,
  Star,
  Heart,
  Share2,
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  AlertCircle,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

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
}

interface TaskCardProps {
  task: Task;
  variant?: 'default' | 'compact' | 'detailed';
  showActions?: boolean;
  onStatusChange?: (taskId: string, newStatus: Task['status']) => void;
  onLike?: (taskId: string) => void;
  onShare?: (taskId: string) => void;
  onEdit?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  className?: string;
}

export default function TaskCard({
  task,
  variant = 'default',
  showActions = true,
  onStatusChange,
  onLike,
  onShare,
  onEdit,
  onDelete,
  className = ''
}: TaskCardProps) {
  const [isLiked, setIsLiked] = useState(task.isLiked || false);
  const [showMenu, setShowMenu] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.(task.id);
  };

  const handleShare = () => {
    onShare?.(task.id);
    // Copy to clipboard
    navigator.clipboard.writeText(`${window.location.origin}/task/${task.id}`);
  };

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'HOSPITAL':
        return { label: 'โรงพยาบาล', icon: '🏥', color: 'from-red-500 to-pink-500' };
      case 'TEMPLE':
        return { label: 'วัด', icon: '🕍', color: 'from-yellow-500 to-orange-500' };
      case 'EXERCISE':
        return { label: 'ออกกำลังกาย', icon: '💪', color: 'from-green-500 to-emerald-500' };
      case 'REPAIR':
        return { label: 'งานซ่อม', icon: '🔧', color: 'from-blue-500 to-indigo-500' };
      default:
        return { label: 'อื่นๆ', icon: '📋', color: 'from-gray-500 to-gray-600' };
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'PENDING':
        return { label: 'รอการรับงาน', color: 'from-yellow-500 to-orange-500', icon: AlertCircle };
      case 'ACCEPTED':
        return { label: 'รับงานแล้ว', color: 'from-blue-500 to-indigo-500', icon: CheckCircle };
      case 'IN_PROGRESS':
        return { label: 'กำลังดำเนินการ', color: 'from-purple-500 to-pink-500', icon: Play };
      case 'COMPLETED':
        return { label: 'เสร็จสิ้น', color: 'from-green-500 to-emerald-500', icon: CheckCircle };
      case 'CANCELLED':
        return { label: 'ยกเลิก', color: 'from-red-500 to-pink-500', icon: XCircle };
      default:
        return { label: 'ไม่ทราบสถานะ', color: 'from-gray-500 to-gray-600', icon: AlertCircle };
    }
  };

  const getStatusActions = (status: string) => {
    switch (status) {
      case 'PENDING':
        return [
          { label: 'รับงาน', action: 'ACCEPTED', color: 'from-blue-500 to-indigo-500', icon: CheckCircle }
        ];
      case 'ACCEPTED':
        return [
          { label: 'เริ่มงาน', action: 'IN_PROGRESS', color: 'from-purple-500 to-pink-500', icon: Play }
        ];
      case 'IN_PROGRESS':
        return [
          { label: 'เสร็จสิ้น', action: 'COMPLETED', color: 'from-green-500 to-emerald-500', icon: CheckCircle }
        ];
      default:
        return [];
    }
  };

  const categoryInfo = getCategoryInfo(task.category);
  const statusInfo = getStatusInfo(task.status);
  const StatusIcon = statusInfo.icon;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (variant === 'compact') {
    return (
      <div className={`glass-card p-4 hover:scale-105 transition-transform cursor-pointer ${className}`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 bg-gradient-to-r ${categoryInfo.color} rounded-lg flex items-center justify-center text-sm`}>
              {categoryInfo.icon}
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm line-clamp-1">{task.title}</h3>
              <p className="text-white/60 text-xs">{categoryInfo.label}</p>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${statusInfo.color} text-white`}>
            {statusInfo.label}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-xs text-white/60">
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {task.location}
            </span>
            <span className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {task.hours} ชม.
            </span>
          </div>
          <span className="flex items-center">
            <DollarSign className="w-3 h-3 mr-1" />
            {task.budget} ชม.
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={`glass-card p-6 hover:scale-105 transition-transform ${className}`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 bg-gradient-to-r ${categoryInfo.color} rounded-xl flex items-center justify-center text-xl`}>
              {categoryInfo.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{task.title}</h3>
              <div className="flex items-center space-x-3">
                <span className="text-white/60 text-sm">{categoryInfo.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${statusInfo.color} text-white`}>
                  {statusInfo.label}
                </span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 top-full mt-2 dropdown min-w-32">
                <Link href={`/task/${task.id}`} className="dropdown-item">
                  <Eye className="w-4 h-4 mr-3" />
                  ดูรายละเอียด
                </Link>
                {onEdit && (
                  <button onClick={() => onEdit(task.id)} className="dropdown-item w-full">
                    <Edit className="w-4 h-4 mr-3" />
                    แก้ไข
                  </button>
                )}
                {onDelete && (
                  <button onClick={() => onDelete(task.id)} className="dropdown-item w-full text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4 mr-3" />
                    ลบ
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-white/80 mb-4 leading-relaxed">{task.description}</p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-white/60">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{task.location}</span>
          </div>
          <div className="flex items-center text-white/60">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">{task.hours} ชั่วโมง</span>
          </div>
          <div className="flex items-center text-white/60">
            <DollarSign className="w-4 h-4 mr-2" />
            <span className="text-sm">{task.budget} ชั่วโมงจิตอาสา</span>
          </div>
          <div className="flex items-center text-white/60">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">{formatDate(task.createdAt)}</span>
          </div>
        </div>

        {/* Creator Info */}
        <div className="flex items-center justify-between mb-4 p-3 bg-white/5 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {task.creator.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-white font-medium text-sm">{task.creator.name}</p>
              <p className="text-white/60 text-xs">
                {task.creator.userType === 'STUDENT' ? 'นักศึกษา' : 'ผู้สูงอายุ'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white text-sm">{task.creator.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Accepted By (if applicable) */}
        {task.acceptedBy && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <p className="text-green-400 text-sm mb-2">รับงานโดย:</p>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-xs">
                  {task.acceptedBy.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-white font-medium text-xs">{task.acceptedBy.name}</p>
                <p className="text-white/60 text-xs">
                  {task.acceptedBy.userType === 'STUDENT' ? 'นักศึกษา' : 'ผู้สูงอายุ'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {task.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-white/10 text-white/60 rounded-full text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Requirements */}
        {task.requirements && task.requirements.length > 0 && (
          <div className="mb-4">
            <p className="text-white/60 text-sm mb-2">ความต้องการ:</p>
            <ul className="space-y-1">
              {task.requirements.map((req, index) => (
                <li key={index} className="flex items-start text-white/70 text-sm">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Status Actions */}
        {showActions && onStatusChange && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-2">
              {getStatusActions(task.status).map((action) => (
                <button
                  key={action.action}
                  onClick={() => onStatusChange(task.id, action.action as Task['status'])}
                  className={`px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r ${action.color} text-white hover:scale-105 transition-transform`}
                >
                  <action.icon className="w-4 h-4 inline mr-2" />
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Social Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          <div className="flex items-center space-x-6">
            <button 
              onClick={handleLike}
              className={`flex items-center text-gray-500 hover:text-red-500 transition-colors ${
                isLiked ? 'text-red-500' : ''
              }`}
            >
              <ThumbsUp className={`w-5 h-5 mr-2 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm">{task.likeCount || 0}</span>
            </button>
            
            <Link href={`/task/${task.id}#comments`} className="flex items-center text-white/60 hover:text-blue-400 transition-colors">
              <MessageCircle className="w-5 h-5 mr-2" />
              {task.commentCount || 0}
            </Link>
            
            <button
              onClick={handleShare}
              className="flex items-center text-white/60 hover:text-green-400 transition-colors"
            >
              <Share2 className="w-5 h-5 mr-2" />
              {task.shareCount || 0}
            </button>
          </div>
          
          <Link
            href={`/task/${task.id}`}
            className="glass-button-secondary px-4 py-2 text-sm rounded-lg hover:scale-105 transition-transform"
          >
            <Eye className="w-4 h-4 mr-2 inline" />
            ดูรายละเอียด
          </Link>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`glass-card p-6 hover:scale-105 transition-transform cursor-pointer ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 bg-gradient-to-r ${categoryInfo.color} rounded-xl flex items-center justify-center text-lg`}>
            {categoryInfo.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">{task.title}</h3>
            <p className="text-white/60 text-sm">{categoryInfo.label}</p>
          </div>
        </div>
        
        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${statusInfo.color} text-white`}>
          {statusInfo.label}
        </span>
      </div>

      {/* Description */}
      <p className="text-white/80 mb-4 line-clamp-2">{task.description}</p>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-white/60 text-sm">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="truncate">{task.location}</span>
        </div>
        <div className="flex items-center text-white/60 text-sm">
          <Clock className="w-4 h-4 mr-2" />
          <span>{task.hours} ชม.</span>
        </div>
        <div className="flex items-center text-white/60 text-sm">
          <DollarSign className="w-4 h-4 mr-2" />
          <span>{task.budget} ชม.</span>
        </div>
        <div className="flex items-center text-white/60 text-sm">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{formatDate(task.createdAt)}</span>
        </div>
      </div>

      {/* Creator */}
      <div className="flex items-center justify-between mb-4 p-3 bg-white/5 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-xs">
              {task.creator.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-white font-medium text-sm">{task.creator.name}</p>
            <p className="text-white/60 text-xs">
              {task.creator.userType === 'STUDENT' ? 'นักศึกษา' : 'ผู้สูงอายุ'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-white text-sm">{task.creator.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleLike}
              className={`flex items-center text-gray-500 hover:text-red-500 transition-colors ${
                isLiked ? 'text-red-500' : ''
              }`}
            >
              <ThumbsUp className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-xs">{task.likeCount || 0}</span>
            </button>
            
            <Link href={`/task/${task.id}#comments`} className="flex items-center text-white/60 hover:text-blue-400 transition-colors">
              <MessageCircle className="w-4 h-4 mr-1" />
              {task.commentCount || 0}
            </Link>
          </div>
          
          <Link
            href={`/task/${task.id}`}
            className="glass-button-secondary px-4 py-2 text-sm rounded-lg hover:scale-105 transition-transform"
          >
            <Eye className="w-4 h-4 mr-2 inline" />
            ดูรายละเอียด
          </Link>
        </div>
      )}
    </div>
  );
}
