'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Bell, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Info, 
  Trash2,
  ArrowLeft,
  Settings
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'งานจิตอาสาสำเร็จ',
      message: 'งานช่วยเหลือผู้สูงอายุที่โรงพยาบาลมหาราชเสร็จสิ้นแล้ว ขอบคุณสำหรับการเป็นจิตอาสา',
      time: '2 นาทีที่แล้ว',
      isRead: false
    },
    {
      id: '2',
      type: 'info',
      title: 'งานใหม่ที่แนะนำ',
      message: 'มีงานจิตอาสาใหม่ที่ตรงกับความสนใจของคุณ: ทำความสะอาดวัดพระศรีมหาธาตุ',
      time: '15 นาทีที่แล้ว',
      isRead: false
    },
    {
      id: '3',
      type: 'warning',
      title: 'งานใกล้ถึงกำหนด',
      message: 'งานจิตอาสาที่คุณรับไว้จะเริ่มในอีก 2 ชั่วโมง อย่าลืมเตรียมตัวให้พร้อม',
      time: '1 ชั่วโมงที่แล้ว',
      isRead: true
    },
    {
      id: '4',
      type: 'error',
      title: 'งานถูกยกเลิก',
      message: 'งานจิตอาสาที่โรงพยาบาลมหาราชถูกยกเลิกเนื่องจากสถานการณ์ไม่เอื้ออำนวย',
      time: '2 ชั่วโมงที่แล้ว',
      isRead: true
    },
    {
      id: '5',
      type: 'success',
      title: 'ได้รับคะแนนรีวิว',
      message: 'คุณได้รับคะแนนรีวิว 5 ดาวจากงานจิตอาสาล่าสุด ขอบคุณสำหรับการทำงานที่ดี',
      time: '1 วันที่แล้ว',
      isRead: true
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'error':
        return <XCircle className="w-6 h-6 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-6 h-6 text-yellow-500" />;
      case 'info':
        return <Info className="w-6 h-6 text-blue-500" />;
      default:
        return <Bell className="w-6 h-6 text-gray-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500 bg-green-50';
      case 'error':
        return 'border-l-red-500 bg-red-50';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'info':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/" className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">การแจ้งเตือน</h1>
                <p className="text-sm text-gray-600">จัดการการแจ้งเตือนทั้งหมด</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={markAllAsRead}
                className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
                title="ทำเครื่องหมายว่าอ่านแล้วทั้งหมด"
              >
                <CheckCircle className="w-6 h-6" />
              </button>
              <Link href="/settings" className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
                <Settings className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 pb-24">
        {/* Stats */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">ภาพรวม</h2>
            <span className="text-sm text-gray-600">
              {notifications.length} การแจ้งเตือนทั้งหมด
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{unreadCount}</div>
              <div className="text-sm text-gray-600">ยังไม่อ่าน</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {notifications.length - unreadCount}
              </div>
              <div className="text-sm text-gray-600">อ่านแล้ว</div>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่มีการแจ้งเตือน</h3>
              <p className="text-gray-600">คุณจะเห็นการแจ้งเตือนใหม่ที่นี่</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border-l-4 ${getNotificationColor(notification.type)} ${
                  !notification.isRead ? 'ring-2 ring-purple-200' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className={`text-lg font-semibold mb-2 ${
                          !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                        </h3>
                        <p className="text-gray-600 mb-3 leading-relaxed">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            {notification.time}
                          </span>
                          {!notification.isRead && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              ใหม่
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                        title="ทำเครื่องหมายว่าอ่านแล้ว"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="ลบการแจ้งเตือน"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">การดำเนินการ</h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={markAllAsRead}
                className="bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
              >
                ทำเครื่องหมายว่าอ่านแล้วทั้งหมด
              </button>
              <Link
                href="/"
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                กลับหน้าหลัก
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around py-2">
          <Link 
            href="/"
            className="flex flex-col items-center py-2 px-3 rounded-lg text-gray-600 hover:text-purple-600 transition-colors"
          >
            <div className="w-6 h-6 mb-1">🏠</div>
            <span className="text-xs">หน้าหลัก</span>
          </Link>
          <Link 
            href="/search"
            className="flex flex-col items-center py-2 px-3 rounded-lg text-gray-600 hover:text-purple-600 transition-colors"
          >
            <div className="w-6 h-6 mb-1">🔍</div>
            <span className="text-xs">ค้นหา</span>
          </Link>
          <Link 
            href="/add-task"
            className="flex flex-col items-center py-2 px-3 rounded-lg text-gray-600 hover:text-purple-600 transition-colors"
          >
            <div className="w-6 h-6 mb-1">➕</div>
            <span className="text-xs">สร้างงาน</span>
          </Link>
          <Link 
            href="/my-tasks"
            className="flex flex-col items-center py-2 px-3 rounded-lg text-gray-600 hover:text-purple-600 transition-colors"
          >
            <div className="w-6 h-6 mb-1">❤️</div>
            <span className="text-xs">งานของฉัน</span>
          </Link>
          <Link 
            href="/profile"
            className="flex flex-col items-center py-2 px-3 rounded-lg text-gray-600 hover:text-purple-600 transition-colors"
          >
            <div className="w-6 h-6 mb-1">👤</div>
            <span className="text-xs">โปรไฟล์</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
