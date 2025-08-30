'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Bell, CheckCircle, Clock, AlertCircle, MessageCircle, User, MapPin, Calendar, X, Loader, RefreshCw } from 'lucide-react';

export default function NotificationsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'งานเสร็จสิ้น',
      message: 'งาน "ช่วยเหลือในโรงพยาบาล" เสร็จสิ้นแล้ว ขอบคุณสำหรับความช่วยเหลือ',
      time: '2 ชั่วโมงที่แล้ว',
      read: false,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 2,
      type: 'message',
      title: 'ข้อความใหม่',
      message: 'คุณสมศรี ส่งข้อความใหม่เกี่ยวกับงาน "ช่วยซื้อของ"',
      time: '1 วันที่แล้ว',
      read: false,
      icon: MessageCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 3,
      type: 'reminder',
      title: 'เตือนความจำ',
      message: 'งาน "ช่วยสอนหนังสือเด็ก" จะเริ่มในอีก 2 ชั่วโมง',
      time: '3 ชั่วโมงที่แล้ว',
      read: true,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 4,
      type: 'info',
      title: 'ข้อมูลใหม่',
      message: 'มีงานจิตอาสาใหม่ในพื้นที่ของคุณ ไปดูกันเลย!',
      time: '1 วันที่แล้ว',
      read: true,
      icon: Bell,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 5,
      type: 'warning',
      title: 'การเปลี่ยนแปลง',
      message: 'งาน "ช่วยจัดงานวัด" มีการเปลี่ยนแปลงเวลา กรุณาตรวจสอบ',
      time: '2 วันที่แล้ว',
      read: true,
      icon: AlertCircle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [showClearAll, setShowClearAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(true);
    
    try {
      // For now, use enhanced mock data that simulates real-time updates
      const enhancedNotifications = [
        {
          id: 1,
          type: 'success',
          title: 'งานเสร็จสิ้น',
          message: 'งาน "ช่วยพาออกกำลังกาย" เสร็จสิ้นแล้ว ขอบคุณสำหรับความช่วยเหลือ',
          time: '2 ชั่วโมงที่แล้ว',
          read: false,
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          taskId: 1,
          actionUrl: '/my-tasks'
        },
        {
          id: 2,
          type: 'message',
          title: 'ข้อความใหม่',
          message: 'สมชาย ใจดี ส่งข้อความใหม่เกี่ยวกับงาน "ช่วยพาออกกำลังกาย"',
          time: '1 ชั่วโมงที่แล้ว',
          read: false,
          icon: MessageCircle,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          taskId: 1,
          actionUrl: '/chat'
        },
        {
          id: 3,
          type: 'info',
          title: 'งานใหม่ตรงกับความสนใจ',
          message: 'มีงาน "งานซ่อมแซมบ้าน" ใหม่ในพื้นที่ของคุณ',
          time: '3 ชั่วโมงที่แล้ว',
          read: true,
          icon: Bell,
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          taskId: 2,
          actionUrl: '/search'
        },
        {
          id: 4,
          type: 'reminder',
          title: 'เตือนความจำ',
          message: 'งาน "ช่วยจัดงานบุญที่วัด" จะเริ่มในอีก 1 วัน',
          time: '5 ชั่วโมงที่แล้ว',
          read: true,
          icon: Clock,
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          taskId: 3,
          actionUrl: '/search'
        }
      ];
      
      setNotifications(enhancedNotifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAllRead = () => {
    setNotifications(prev => prev.filter(notif => !notif.read));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const unreadCount = notifications.filter(notif => !notif.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'message':
        return <MessageCircle className="w-5 h-5 text-blue-600" />;
      case 'reminder':
        return <Clock className="w-5 h-5 text-orange-600" />;
      case 'info':
        return <Bell className="w-5 h-5 text-purple-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">GM</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">GenMatch</h1>
                  <p className="text-sm text-gray-600">แพลตฟอร์มจิตอาสา</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={loadNotifications}
                disabled={isLoading}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>รีเฟรช</span>
              </button>
              <button
                onClick={() => setShowClearAll(!showClearAll)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                จัดการ
              </button>
              <Link 
                href="/dashboard"
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>กลับ Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">การแจ้งเตือน</h1>
                <p className="text-gray-600">ติดตามกิจกรรมและข้อความล่าสุด</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">{unreadCount}</div>
              <div className="text-sm text-gray-600">ข้อความใหม่</div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ทั้งหมด ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'unread'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ยังไม่อ่าน ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'read'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              อ่านแล้ว ({notifications.filter(n => n.read).length})
            </button>
          </div>

          {/* Action Buttons */}
          {showClearAll && (
            <div className="mt-4 flex space-x-3">
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                อ่านทั้งหมด
              </button>
              <button
                onClick={clearAllRead}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                ลบที่อ่านแล้ว
              </button>
            </div>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">กำลังโหลดการแจ้งเตือน...</p>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ไม่มีการแจ้งเตือน</h3>
              <p className="text-gray-600">
                {filter === 'unread' 
                  ? 'คุณได้อ่านการแจ้งเตือนทั้งหมดแล้ว'
                  : filter === 'read'
                  ? 'ยังไม่มีการแจ้งเตือนที่อ่านแล้ว'
                  : 'ยังไม่มีการแจ้งเตือนใดๆ'
                }
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-2xl shadow-lg p-6 transition-all duration-200 ${
                  !notification.read ? 'ring-2 ring-purple-200' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 ${notification.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {notification.title}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {notification.time}
                          </span>
                          {!notification.read && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium">
                              ใหม่
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        {notification.actionUrl && (
                          <Link
                            href={notification.actionUrl}
                            className="px-3 py-1 bg-purple-600 text-white text-xs rounded-lg hover:bg-purple-700 transition-colors font-medium"
                            onClick={() => markAsRead(notification.id)}
                          >
                            ดูรายละเอียด
                          </Link>
                        )}
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="ทำเครื่องหมายว่าอ่านแล้ว"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="ลบการแจ้งเตือน"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-4 flex space-x-3">
                      {notification.type === 'message' && (
                        <Link
                          href="/chat"
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          ดูข้อความ
                        </Link>
                      )}
                      {notification.type === 'reminder' && (
                        <Link
                          href="/search"
                          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
                        >
                          ดูรายละเอียดงาน
                        </Link>
                      )}
                      {notification.type === 'info' && (
                        <Link
                          href="/search"
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                        >
                          ดูงานใหม่
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">สถิติการแจ้งเตือน</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">{notifications.length}</div>
              <div className="text-sm text-gray-600">ทั้งหมด</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">{unreadCount}</div>
              <div className="text-sm text-gray-600">ยังไม่อ่าน</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">{notifications.filter(n => n.type === 'success').length}</div>
              <div className="text-sm text-gray-600">งานเสร็จสิ้น</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <div className="text-2xl font-bold text-orange-600">{notifications.filter(n => n.type === 'message').length}</div>
              <div className="text-sm text-gray-600">ข้อความ</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
