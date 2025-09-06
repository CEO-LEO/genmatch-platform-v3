'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Play, 
  Pause, 
  Users,
  MapPin,
  Calendar,
  MessageSquare,
  BarChart3,
  Image
} from 'lucide-react';

export default function TaskManagementPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('active');
  const [tasks, setTasks] = useState<any>({
    active: [],
    pending: [],
    completed: []
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
      const res = await fetch(`/api/tasks/my-tasks?userId=${user?.id}&userType=${user?.userType}`);
      const data = await res.json();
      if (res.ok) {
        const toCard = (t: any) => ({
          id: t.id,
          title: t.title,
          category: t.category,
          location: t.location,
          date: t.date,
          time: `${t.startTime || ''}${t.endTime ? ' - ' + t.endTime : ''}`.trim(),
          status: t.status === 'PENDING' ? 'PENDING' : t.status === 'COMPLETED' ? 'COMPLETED' : 'IN_PROGRESS',
          progress: t.progress || 0,
          maxVolunteers: 1,
          // Prefer explicit volunteerId; fallback to volunteers array length
          volunteers: ((t as any).volunteerId ? 1 : (Array.isArray(t.volunteers) ? t.volunteers.length : 0)),
          description: t.description,
          requirements: t.requirements,
          notes: t.notes
        });
        setTasks({
          active: (data.ongoing || []).map(toCard),
          pending: [],
          completed: (data.completed || []).map(toCard)
        });
      } else {
        setTasks({ active: [], pending: [], completed: [] });
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
      setTasks({ active: [], pending: [], completed: [] });
    } finally {
      setIsLoading(false);
    }
  };

  const updateTaskStatus = async (taskId: number, newStatus: string) => {
    try {
      await fetch(`/api/tasks/${taskId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      await loadUserTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const updateProgress = async (taskId: number, newProgress: number) => {
    try {
      await fetch(`/api/tasks/${taskId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'IN_PROGRESS', progress: newProgress })
      });
      await loadUserTasks();
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING': return 'รอการยืนยัน';
      case 'IN_PROGRESS': return 'กำลังดำเนินการ';
      case 'COMPLETED': return 'เสร็จสิ้น';
      case 'CANCELLED': return 'ยกเลิก';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">GM</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">GenMatch</h1>
                  <p className="text-sm text-gray-600">จัดการงานจิตอาสา</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <Link 
                href="/chat"
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                <MessageSquare className="w-4 h-4 mr-2 inline" />
                แชท
              </Link>
              <Link 
                href="/dashboard"
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2 inline" />
                กลับแดชบอร์ด
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">จัดการงานจิตอาสา</h2>
          <p className="text-gray-600">
            {user.userType === 'ELDERLY' 
              ? 'จัดการงานที่คุณสร้างและติดตามความคืบหน้า' 
              : 'ติดตามงานที่คุณเข้าร่วมและความคืบหน้า'
            }
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('active')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                activeTab === 'active'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Play className="w-4 h-4 mr-2 inline" />
              กำลังดำเนินการ ({tasks.active.length})
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                activeTab === 'pending'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Clock className="w-4 h-4 mr-2 inline" />
              รอการยืนยัน ({tasks.pending.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                activeTab === 'completed'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CheckCircle className="w-4 h-4 mr-2 inline" />
              เสร็จสิ้น ({tasks.completed.length})
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">กำลังโหลดงาน...</p>
            </div>
          ) : tasks[activeTab].length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="text-gray-400 mb-4">
                {activeTab === 'active' && <Play className="w-16 h-16 mx-auto" />}
                {activeTab === 'pending' && <Clock className="w-16 h-16 mx-auto" />}
                {activeTab === 'completed' && <CheckCircle className="w-16 h-16 mx-auto" />}
              </div>
              <p className="text-gray-600 mb-4">
                {activeTab === 'active' && 'ไม่มีงานที่กำลังดำเนินการ'}
                {activeTab === 'pending' && 'ไม่มีงานที่รอการยืนยัน'}
                {activeTab === 'completed' && 'ไม่มีงานที่เสร็จสิ้น'}
              </p>
              <Link
                href="/add-task"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                สร้างงานใหม่
              </Link>
            </div>
          ) : (
            tasks[activeTab].map((task: any) => (
              <div key={task.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                {/* Task Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {getStatusText(task.status)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{task.description}</p>
                    
                    {/* Task Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center space-x-2 text-gray-600 p-3 bg-gray-50 rounded-lg">
                        <MapPin className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium">{task.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600 p-3 bg-gray-50 rounded-lg">
                        <Calendar className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium">{task.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600 p-3 bg-gray-50 rounded-lg">
                        <Clock className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium">{task.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600 p-3 bg-gray-50 rounded-lg">
                        <Users className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium">{Math.min(Number(task.volunteers) || 0, 1)}/1 คน</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {task.status === 'IN_PROGRESS' && (
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">ความคืบหน้า</span>
                          <span className="text-sm font-medium text-purple-600">{task.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Requirements */}
                    {task.requirements && (
                      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          ความต้องการ
                        </h4>
                        <p className="text-blue-800 text-sm">{task.requirements}</p>
                      </div>
                    )}

                    {/* Notes */}
                    {task.notes && (
                      <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h4 className="font-medium text-yellow-900 mb-2 flex items-center">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          บันทึก
                        </h4>
                        <p className="text-yellow-800 text-sm">{task.notes}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex items-center space-x-3">
                                            {user.userType === 'ELDERLY' ? (
                          <>
                            {task.status === 'PENDING' && (
                              <button
                                onClick={() => updateTaskStatus(task.id, 'IN_PROGRESS')}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                              >
                                <Play className="w-4 h-4 mr-2 inline" />
                                เริ่มงาน
                              </button>
                            )}
                            {task.status === 'IN_PROGRESS' && (
                              <button
                                onClick={() => updateTaskStatus(task.id, 'COMPLETED')}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                              >
                                <CheckCircle className="w-4 h-4 mr-2 inline" />
                                เสร็จสิ้น
                              </button>
                            )}
                            <Link
                              href={`/chat?taskId=${task.id}`}
                              className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium"
                            >
                              <MessageSquare className="w-4 h-4 mr-2 inline" />
                              แชทกับจิตอาสา
                            </Link>
                            <Link
                              href={`/photo-gallery?taskId=${task.id}`}
                              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
                            >
                              <Image className="w-4 h-4 mr-2 inline" />
                              ดูรูปถ่าย
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link
                              href={`/chat?taskId=${task.id}`}
                              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                            >
                              <MessageSquare className="w-4 h-4 mr-2 inline" />
                              แชทกับผู้สร้างงาน
                            </Link>
                            <Link
                              href={`/photo-upload?taskId=${task.id}`}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                            >
                              <Image className="w-4 h-4 mr-2 inline" />
                              อัปโหลดรูปถ่าย
                            </Link>
                            {task.status === 'IN_PROGRESS' && (
                              <button
                                onClick={() => updateProgress(task.id, Math.min(task.progress + 20, 100))}
                                className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium"
                              >
                                อัปเดตความคืบหน้า
                              </button>
                            )}
                          </>
                        )}
                  </div>

                  {/* Progress Update for Elderly */}
                  {user.userType === 'ELDERLY' && task.status === 'IN_PROGRESS' && (
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">อัปเดตความคืบหน้า:</span>
                      <div className="flex space-x-2">
                        {[20, 40, 60, 80, 100].map((progress) => (
                          <button
                            key={progress}
                            onClick={() => updateProgress(task.id, progress)}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                              task.progress >= progress
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                            }`}
                          >
                            {progress}%
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
