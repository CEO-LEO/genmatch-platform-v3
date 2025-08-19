'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  Bell, 
  Check, 
  Trash2, 
  ArrowLeft,
  MessageCircle,
  Calendar,
  Clock,
  User,
  Heart,
  Award,
  AlertCircle,
  Info
} from 'lucide-react';
import Link from 'next/link';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'TASK' | 'CHAT' | 'SYSTEM' | 'ACHIEVEMENT';
  isRead: boolean;
  createdAt: string;
  taskId?: string;
  userId?: string;
}

export default function Notifications() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'UNREAD' | 'READ'>('ALL');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
      loadNotifications();
    }
  }, [user, loading, router]);

  const loadNotifications = async () => {
    try {
      const response = await fetch('/api/notifications', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const userNotifications = await response.json();
        setNotifications(userNotifications);
      } else {
        // Mock data for demo
        const mockNotifications: Notification[] = [
          {
            id: '1',
            title: 'งานเสร็จสิ้น',
            message: 'งาน "พาไปตรวจสุขภาพที่โรงพยาบาล" เสร็จสิ้นแล้ว ขอบคุณที่ใช้บริการ',
            type: 'TASK',
            isRead: false,
            createdAt: '2024-01-20T10:30:00Z',
            taskId: 'task-1'
          },
          {
            id: '2',
            title: 'ข้อความใหม่',
            message: 'คุณสมชาย ส่งข้อความใหม่ในงาน "พาไปทำบุญที่วัดพระแก้ว"',
            type: 'CHAT',
            isRead: false,
            createdAt: '2024-01-20T09:15:00Z',
            taskId: 'task-2'
          },
          {
            id: '3',
            title: 'ได้รับความสำเร็จใหม่',
            message: 'ยินดีด้วย! คุณได้รับความสำเร็จ "จิตอาสาครั้งแรก"',
            type: 'ACHIEVEMENT',
            isRead: true,
            createdAt: '2024-01-19T16:45:00Z'
          },
          {
            id: '4',
            title: 'งานใหม่ที่แนะนำ',
            message: 'มีงานใหม่ที่ตรงกับความสนใจของคุณ: "ช่วยซ่อมคอมพิวเตอร์"',
            type: 'TASK',
            isRead: true,
            createdAt: '2024-01-19T14:20:00Z',
            taskId: 'task-3'
          },
          {
            id: '5',
            title: 'อัปเดตระบบ',
            message: 'ระบบได้รับการอัปเดตใหม่ เพิ่มฟีเจอร์การแจ้งเตือนแบบ Real-time',
            type: 'SYSTEM',
            isRead: true,
            createdAt: '2024-01-18T11:00:00Z'
          },
          {
            id: '6',
            title: 'งานถูกยกเลิก',
            message: 'งาน "พาไปออกกำลังกาย" ถูกยกเลิกโดยผู้สร้างงาน',
            type: 'TASK',
            isRead: true,
            createdAt: '2024-01-17T15:30:00Z',
            taskId: 'task-4'
          }
        ];
        setNotifications(mockNotifications);
      }
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      // In a real app, this would call an API
      setNotifications(prev => prev.map(notification =>
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      ));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      // In a real app, this would call an API
      setNotifications(prev => prev.map(notification => ({
        ...notification,
        isRead: true
      })));
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      // In a real app, this would call an API
      setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'TASK':
        return <Calendar className="w-5 h-5" />;
      case 'CHAT':
        return <MessageCircle className="w-5 h-5" />;
      case 'ACHIEVEMENT':
        return <Award className="w-5 h-5" />;
      case 'SYSTEM':
        return <Info className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'TASK':
        return 'from-blue-500 to-indigo-500';
      case 'CHAT':
        return 'from-green-500 to-teal-500';
      case 'ACHIEVEMENT':
        return 'from-yellow-500 to-orange-500';
      case 'SYSTEM':
        return 'from-purple-500 to-pink-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'UNREAD') return !notification.isRead;
    if (filter === 'READ') return notification.isRead;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-400 mx-auto"></div>
          <p className="mt-4 text-lg text-white">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900">
      {/* Header */}
      <div className="glass-card mx-4 mt-4 p-6">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="text-white hover:text-pink-300 transition-colors">
            <ArrowLeft className="w-5 h-5 inline mr-2" />
            กลับไปหน้าแรก
          </Link>
          <h1 className="text-3xl font-bold text-white">การแจ้งเตือน</h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="glass-button-secondary px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check className="w-4 h-4 inline mr-2" />
              อ่านทั้งหมด
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-6 px-4">
        {/* Stats and Filters */}
        <div className="glass-card p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{notifications.length}</div>
              <div className="text-white/70 text-sm">ทั้งหมด</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400 mb-2">{unreadCount}</div>
              <div className="text-white/70 text-sm">ยังไม่อ่าน</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {notifications.filter(n => n.type === 'TASK').length}
              </div>
              <div className="text-white/70 text-sm">งาน</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {notifications.filter(n => n.type === 'CHAT').length}
              </div>
              <div className="text-white/70 text-sm">แชท</div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center mt-6">
            <div className="flex bg-white/10 rounded-lg p-1">
              {[
                { key: 'ALL', label: 'ทั้งหมด', count: notifications.length },
                { key: 'UNREAD', label: 'ยังไม่อ่าน', count: unreadCount },
                { key: 'READ', label: 'อ่านแล้ว', count: notifications.length - unreadCount }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as any)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    filter === tab.key
                      ? 'bg-pink-500 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        {isLoading ? (
          <div className="glass-card p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-400 mx-auto mb-4"></div>
            <p className="text-white">กำลังโหลดการแจ้งเตือน...</p>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-10 h-10 text-white/40" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">ไม่มีการแจ้งเตือน</h3>
            <p className="text-white/60">
              {filter === 'ALL' 
                ? 'คุณยังไม่มีการแจ้งเตือนใดๆ' 
                : filter === 'UNREAD' 
                  ? 'ไม่มีข้อความที่ยังไม่อ่าน' 
                  : 'ไม่มีข้อความที่อ่านแล้ว'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`glass-card p-6 transition-all ${
                  !notification.isRead ? 'ring-2 ring-pink-400/50' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-r ${getNotificationColor(notification.type)} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`text-lg font-semibold ${
                        notification.isRead ? 'text-white/80' : 'text-white'
                      }`}>
                        {notification.title}
                      </h3>
                      
                      <div className="flex items-center space-x-2">
                        {!notification.isRead && (
                          <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                        )}
                        <span className="text-white/50 text-sm">
                          {new Date(notification.createdAt).toLocaleDateString('th-TH')}
                        </span>
                      </div>
                    </div>

                    <p className={`text-sm mb-3 ${
                      notification.isRead ? 'text-white/60' : 'text-white/80'
                    }`}>
                      {notification.message}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-white/50 text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(notification.createdAt).toLocaleTimeString('th-TH', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>

                      <div className="flex items-center space-x-2">
                        {!notification.isRead && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="glass-button-secondary px-3 py-1 text-xs hover:scale-105 transition-transform"
                          >
                            <Check className="w-3 h-3 inline mr-1" />
                            อ่านแล้ว
                          </button>
                        )}
                        
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="glass-button-secondary px-3 py-1 text-xs text-red-300 hover:text-red-200 hover:scale-105 transition-transform"
                        >
                          <Trash2 className="w-3 h-3 inline mr-1" />
                          ลบ
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {notification.taskId && (
                      <div className="mt-4 flex space-x-2">
                        <Link
                          href={`/task/${notification.taskId}`}
                          className="glass-button px-4 py-2 text-sm"
                        >
                          ดูรายละเอียดงาน
                        </Link>
                        
                        {notification.type === 'CHAT' && (
                          <Link
                            href={`/chat?task=${notification.taskId}`}
                            className="glass-button-secondary px-4 py-2 text-sm"
                          >
                            <MessageCircle className="w-4 h-4 inline mr-2" />
                            แชท
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="glass-card p-6 mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">การดำเนินการด่วน</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/search" className="glass-button-secondary p-4 text-center hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">ค้นหางาน</h4>
              <p className="text-white/70 text-sm">ค้นหางานที่เหมาะสมกับคุณ</p>
            </Link>
            
            <Link href="/chat" className="glass-button-secondary p-4 text-center hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">แชท</h4>
              <p className="text-white/70 text-sm">สื่อสารกับผู้ใช้อื่นๆ</p>
            </Link>
            
            <Link href="/profile" className="glass-button-secondary p-4 text-center hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">โปรไฟล์</h4>
              <p className="text-white/70 text-sm">จัดการโปรไฟล์และตั้งค่า</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
