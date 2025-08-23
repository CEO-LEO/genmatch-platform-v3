'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Plus,
  MapPin,
  Calendar,
  Clock,
  Users,
  CheckCircle,
  Clock as ClockIcon,
  AlertCircle
} from 'lucide-react';

export default function MyTasksPage() {
  const [activeTab, setActiveTab] = useState('active');

  // Mock data for tasks
  const tasks = [
    {
      id: '1',
      title: 'พาไปตรวจสุขภาพที่โรงพยาบาล',
      description: 'ต้องการจิตอาสาพาไปตรวจสุขภาพที่โรงพยาบาลมหิดล',
      category: 'hospital',
      location: 'โรงพยาบาลมหิดล',
      date: '2024-03-15',
      time: '09:00',
      status: 'active',
      maxVolunteers: 2,
      currentVolunteers: 1,
      categoryName: 'โรงพยาบาล',
      categoryColor: 'bg-red-500'
    },
    {
      id: '2',
      title: 'ช่วยติดตั้งคอมพิวเตอร์',
      description: 'ต้องการความช่วยเหลือในการติดตั้งคอมพิวเตอร์และโปรแกรมพื้นฐาน',
      category: 'repair',
      location: 'บ้านพัก ถนนสุขุมวิท',
      date: '2024-03-20',
      time: '14:00',
      status: 'completed',
      maxVolunteers: 1,
      currentVolunteers: 1,
      categoryName: 'งานซ่อมแซม',
      categoryColor: 'bg-blue-500'
    },
    {
      id: '3',
      title: 'กิจกรรมจิตอาสาในวัด',
      description: 'ช่วยจัดกิจกรรมวันสำคัญของวัด',
      category: 'temple',
      location: 'วัดพระศรีมหาธาตุ',
      date: '2024-03-25',
      time: '08:00',
      status: 'pending',
      maxVolunteers: 3,
      currentVolunteers: 0,
      categoryName: 'วัด',
      categoryColor: 'bg-yellow-500'
    }
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'active':
        return { color: 'text-green-600', bg: 'bg-green-50', icon: ClockIcon, text: 'กำลังดำเนินการ' };
      case 'completed':
        return { color: 'text-blue-600', bg: 'bg-blue-50', icon: CheckCircle, text: 'เสร็จสิ้น' };
      case 'pending':
        return { color: 'text-orange-600', bg: 'bg-orange-50', icon: AlertCircle, text: 'รอการอนุมัติ' };
      default:
        return { color: 'text-gray-600', bg: 'bg-gray-50', icon: ClockIcon, text: 'ไม่ทราบสถานะ' };
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'all') return true;
    return task.status === activeTab;
  });

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
              <h1 className="text-lg font-bold text-gray-900">งานของฉัน</h1>
              <p className="text-sm text-gray-500">จัดการงานจิตอาสาที่สร้าง</p>
            </div>
          </div>
          
          <Link
            href="/add-task"
            className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center"
          >
            <Plus className="w-5 h-5 text-white" />
          </Link>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex space-x-1">
          {[
            { id: 'all', label: 'ทั้งหมด', count: tasks.length },
            { id: 'active', label: 'กำลังดำเนินการ', count: tasks.filter(t => t.status === 'active').length },
            { id: 'completed', label: 'เสร็จสิ้น', count: tasks.filter(t => t.status === 'completed').length },
            { id: 'pending', label: 'รอการอนุมัติ', count: tasks.filter(t => t.status === 'pending').length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                activeTab === tab.id
                  ? 'bg-purple-200 text-purple-700'
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 py-6 pb-24">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">ยังไม่มีงาน</h3>
            <p className="text-gray-500 mb-6">เริ่มต้นสร้างงานจิตอาสาแรกของคุณ</p>
            <Link
              href="/add-task"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              สร้างงานใหม่
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => {
              const statusInfo = getStatusInfo(task.status);
              const StatusIcon = statusInfo.icon;
              
              return (
                <div key={task.id} className="bg-white rounded-xl p-6 shadow-sm">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${task.categoryColor} rounded-lg flex items-center justify-center`}>
                        <span className="text-white text-sm font-bold">
                          {task.categoryName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{task.title}</h3>
                        <p className="text-sm text-gray-500">{task.categoryName}</p>
                      </div>
                    </div>
                    
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${statusInfo.bg}`}>
                      <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                      <span className={`text-sm font-medium ${statusInfo.color}`}>
                        {statusInfo.text}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 mb-4">{task.description}</p>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{task.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(task.date).toLocaleDateString('th-TH')}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{task.time}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{task.currentVolunteers}/{task.maxVolunteers}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>ความคืบหน้า</span>
                      <span>{Math.round((task.currentVolunteers / task.maxVolunteers) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(task.currentVolunteers / task.maxVolunteers) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <button className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                      แก้ไข
                    </button>
                    <button className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
