'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Image, 
  Clock, 
  CheckCircle, 
  X,
  MapPin,
  Calendar,
  Users,
  AlertCircle
} from 'lucide-react';

export default function PhotoVerificationPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }
    
    if (user) {
      loadTasksWithPhotos();
    }
  }, [user, loading, router]);

  const loadTasksWithPhotos = async () => {
    setIsLoading(true);
    
    try {
      // Mock data for tasks with photos (in production, fetch from API)
      const mockTasks = [
        {
          id: 1,
          title: 'ช่วยพาออกกำลังกาย',
          category: 'ออกกำลังกาย',
          location: 'กรุงเทพมหานคร',
          date: '25 ส.ค. 2568',
          time: '15.00 - 17.00',
          status: 'IN_PROGRESS',
          photoCount: 3,
          pendingPhotos: 2,
          approvedPhotos: 1,
          volunteers: [
            { id: 1, name: 'สมชาย ใจดี', phone: '0812345678' },
            { id: 2, name: 'สมหญิง รักดี', phone: '0823456789' }
          ]
        },
        {
          id: 2,
          title: 'งานซ่อมแซมบ้าน',
          category: 'งานซ่อม',
          location: 'กรุงเทพมหานคร',
          date: '30 ส.ค. 2568',
          time: '14.00 - 16.00',
          status: 'PENDING',
          photoCount: 1,
          pendingPhotos: 1,
          approvedPhotos: 0,
          volunteers: []
        },
        {
          id: 3,
          title: 'ช่วยจัดงานบุญที่วัด',
          category: 'วัด',
          location: 'กรุงเทพมหานคร',
          date: '20 ส.ค. 2568',
          time: '08.00 - 12.00',
          status: 'COMPLETED',
          photoCount: 5,
          pendingPhotos: 0,
          approvedPhotos: 5,
          volunteers: [
            { id: 3, name: 'ลุงปู่ ใจบุญ', phone: '0834567890' },
            { id: 4, name: 'คุณยาย ใจดี', phone: '0845678901' }
          ]
        }
      ];
      
      setTasks(mockTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setIsLoading(false);
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

  const getPhotoStatusColor = (pending: number, approved: number) => {
    if (pending > 0) return 'bg-yellow-100 text-yellow-800';
    if (approved > 0) return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getPhotoStatusText = (pending: number, approved: number) => {
    if (pending > 0) return `รอการยืนยัน ${pending} รูป`;
    if (approved > 0) return `ยืนยันแล้ว ${approved} รูป`;
    return 'ไม่มีรูปถ่าย';
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
                  <p className="text-sm text-gray-600">ยืนยันรูปถ่าย</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">ยืนยันรูปถ่าย</h2>
          <p className="text-gray-600">ดูและยืนยันรูปถ่ายการทำงานจากจิตอาสา</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Image className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">งานทั้งหมด</p>
                <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">รอการยืนยัน</p>
                <p className="text-2xl font-bold text-gray-900">
                  {tasks.filter(t => t.pendingPhotos > 0).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">ยืนยันแล้ว</p>
                <p className="text-2xl font-bold text-gray-900">
                  {tasks.filter(t => t.pendingPhotos === 0 && t.approvedPhotos > 0).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">รูปถ่ายทั้งหมด</p>
                <p className="text-2xl font-bold text-gray-900">
                  {tasks.reduce((sum, t) => sum + t.photoCount, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">กำลังโหลดงาน...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-200">
              <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">ไม่พบงานที่มีรูปถ่าย</p>
              <Link
                href="/add-task"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                สร้างงานใหม่
              </Link>
            </div>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {getStatusText(task.status)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPhotoStatusColor(task.pendingPhotos, task.approvedPhotos)}`}>
                        {getPhotoStatusText(task.pendingPhotos, task.approvedPhotos)}
                      </span>
                    </div>
                    
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
                        <span className="text-sm font-medium">{task.volunteers.length} คน</span>
                      </div>
                    </div>

                    {/* Volunteers */}
                    {task.volunteers.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">จิตอาสา:</h4>
                        <div className="flex flex-wrap gap-2">
                          {task.volunteers.map((volunteer: any) => (
                            <div key={volunteer.id} className="flex items-center space-x-2 px-3 py-2 bg-purple-50 rounded-lg border border-purple-200">
                              <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  {volunteer.name.charAt(0)}
                                </span>
                              </div>
                              <span className="text-sm text-purple-800">{volunteer.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Photo Summary */}
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Image className="w-5 h-5 text-blue-600" />
                          <span className="font-medium text-blue-900">สรุปรูปถ่าย</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-blue-700">
                            ทั้งหมด: <span className="font-bold">{task.photoCount}</span> รูป
                          </span>
                          {task.pendingPhotos > 0 && (
                            <span className="text-yellow-700">
                              รอการยืนยัน: <span className="font-bold">{task.pendingPhotos}</span> รูป
                            </span>
                          )}
                          {task.approvedPhotos > 0 && (
                            <span className="text-green-700">
                              ยืนยันแล้ว: <span className="font-bold">{task.approvedPhotos}</span> รูป
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex items-center space-x-3">
                    {user.userType === 'ELDERLY' ? (
                      <Link
                        href={`/photo-gallery?taskId=${task.id}`}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                      >
                        <Image className="w-4 h-4 mr-2 inline" />
                        ดูรูปถ่ายทั้งหมด
                      </Link>
                    ) : (
                      <Link
                        href={`/photo-upload?taskId=${task.id}`}
                        className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                      >
                        <Image className="w-4 h-4 mr-2 inline" />
                        อัปโหลดรูปถ่าย
                      </Link>
                    )}
                    
                    <Link
                      href={`/task-management?taskId=${task.id}`}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      จัดการงาน
                    </Link>
                  </div>

                  {/* Priority Indicator */}
                  {task.pendingPhotos > 0 && (
                    <div className="flex items-center space-x-2 px-3 py-2 bg-yellow-100 rounded-lg border border-yellow-200">
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800">
                        มีรูปถ่ายรอการยืนยัน
                      </span>
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
