'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Users, 
  CheckSquare, 
  MessageSquare, 
  Image, 
  Star,
  TrendingUp,
  AlertTriangle,
  Settings,
  BarChart3,
  Shield,
  Activity
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<any>({});
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }
    
    // Check if user is admin
    if (user && user.userType !== 'ADMIN') {
      router.push('/dashboard');
      return;
    }
    
    if (user) {
      loadAdminData();
    }
  }, [user, loading, router]);

  const loadAdminData = async () => {
    setIsLoading(true);
    
    try {
      // Mock admin data
      const mockStats = {
        totalUsers: 156,
        totalTasks: 89,
        totalPhotos: 234,
        totalRatings: 67,
        activeUsers: 89,
        pendingTasks: 12,
        pendingPhotos: 8,
        systemHealth: 'GOOD'
      };

      const mockActivities = [
        {
          id: 1,
          type: 'USER_REGISTERED',
          message: 'ผู้ใช้ใหม่ลงทะเบียน: สมชาย ใจดี',
          timestamp: '2024-08-25T16:30:00Z',
          priority: 'LOW'
        },
        {
          id: 2,
          type: 'TASK_CREATED',
          message: 'งานใหม่ถูกสร้าง: ช่วยพาออกกำลังกาย',
          timestamp: '2024-08-25T16:15:00Z',
          priority: 'MEDIUM'
        },
        {
          id: 3,
          type: 'PHOTO_UPLOADED',
          message: 'รูปถ่ายใหม่ถูกอัปโหลด: งานซ่อมแซมบ้าน',
          timestamp: '2024-08-25T16:00:00Z',
          priority: 'LOW'
        },
        {
          id: 4,
          type: 'SYSTEM_WARNING',
          message: 'ระบบแจ้งเตือน: จำนวนผู้ใช้เข้าใช้งานสูง',
          timestamp: '2024-08-25T15:45:00Z',
          priority: 'HIGH'
        }
      ];
      
      setStats(mockStats);
      setRecentActivities(mockActivities);
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'USER_REGISTERED': return <Users className="w-5 h-5" />;
      case 'TASK_CREATED': return <CheckSquare className="w-5 h-5" />;
      case 'PHOTO_UPLOADED': return <Image className="w-5 h-5" />;
      case 'SYSTEM_WARNING': return <AlertTriangle className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-100 text-red-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'LOW': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  if (!user || user.userType !== 'ADMIN') {
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
                  <p className="text-sm text-gray-600">ผู้ดูแลระบบ</p>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">แดชบอร์ดผู้ดูแลระบบ</h2>
          <p className="text-gray-600">จัดการและติดตามระบบ GenMatch</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">ผู้ใช้ทั้งหมด</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                <p className="text-xs text-green-600">+{stats.activeUsers} ใช้งาน</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckSquare className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">งานทั้งหมด</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalTasks}</p>
                <p className="text-xs text-yellow-600">{stats.pendingTasks} รอการยืนยัน</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Image className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">รูปถ่าย</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalPhotos}</p>
                <p className="text-xs text-yellow-600">{stats.pendingPhotos} รอการยืนยัน</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">คะแนน</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalRatings}</p>
                <p className="text-xs text-green-600">เฉลี่ย 4.2/5</p>
              </div>
            </div>
          </div>
        </div>

        {/* System Health & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* System Health */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-green-600" />
              สถานะระบบ
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">สถานะทั่วไป</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  {stats.systemHealth}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">ฐานข้อมูล</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  ONLINE
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  ACTIVE
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-blue-600" />
              การดำเนินการด่วน
            </h3>
            <div className="space-y-3">
              <Link
                href="/admin/users"
                className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Users className="w-4 h-4 mr-2 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">จัดการผู้ใช้</span>
              </Link>
              <Link
                href="/admin/tasks"
                className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <CheckSquare className="w-4 h-4 mr-2 text-green-600" />
                <span className="text-sm font-medium text-green-800">จัดการงาน</span>
              </Link>
              <Link
                href="/admin/photos"
                className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <Image className="w-4 h-4 mr-2 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">จัดการรูปถ่าย</span>
              </Link>
            </div>
          </div>

          {/* System Metrics */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
              ตัวชี้วัด
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">ผู้ใช้ใหม่วันนี้</span>
                <span className="text-sm font-medium text-gray-900">+12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">งานใหม่วันนี้</span>
                <span className="text-sm font-medium text-gray-900">+8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">รูปถ่ายใหม่</span>
                <span className="text-sm font-medium text-gray-900">+23</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-purple-600" />
              กิจกรรมล่าสุด
            </h3>
            <Link
              href="/admin/activities"
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              ดูทั้งหมด
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{formatDate(activity.timestamp)}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(activity.priority)}`}>
                  {activity.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
