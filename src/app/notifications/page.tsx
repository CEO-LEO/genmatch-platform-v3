'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft,
  Bell,
  Check,
  X,
  Star,
  Heart,
  Clock,
  MapPin,
  User,
  MessageCircle,
  Award,
  AlertCircle,
  ChevronRight,
  Filter,
  Search,
  Trash2,
  Settings
} from 'lucide-react';
import Link from 'next/link';

interface Notification {
  id: string;
  type: 'TASK_ACCEPTED' | 'TASK_COMPLETED' | 'NEW_MESSAGE' | 'ACHIEVEMENT' | 'REMINDER' | 'SYSTEM';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  isImportant: boolean;
  actionUrl?: string;
  icon: string;
  color: string;
}

export default function NotificationsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'important'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }
    if (user) {
      loadNotifications();
    }
  }, [user, loading, router]);

  const loadNotifications = async () => {
    try {
      // Mock notifications data
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'TASK_ACCEPTED',
          title: 'งานถูกยอมรับแล้ว',
          message: 'งาน "ช่วยซื้อของที่ซุปเปอร์มาร์เก็ต" ถูกยอมรับโดย สมชาย ใจดี',
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          isRead: false,
          isImportant: true,
          actionUrl: '/task/1',
          icon: '✅',
          color: 'bg-green-100 text-green-800'
        },
        {
          id: '2',
          type: 'NEW_MESSAGE',
          title: 'ข้อความใหม่',
          message: 'คุณมีข้อความใหม่จาก สมศรี ใจดี',
          timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
          isRead: false,
          isImportant: false,
          actionUrl: '/chat',
          icon: '💬',
          color: 'bg-blue-100 text-blue-800'
        },
        {
          id: '3',
          type: 'ACHIEVEMENT',
          title: 'ได้รับรางวัลใหม่!',
          message: 'ยินดีด้วย! คุณได้รับรางวัล "จิตอาสาดีเด่น"',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          isRead: true,
          isImportant: true,
          actionUrl: '/achievements',
          icon: '🏆',
          color: 'bg-yellow-100 text-yellow-800'
        },
        {
          id: '4',
          type: 'REMINDER',
          title: 'เตือนความจำ',
          message: 'งาน "ช่วยติดตั้งคอมพิวเตอร์" จะเริ่มในอีก 2 ชั่วโมง',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
          isRead: true,
          isImportant: false,
          actionUrl: '/task/2',
          icon: '⏰',
          color: 'bg-orange-100 text-orange-800'
        },
        {
          id: '5',
          type: 'TASK_COMPLETED',
          title: 'งานเสร็จสิ้น',
          message: 'งาน "พาไปตรวจสุขภาพ" เสร็จสิ้นแล้ว ขอบคุณสำหรับความช่วยเหลือ',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          isRead: true,
          isImportant: false,
          actionUrl: '/task/3',
          icon: '🎉',
          color: 'bg-purple-100 text-purple-800'
        },
        {
          id: '6',
          type: 'SYSTEM',
          title: 'อัปเดตระบบ',
          message: 'ระบบ GenMatch ได้รับการอัปเดตใหม่ เพิ่มฟีเจอร์การแจ้งเตือนแบบ Push',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
          isRead: true,
          isImportant: false,
          icon: '🔧',
          color: 'bg-gray-100 text-gray-800'
        }
      ];
      
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, isRead: true }
          : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  const getFilteredNotifications = () => {
    let filtered = notifications;
    
    // Apply filter
    if (filter === 'unread') {
      filtered = filtered.filter(notif => !notif.isRead);
    } else if (filter === 'important') {
      filtered = filtered.filter(notif => notif.isImportant);
    }
    
    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(notif => 
        notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notif.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'ตอนนี้';
    if (minutes < 60) return `${minutes} นาที`;
    if (hours < 24) return `${hours} ชั่วโมง`;
    if (days < 7) return `${days} วัน`;
    return date.toLocaleDateString('th-TH');
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'TASK_ACCEPTED':
        return <Check className="w-5 h-5" />;
      case 'NEW_MESSAGE':
        return <MessageCircle className="w-5 h-5" />;
      case 'ACHIEVEMENT':
        return <Award className="w-5 h-5" />;
      case 'REMINDER':
        return <Clock className="w-5 h-5" />;
      case 'TASK_COMPLETED':
        return <Star className="w-5 h-5" />;
      case 'SYSTEM':
        return <Settings className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Status Bar */}
      <div className="bg-white px-4 py-3 text-sm text-gray-600 text-center border-b border-gray-100 md:hidden">
        <div className="flex items-center justify-between">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <h1 className="text-lg font-semibold text-gray-900">การแจ้งเตือน</h1>
            
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="p-2 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  <Check className="w-5 h-5" />
                </button>
              )}
              <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filter */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาการแจ้งเตือน..."
              className="w-full pl-10 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ทั้งหมด ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                filter === 'unread'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ยังไม่อ่าน ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('important')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                filter === 'important'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              สำคัญ ({notifications.filter(n => n.isImportant).length})
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12 px-4">
            <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchQuery ? 'ไม่พบการแจ้งเตือนที่ค้นหา' : 'ไม่มีการแจ้งเตือน'}
            </h3>
            <p className="text-gray-600">
              {searchQuery 
                ? 'ลองเปลี่ยนคำค้นหาหรือล้างตัวกรอง'
                : 'คุณจะได้รับการแจ้งเตือนเมื่อมีกิจกรรมใหม่'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white px-4 py-4 hover:bg-gray-50 transition-colors ${
                  !notification.isRead ? 'border-l-4 border-l-indigo-500' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Icon */}
                  <div className={`w-10 h-10 ${notification.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className={`font-semibold mb-1 ${
                          !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{formatTime(notification.timestamp)}</span>
                          {notification.isImportant && (
                            <span className="flex items-center space-x-1 text-orange-600">
                              <AlertCircle className="w-3 h-3" />
                              สำคัญ
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 ml-3">
                        {!notification.isRead && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-2 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Action Button */}
                    {notification.actionUrl && (
                      <div className="mt-3">
                        <Link
                          href={notification.actionUrl}
                          onClick={() => markAsRead(notification.id)}
                          className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-200 transition-colors"
                        >
                          ดูรายละเอียด
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Mobile Safe Area */}
      <div className="h-6 bg-gray-50 md:hidden"></div>
    </div>
  );
}
