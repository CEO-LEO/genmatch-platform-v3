'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Bell, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Star,
  MessageCircle,
  Users,
  Calendar,
  MapPin,
  MoreVertical,
  Trash2,
  Settings
} from 'lucide-react';

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);

  const mockNotifications = {
    all: [
      {
        id: '1',
        type: 'task_update',
        title: 'งานจิตอาสาได้รับการอัปเดต',
        message: 'งาน "ช่วยเหลือผู้สูงอายุที่โรงพยาบาล" มีการเปลี่ยนแปลงวันที่และเวลา',
        time: '5 นาทีที่แล้ว',
        read: false,
        priority: 'high',
        icon: '🏥',
        action: 'ดูรายละเอียด'
      },
      {
        id: '2',
        type: 'new_message',
        title: 'ข้อความใหม่จากคุณยายสมศรี',
        message: 'ขอบคุณที่ช่วยเหลือเมื่อวานนี้ งานเสร็จเรียบร้อยดีมาก',
        time: '1 ชั่วโมงที่แล้ว',
        read: false,
        priority: 'medium',
        icon: '💬',
        action: 'อ่านข้อความ'
      },
      {
        id: '3',
        type: 'task_completed',
        title: 'งานจิตอาสาเสร็จสิ้น',
        message: 'งาน "ทำความสะอาดวัด" เสร็จสิ้นแล้ว คุณได้รับคะแนน 5 ดาว',
        time: '2 ชั่วโมงที่แล้ว',
        read: true,
        priority: 'low',
        icon: '✅',
        action: 'ดูผลลัพธ์'
      },
      {
        id: '4',
        type: 'reminder',
        title: 'เตือนความจำ: งานจิตอาสาพรุ่งนี้',
        message: 'อย่าลืมงาน "สอนคอมพิวเตอร์ให้ผู้สูงอายุ" พรุ่งนี้เวลา 14:00 น.',
        time: '1 วันที่แล้ว',
        read: true,
        priority: 'medium',
        icon: '⏰',
        action: 'ดูรายละเอียด'
      },
      {
        id: '5',
        type: 'system',
        title: 'อัปเดตระบบใหม่',
        message: 'GenMatch ได้รับการอัปเดตฟีเจอร์ใหม่ เพิ่มระบบการแจ้งเตือนที่ทันสมัย',
        time: '2 วันที่แล้ว',
        read: true,
        priority: 'low',
        icon: '🔔',
        action: 'เรียนรู้เพิ่มเติม'
      }
    ],
    unread: [
      {
        id: '1',
        type: 'task_update',
        title: 'งานจิตอาสาได้รับการอัปเดต',
        message: 'งาน "ช่วยเหลือผู้สูงอายุที่โรงพยาบาล" มีการเปลี่ยนแปลงวันที่และเวลา',
        time: '5 นาทีที่แล้ว',
        read: false,
        priority: 'high',
        icon: '🏥',
        action: 'ดูรายละเอียด'
      },
      {
        id: '2',
        type: 'new_message',
        title: 'ข้อความใหม่จากคุณยายสมศรี',
        message: 'ขอบคุณที่ช่วยเหลือเมื่อวานนี้ งานเสร็จเรียบร้อยดีมาก',
        time: '1 ชั่วโมงที่แล้ว',
        read: false,
        priority: 'medium',
        icon: '💬',
        action: 'อ่านข้อความ'
      }
    ]
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-gray-300 bg-gray-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'สำคัญ';
      case 'medium': return 'ปานกลาง';
      case 'low': return 'ทั่วไป';
      default: return 'ทั่วไป';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'task_update': return <Calendar className="w-5 h-5 text-blue-600" />;
      case 'new_message': return <MessageCircle className="w-5 h-5 text-green-600" />;
      case 'task_completed': return <CheckCircle className="w-5 h-5 text-purple-600" />;
      case 'reminder': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'system': return <Bell className="w-5 h-5 text-gray-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const toggleNotification = (id: string) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(n => n !== id)
        : [...prev, id]
    );
  };

  const markAsRead = (id: string) => {
    // TODO: Implement mark as read logic
    console.log('Mark as read:', id);
  };

  const deleteNotification = (id: string) => {
    // TODO: Implement delete notification logic
    console.log('Delete notification:', id);
  };

  const markAllAsRead = () => {
    // TODO: Implement mark all as read logic
    console.log('Mark all as read');
  };

  const clearAll = () => {
    // TODO: Implement clear all logic
    console.log('Clear all notifications');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-white">GM</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-gray-900">GenMatch</h1>
                <div className="text-sm text-gray-600 leading-tight">
                  <span>Generation</span><br/>
                  <span>Matching</span>
                </div>
              </div>
            </div>
            
            {/* Back Button */}
            <Link 
              href="/"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>กลับหน้าหลัก</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">การแจ้งเตือน</h2>
            <p className="text-gray-600">ติดตามการอัปเดตและข้อความสำคัญทั้งหมด</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {mockNotifications.all.length}
              </div>
              <div className="text-sm text-gray-600">ทั้งหมด</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {mockNotifications.unread.length}
              </div>
              <div className="text-sm text-gray-600">ยังไม่อ่าน</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {mockNotifications.all.filter(n => n.read).length}
              </div>
              <div className="text-sm text-gray-600">อ่านแล้ว</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white border border-gray-200 rounded-2xl p-2 shadow-sm mb-6">
            <div className="flex">
              {[
                { id: 'all', label: 'ทั้งหมด', count: mockNotifications.all.length },
                { id: 'unread', label: 'ยังไม่อ่าน', count: mockNotifications.unread.length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>{tab.label}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100'
                    }`}>
                      {tab.count}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-sm"
              >
                <CheckCircle className="w-4 h-4 inline mr-2" />
                อ่านทั้งหมด
              </button>
              <button
                onClick={clearAll}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm"
              >
                <Trash2 className="w-4 h-4 inline mr-2" />
                ลบทั้งหมด
              </button>
            </div>
            
            <Link
              href="/settings"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>ตั้งค่าการแจ้งเตือน</span>
            </Link>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {mockNotifications[activeTab as keyof typeof mockNotifications].length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่มีการแจ้งเตือน</h3>
                <p className="text-gray-600">คุณจะได้รับการแจ้งเตือนที่นี่เมื่อมีกิจกรรมใหม่</p>
              </div>
            ) : (
              mockNotifications[activeTab as keyof typeof mockNotifications].map((notification) => (
                <div 
                  key={notification.id} 
                  className={`bg-white border-2 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all ${
                    notification.read ? 'opacity-75' : ''
                  } ${getPriorityColor(notification.priority)}`}
                >
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-gray-200">
                        <span className="text-2xl">{notification.icon}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          )}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            notification.priority === 'high' ? 'bg-red-100 text-red-800' :
                            notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {getPriorityText(notification.priority)}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleNotification(notification.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              selectedNotifications.includes(notification.id)
                                ? 'bg-purple-100 text-purple-600'
                                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{notification.message}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{notification.time}</span>
                          </div>
                          {getTypeIcon(notification.type)}
                        </div>
                        
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm">
                          {notification.action}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 text-center">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">การดำเนินการด่วน</h3>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/search"
                  className="bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
                >
                  ค้นหางาน
                </Link>
                <Link
                  href="/my-tasks"
                  className="bg-white text-purple-600 border-2 border-purple-600 px-6 py-3 rounded-full font-medium hover:bg-purple-50 transition-colors"
                >
                  งานของฉัน
                </Link>
                <Link
                  href="/profile"
                  className="bg-white text-purple-600 border-2 border-purple-600 px-6 py-3 rounded-full font-medium hover:bg-purple-50 transition-colors"
                >
                  โปรไฟล์
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
