'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Clock, 
  Award, 
  Users, 
  Heart, 
  Plus, 
  Search, 
  Bell, 
  User,
  Calendar,
  MapPin,
  Star,
  TrendingUp,
  FileText,
  CheckCircle,
  AlertCircle,
  Play
} from 'lucide-react';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalHours: 0,
    completedTasks: 0,
    activeTasks: 0,
    rating: 0,
    postedTasks: 0,
    pendingTasks: 0
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    // Load user stats
    if (user) {
      loadUserStats();
    }
  }, [user, loading, router]);

  const loadUserStats = async () => {
    try {
      const response = await fetch('/api/tasks/my-tasks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const tasks = await response.json();
        const completed = tasks.filter((task: any) => task.status === 'COMPLETED').length;
        const active = tasks.filter((task: any) => task.status === 'ACCEPTED').length;
        const pending = tasks.filter((task: any) => task.status === 'PENDING').length;
        const totalHours = completed * 2; // Assume 2 hours per task
        const rating = Math.floor(Math.random() * 20) + 80; // Mock rating
        
        setStats({
          totalHours,
          completedTasks: completed,
          activeTasks: active,
          rating,
          postedTasks: user.userType === 'ELDERLY' ? tasks.length : 0,
          pendingTasks: pending
        });
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-400 mx-auto"></div>
          <p className="mt-4 text-lg text-white">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Elderly Dashboard
  if (user.userType === 'ELDERLY') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900">
        {/* Header */}
        <div className="glass-card mx-4 mt-4 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                สวัสดี, {user.firstName} {user.lastName}! 👋
              </h1>
              <p className="text-white/70 text-lg">ผู้สูงอายุที่ต้องการความช่วยเหลือ</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/60">สมาชิกตั้งแต่</p>
              <p className="text-white font-medium">
                {new Date(user.createdAt).toLocaleDateString('th-TH')}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mx-4 mt-6">
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-white mb-4">การดำเนินการด่วน</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/add-task" className="btn-modern p-4 text-center group hover:scale-105 transition-all duration-300">
                <Plus className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-lg font-semibold">โพสต์งานใหม่</span>
                <p className="text-sm opacity-80">เพิ่มงานที่ต้องการความช่วยเหลือ</p>
              </Link>
              
              <Link href="/my-tasks" className="glass-button-secondary p-4 text-center group hover:scale-105 transition-all duration-300">
                <FileText className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-lg font-semibold">จัดการงาน</span>
                <p className="text-sm opacity-80">ดูและจัดการงานที่โพสต์ไว้</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mx-4 mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="modern-card modern-card-hover p-4 text-center group">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stats.postedTasks}</div>
              <div className="text-white/70 text-sm">งานที่โพสต์</div>
            </div>

            <div className="modern-card modern-card-hover p-4 text-center group">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stats.pendingTasks}</div>
              <div className="text-white/70 text-sm">รอการรับงาน</div>
            </div>

            <div className="modern-card modern-card-hover p-4 text-center group">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stats.activeTasks}</div>
              <div className="text-white/70 text-sm">กำลังดำเนินการ</div>
            </div>

            <div className="modern-card modern-card-hover p-4 text-center group">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stats.completedTasks}</div>
              <div className="text-white/70 text-sm">งานเสร็จสิ้น</div>
            </div>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="mx-4 mt-6 mb-6">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">งานล่าสุด</h2>
              <Link href="/my-tasks" className="text-pink-400 hover:text-pink-300 text-sm">
                ดูทั้งหมด →
              </Link>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">พาไปตรวจสุขภาพ</p>
                    <p className="text-white/60 text-sm">โรงพยาบาลมหิดล</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                    รอการรับงาน
                  </div>
                  <p className="text-white/60 text-xs mt-1">2 ชั่วโมงที่แล้ว</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Student Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900">
      {/* Header */}
      <div className="glass-card mx-4 mt-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              สวัสดี, {user.firstName} {user.lastName}! 👋
            </h1>
            <p className="text-white/70 text-lg">นักศึกษาจิตอาสา</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/60">สมาชิกตั้งแต่</p>
            <p className="text-white font-medium">
              {new Date(user.createdAt).toLocaleDateString('th-TH')}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mx-4 mt-6">
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-4">การดำเนินการด่วน</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/search" className="btn-modern p-4 text-center group hover:scale-105 transition-all duration-300">
              <Search className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-lg font-semibold">ค้นหางาน</span>
              <p className="text-sm opacity-80">หางานจิตอาสาที่เหมาะสม</p>
            </Link>
            
            <Link href="/my-tasks" className="glass-button-secondary p-4 text-center group hover:scale-105 transition-all duration-300">
              <FileText className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-lg font-semibold">งานที่รับไว้</span>
              <p className="text-sm opacity-80">ดูงานที่รับไว้และสถานะ</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mx-4 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="modern-card modern-card-hover p-4 text-center group">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stats.totalHours}</div>
            <div className="text-white/70 text-sm">ชั่วโมงจิตอาสา</div>
          </div>

          <div className="modern-card modern-card-hover p-4 text-center group">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stats.completedTasks}</div>
            <div className="text-white/70 text-sm">งานเสร็จสิ้น</div>
          </div>

          <div className="modern-card modern-card-hover p-4 text-center group">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stats.activeTasks}</div>
            <div className="text-white/70 text-sm">งานกำลังทำ</div>
          </div>

          <div className="modern-card modern-card-hover p-4 text-center group">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stats.rating}</div>
            <div className="text-white/70 text-sm">คะแนนความพึงพอใจ</div>
          </div>
        </div>
      </div>

      {/* Recommended Tasks */}
      <div className="mx-4 mt-6 mb-6">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">งานแนะนำ</h2>
            <Link href="/search" className="text-blue-400 hover:text-blue-300 text-sm">
              ดูทั้งหมด →
            </Link>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">พาไปตรวจสุขภาพ</p>
                  <p className="text-white/60 text-sm">โรงพยาบาลมหิดล • 2 ชั่วโมง</p>
                </div>
              </div>
              <div className="text-right">
                <div className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                  รับงานได้
                </div>
                <p className="text-white/60 text-xs mt-1">ใกล้บ้าน</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
