'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, Check, Trash2, Clock, AlertCircle, Info, CheckCircle } from 'lucide-react';

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);

  const mockNotifications = [
    {
      id: 1,
      type: 'task',
      title: 'งานจิตอาสาใหม่',
      message: 'มีงานจิตอาสาใหม่ "ช่วยเหลือในโรงพยาบาล" ที่อาจเหมาะกับคุณ',
      time: '5 นาทีที่แล้ว',
      isRead: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'reminder',
      title: 'เตือนความจำ',
      message: 'งานจิตอาสา "ทำความสะอาดวัด" จะเริ่มในอีก 2 ชั่วโมง',
      time: '1 ชั่วโมงที่แล้ว',
      isRead: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'update',
      title: 'อัปเดตสถานะ',
      message: 'งานจิตอาสา "สอนคอมพิวเตอร์" ได้รับการยืนยันแล้ว',
      time: '3 ชั่วโมงที่แล้ว',
      isRead: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'message',
      title: 'ข้อความใหม่',
      message: 'คุณยายสมศรีส่งข้อความถึงคุณเกี่ยวกับงานจิตอาสา',
      time: '1 วันที่แล้ว',
      isRead: true,
      priority: 'medium'
    },
    {
      id: 5,
      type: 'achievement',
      title: 'ความสำเร็จใหม่',
      message: 'ยินดีด้วย! คุณได้รับเหรียญ "จิตอาสาต้นแบบ"',
      time: '2 วันที่แล้ว',
      isRead: true,
      priority: 'low'
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'task':
        return <Bell className="w-5 h-5 text-blue-600" />;
      case 'reminder':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'update':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'message':
        return <AlertCircle className="w-5 h-5 text-purple-600" />;
      case 'achievement':
        return <Info className="w-5 h-5 text-pink-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-300';
    }
  };

  const toggleNotificationSelection = (id: number) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(n => n !== id)
        : [...prev, id]
    );
  };

  const markAllAsRead = () => {
    // Handle mark all as read logic here
    console.log('Mark all as read');
  };

  const deleteSelected = () => {
    // Handle delete selected notifications logic here
    console.log('Delete selected:', selectedNotifications);
    setSelectedNotifications([]);
  };

  const filteredNotifications = activeTab === 'all' 
    ? mockNotifications 
    : mockNotifications.filter(n => 
        activeTab === 'unread' ? !n.isRead : n.isRead
      );

  const unreadCount = mockNotifications.filter(n => !n.isRead).length;
  const readCount = mockNotifications.filter(n => n.isRead).length;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-2">
                <span className="text-white font-bold text-lg">GM</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">GenMatch</h1>
                <p className="text-sm text-gray-500">Generation Matching</p>
              </div>
            </div>

            {/* Back to Home Button */}
            <Link 
              href="/"
              className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
            >
              กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">การแจ้งเตือน</h2>
          <p className="text-gray-600">จัดการการแจ้งเตือนและข้อความสำคัญ</p>
        </div>

        {/* Notification Statistics */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">{mockNotifications.length}</div>
            <div className="text-sm text-gray-600">ทั้งหมด</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{unreadCount}</div>
            <div className="text-sm text-gray-600">ยังไม่อ่าน</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{readCount}</div>
            <div className="text-sm text-gray-600">อ่านแล้ว</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="flex space-x-2 mb-4 sm:mb-0">
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
            >
              อ่านทั้งหมด
            </button>
            {selectedNotifications.length > 0 && (
              <button
                onClick={deleteSelected}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                ลบที่เลือก ({selectedNotifications.length})
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              ทั้งหมด
            </button>
            <button
              onClick={() => setActiveTab('unread')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'unread'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              ยังไม่อ่าน
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่มีการแจ้งเตือน</h3>
              <p className="text-gray-600">
                {activeTab === 'unread' ? 'คุณได้อ่านการแจ้งเตือนทั้งหมดแล้ว' : 'ยังไม่มีการแจ้งเตือน'}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white border border-gray-200 rounded-2xl p-6 shadow-sm ${
                  !notification.isRead ? 'border-l-4' : ''
                } ${getPriorityColor(notification.priority)}`}
              >
                <div className="flex items-start space-x-4">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedNotifications.includes(notification.id)}
                    onChange={() => toggleNotificationSelection(notification.id)}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-1"
                  />

                  {/* Notification Icon */}
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Notification Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className={`text-lg font-semibold mb-2 ${
                          !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                        </h4>
                        <p className="text-gray-600 mb-3">{notification.message}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {notification.time}
                          </span>
                          {!notification.isRead && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                              ใหม่
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-2">
                    {!notification.isRead && (
                      <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                        <Check className="w-5 h-5" />
                      </button>
                    )}
                    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">การดำเนินการอย่างรวดเร็ว</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/search"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              ค้นหางาน
            </Link>
            <Link
              href="/my-tasks"
              className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium"
            >
              งานของฉัน
            </Link>
            <Link
              href="/profile"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              โปรไฟล์
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
