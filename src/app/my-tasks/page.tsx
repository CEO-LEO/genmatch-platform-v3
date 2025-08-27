'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Clock, Users, CheckCircle, Clock as ClockIcon, AlertCircle, Plus, Search, User, ArrowLeft } from 'lucide-react';

export default function MyTasksPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('ongoing');
  const [tasks, setTasks] = useState<any>({
    ongoing: [],
    completed: [],
    created: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }
    
    if (user) {
      loadUserTasks();
    }
  }, [user, loading, router]);

  const loadUserTasks = async () => {
    setIsLoading(true);
    
    try {
      // Get user ID from localStorage or context
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        setTasks({ ongoing: [], completed: [], created: [] });
        setIsLoading(false);
        return;
      }

      const userData = JSON.parse(userStr);
      
      // Mock data based on user type and ID
      if (userData.userType === 'ELDERLY') {
        // Elderly users create tasks
        setTasks({
                       ongoing: [
               {
                 id: 1,
                 title: 'ช่วยพาออกกำลังกาย',
                 category: 'ออกกำลังกาย',
                 location: 'กรุงเทพมหานคร',
                 date: '25 ส.ค. 2568',
                 time: '15.00 - 17.00',
                 progress: 60,
                 status: 'กำลังดำเนินการ',
                 createdBy: userData.id
               }
             ],
                       completed: [
               {
                 id: 2,
                 title: 'งานซ่อมแซมบ้าน',
                 category: 'งานซ่อม',
                 location: 'กรุงเทพมหานคร',
                 date: '20 ส.ค. 2568',
                 time: '14.00 - 16.00',
                 progress: 100,
                 status: 'เสร็จสิ้น',
                 rating: 5,
                 createdBy: userData.id
               }
             ],
          created: [
            {
              id: 3,
              title: 'ช่วยพาออกกำลังกาย',
              category: 'ออกกำลังกาย',
              location: 'กรุงเทพมหานคร',
              date: '25 ส.ค. 2568',
              time: '15.00 - 17.00',
              progress: 60,
              volunteers: 2,
              maxVolunteers: 3,
              status: 'กำลังดำเนินการ',
              createdBy: userData.id
            },
            {
              id: 4,
              title: 'งานซ่อมแซมบ้าน',
              category: 'งานซ่อม',
              location: 'กรุงเทพมหานคร',
              date: '20 ส.ค. 2568',
              time: '14.00 - 16.00',
              progress: 100,
              volunteers: 2,
              maxVolunteers: 2,
              status: 'เสร็จสิ้น',
              rating: 5,
              createdBy: userData.id
            }
          ]
        });
      } else {
        // Student users join tasks
        setTasks({
          ongoing: [
            {
              id: 1,
              title: 'ช่วยพาออกกำลังกาย',
              category: 'ออกกำลังกาย',
              location: 'กรุงเทพมหานคร',
              date: '25 ส.ค. 2568',
              time: '15.00 - 17.00',
              progress: 60,
              volunteers: 2,
              maxVolunteers: 3,
              status: 'กำลังดำเนินการ',
              joinedBy: userData.id
            }
          ],
          completed: [
            {
              id: 2,
              title: 'งานซ่อมแซมบ้าน',
              category: 'งานซ่อม',
              location: 'กรุงเทพมหานคร',
              date: '20 ส.ค. 2568',
              time: '14.00 - 16.00',
              progress: 100,
              volunteers: 2,
              maxVolunteers: 2,
              status: 'เสร็จสิ้น',
              rating: 5,
              joinedBy: userData.id
            }
          ],
          created: []
        });
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
      setTasks({ ongoing: [], completed: [], created: [] });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'กำลังดำเนินการ':
        return 'text-blue-600 bg-blue-100';
      case 'เสร็จสิ้น':
        return 'text-green-600 bg-green-100';
      case 'รอจิตอาสา':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'กำลังดำเนินการ':
        return <ClockIcon className="w-4 h-4" />;
      case 'เสร็จสิ้น':
        return <CheckCircle className="w-4 h-4" />;
      case 'รอจิตอาสา':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <ClockIcon className="w-4 h-4" />;
    }
  };

    return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <Link href="/dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-2">
                  <span className="text-white font-bold text-lg">GM</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">GenMatch</h1>
                  <p className="text-sm text-gray-500">Generation Matching</p>
                </div>
              </Link>
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {user?.firstName} {user?.lastName}
                </div>
                <div className="text-xs text-gray-500">
                  {user?.userType === 'STUDENT' ? 'นักศึกษา' : 'ผู้สูงอายุ'}
                </div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">งานของฉัน</h2>
          <p className="text-gray-600">จัดการงานจิตอาสาที่คุณสร้างและเข้าร่วม</p>
            </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('ongoing')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'ongoing'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              กำลังดำเนินการ
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'completed'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              เสร็จสิ้น
            </button>
            <button
              onClick={() => setActiveTab('created')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'created'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              ที่สร้างขึ้น
            </button>
          </div>
        </div>

        {/* Task List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">กำลังโหลดงาน...</p>
          </div>
        ) : tasks[activeTab as keyof typeof tasks].length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              {activeTab === 'ongoing' ? '🔄' : activeTab === 'completed' ? '✅' : '📝'}
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeTab === 'ongoing' ? 'ไม่มีงานที่กำลังดำเนินการ' : 
               activeTab === 'completed' ? 'ไม่มีงานที่เสร็จสิ้น' : 'ไม่มีงานที่สร้างขึ้น'}
            </h3>
            <p className="text-gray-500">
              {activeTab === 'ongoing' ? 'คุณยังไม่ได้เข้าร่วมงานใดๆ' : 
               activeTab === 'completed' ? 'คุณยังไม่มีงานที่เสร็จสิ้น' : 'คุณยังไม่ได้สร้างงานใดๆ'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {tasks[activeTab as keyof typeof tasks].map((task) => (
            <div key={task.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(task.status)}`}>
                      {getStatusIcon(task.status)}
                      <span>{task.status}</span>
                            </span>
                          </div>
                          
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {task.location}
                            </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {task.date} {task.time}
                            </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {task.volunteers}/{task.maxVolunteers} คน
                            </div>
                          </div>

                  {/* Progress Bar */}
                  {task.progress > 0 && (
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>ความคืบหน้า</span>
                        <span>{task.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                              </div>
                            </div>
                          )}

                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    {task.category}
                  </span>
                      </div>
                    </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex space-x-2">
                      <Link
                        href={`/task/${task.id}`}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                      >
                        ดูรายละเอียด
                      </Link>
                  {activeTab === 'ongoing' && (
                    <button className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium">
                      แก้ไข
                        </button>
                      )}
                  {activeTab === 'created' && task.volunteers === 0 && (
                    <button className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium">
                          ยกเลิก
                        </button>
                      )}
                    </div>

                {/* Rating for completed tasks */}
                {activeTab === 'completed' && task.rating && (
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-gray-600">คะแนน:</span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${
                            i < task.rating! ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                  </div>
                </div>
          ))}

          {/* Empty State */}
          {mockTasks[activeTab as keyof typeof mockTasks].length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่มีงานในหมวดหมู่นี้</h3>
              <p className="text-gray-600 mb-4">
                {activeTab === 'ongoing' && 'คุณยังไม่มีงานที่กำลังดำเนินการ'}
                {activeTab === 'completed' && 'คุณยังไม่มีงานที่เสร็จสิ้น'}
                {activeTab === 'created' && 'คุณยังไม่ได้สร้างงานจิตอาสา'}
              </p>
              <Link
                href="/add-task"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                สร้างงานใหม่
              </Link>
          </div>
        )}
      </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">การดำเนินการอย่างรวดเร็ว</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {user?.userType === 'ELDERLY' ? (
              <Link
                href="/add-task"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                สร้างงานใหม่
              </Link>
            ) : (
              <Link
                href="/search"
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Search className="w-4 h-4 inline mr-2" />
                ค้นหางานอาสา
              </Link>
            )}
            <Link
              href="/dashboard"
              className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium"
            >
              กลับแดชบอร์ด
            </Link>
            <Link
              href="/profile"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <User className="w-4 h-4 inline mr-2" />
              โปรไฟล์
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
