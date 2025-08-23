'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle,
  MoreVertical,
  Star,
  Heart
} from 'lucide-react';

export default function MyTasksPage() {
  const [activeTab, setActiveTab] = useState('active');

  const mockTasks = {
    active: [
      {
        id: '1',
        title: 'ช่วยเหลือผู้สูงอายุที่โรงพยาบาล',
        description: 'ช่วยดูแลผู้ป่วยสูงอายุ ให้น้ำ อาหาร และพูดคุย',
        category: 'โรงพยาบาล',
        location: 'กรุงเทพมหานคร',
        date: '25 ส.ค. 2568',
        time: '09:00',
        maxVolunteers: 2,
        currentVolunteers: 1,
        status: 'active',
        progress: 50,
        rating: 4.8
      },
      {
        id: '2',
        title: 'ทำความสะอาดวัด',
        description: 'ช่วยทำความสะอาดบริเวณวัดและจัดดอกไม้',
        category: 'วัด',
        location: 'เชียงใหม่',
        date: '26 ส.ค. 2568',
        time: '08:00',
        maxVolunteers: 5,
        currentVolunteers: 3,
        status: 'active',
        progress: 60,
        rating: 4.6
      }
    ],
    completed: [
      {
        id: '3',
        title: 'สอนคอมพิวเตอร์ให้ผู้สูงอายุ',
        description: 'สอนการใช้คอมพิวเตอร์และอินเทอร์เน็ตพื้นฐาน',
        category: 'การศึกษา',
        location: 'กรุงเทพมหานคร',
        date: '20 ส.ค. 2568',
        time: '14:00',
        maxVolunteers: 3,
        currentVolunteers: 3,
        status: 'completed',
        progress: 100,
        rating: 4.9,
        completedDate: '22 ส.ค. 2568'
      }
    ],
    created: [
      {
        id: '4',
        title: 'ช่วยจัดกิจกรรมวันเด็ก',
        description: 'ช่วยจัดกิจกรรมและดูแลเด็กในงานวันเด็ก',
        category: 'การศึกษา',
        location: 'โรงเรียนวัดสระแก้ว',
        date: '30 ส.ค. 2568',
        time: '09:00',
        maxVolunteers: 4,
        currentVolunteers: 2,
        status: 'recruiting',
        progress: 50,
        rating: 0
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'recruiting': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'กำลังดำเนินการ';
      case 'completed': return 'เสร็จสิ้น';
      case 'recruiting': return 'กำลังรับสมัคร';
      default: return 'ไม่ทราบสถานะ';
    }
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">งานของฉัน</h2>
            <p className="text-gray-600">จัดการงานจิตอาสาที่คุณเข้าร่วมและสร้างขึ้น</p>
          </div>

          {/* Tabs */}
          <div className="bg-white border border-gray-200 rounded-2xl p-2 shadow-sm mb-8">
            <div className="flex">
              {[
                { id: 'active', label: 'กำลังดำเนินการ', count: mockTasks.active.length },
                { id: 'completed', label: 'เสร็จสิ้น', count: mockTasks.completed.length },
                { id: 'created', label: 'ที่สร้างขึ้น', count: mockTasks.created.length }
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

          {/* Task List */}
          <div className="space-y-4">
            {mockTasks[activeTab as keyof typeof mockTasks].length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่มีงานในหมวดหมู่นี้</h3>
                <p className="text-gray-600">เริ่มต้นสร้างงานจิตอาสาใหม่หรือค้นหางานที่เหมาะกับคุณ</p>
                <div className="mt-6 space-x-3">
                  <Link
                    href="/add-task"
                    className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    สร้างงานใหม่
                  </Link>
                  <Link
                    href="/search"
                    className="inline-block px-6 py-3 border border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors"
                  >
                    ค้นหางาน
                  </Link>
                </div>
              </div>
            ) : (
              mockTasks[activeTab as keyof typeof mockTasks].map((task) => (
                <div key={task.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  {/* Task Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                          {getStatusText(task.status)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{task.description}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Task Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{task.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{task.date} {task.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{task.currentVolunteers}/{task.maxVolunteers} คน</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{task.rating > 0 ? task.rating : 'ยังไม่มี'}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>ความคืบหน้า</span>
                      <span>{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          task.status === 'completed' ? 'bg-green-500' : 'bg-purple-500'
                        }`}
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Category and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">หมวดหมู่:</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                        {task.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {task.status === 'active' && (
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                          <CheckCircle className="w-4 h-4 inline mr-2" />
                          เสร็จสิ้น
                        </button>
                      )}
                      {task.status === 'recruiting' && (
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                          แก้ไข
                        </button>
                      )}
                      <Link
                        href={`/task/${task.id}`}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        ดูรายละเอียด
                      </Link>
                    </div>
                  </div>

                  {/* Completion Info */}
                  {task.status === 'completed' && task.completedDate && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>เสร็จสิ้นเมื่อ: {task.completedDate}</span>
                      </div>
                    </div>
                  )}
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
                  href="/add-task"
                  className="bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
                >
                  สร้างงานใหม่
                </Link>
                <Link
                  href="/search"
                  className="bg-white text-purple-600 border-2 border-purple-600 px-6 py-3 rounded-full font-medium hover:bg-purple-50 transition-colors"
                >
                  ค้นหางาน
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
