'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  Clock,
  X,
  MessageCircle,
  Star,
  Plus
} from 'lucide-react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'success',
      title: 'งานเสร็จสิ้น',
      message: 'งาน "ช่วยติดตั้งคอมพิวเตอร์" เสร็จสิ้นแล้ว',
      time: '2 ชั่วโมงที่แล้ว',
      read: false,
      action: 'view-task',
      taskId: 'task_1'
    },
    {
      id: '2',
      type: 'info',
      title: 'มีจิตอาสาใหม่',
      message: 'คุณสมชาย ใจดี รับงาน "พาไปตรวจสุขภาพที่โรงพยาบาล"',
      time: '1 วันที่แล้ว',
      read: false,
      action: 'view-profile',
      userId: 'user_2'
    },
    {
      id: '3',
      type: 'warning',
      title: 'งานใกล้ถึงกำหนด',
      message: 'งาน "กิจกรรมจิตอาสาในวัด" จะเริ่มในอีก 2 วัน',
      time: '2 วันที่แล้ว',
      read: true,
      action: 'view-task',
      taskId: 'task_3'
    },
    {
      id: '4',
      type: 'success',
      title: 'ได้รับคะแนน',
      message: 'คุณได้รับ 5 ดาวจากงาน "ช่วยซื้อของที่ซุปเปอร์มาร์เก็ต"',
      time: '3 วันที่แล้ว',
      read: true,
      action: 'view-review',
      taskId: 'task_4'
    },
    {
      id: '5',
      type: 'info',
      title: 'อัปเดตระบบ',
      message: 'ระบบได้รับการอัปเดตใหม่ เพิ่มฟีเจอร์การแชท',
      time: '1 สัปดาห์ที่แล้ว',
      read: true,
      action: 'none'
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const markAsRead = (id: string) => {
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

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-gray-900">การแจ้งเตือน</h1>
              <p className="text-sm text-gray-500">
                {unreadCount > 0 ? `${unreadCount} รายการใหม่` : 'ไม่มีรายการใหม่'}
              </p>
            </div>
          </div>
          
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
            >
              อ่านทั้งหมด
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 pb-24">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่มีการแจ้งเตือน</h3>
            <p className="text-gray-500">คุณจะได้รับการแจ้งเตือนเมื่อมีกิจกรรมใหม่</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-xl p-4 shadow-sm border-l-4 ${
                  notification.read ? 'opacity-75' : ''
                } ${getNotificationColor(notification.type)}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`text-sm font-medium ${
                          notification.read ? 'text-gray-600' : 'text-gray-900'
                        }`}>
                          {notification.title}
                        </h4>
                        <p className={`text-sm mt-1 ${
                          notification.read ? 'text-gray-500' : 'text-gray-700'
                        }`}>
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {notification.time}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-3">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center hover:bg-purple-200 transition-colors"
                          >
                            <CheckCircle className="w-3 h-3 text-purple-600" />
                          </button>
                        )}
                        
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                          <X className="w-3 h-3 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    {notification.action !== 'none' && (
                      <div className="mt-3 flex space-x-2">
                        {notification.action === 'view-task' && (
                          <Link
                            href={`/task/${notification.taskId}`}
                            className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium hover:bg-purple-200 transition-colors"
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            ดูงาน
                          </Link>
                        )}
                        
                        {notification.action === 'view-profile' && (
                          <Link
                            href={`/profile/${notification.userId}`}
                            className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors"
                          >
                            <MessageCircle className="w-3 h-3 mr-1" />
                            ดูโปรไฟล์
                          </Link>
                        )}
                        
                        {notification.action === 'view-review' && (
                          <Link
                            href={`/task/${notification.taskId}/review`}
                            className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium hover:bg-yellow-200 transition-colors"
                          >
                            <Star className="w-3 h-3 mr-1" />
                            ดูรีวิว
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
      </main>
    </div>
  );
}
