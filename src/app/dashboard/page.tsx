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
  TrendingUp
} from 'lucide-react';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalHours: 0,
    completedTasks: 0,
    activeTasks: 0,
    rating: 0
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
        const totalHours = completed * 2; // Assume 2 hours per task
        const rating = Math.floor(Math.random() * 20) + 80; // Mock rating
        
        setStats({
          totalHours,
          completedTasks: completed,
          activeTasks: active,
          rating
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900">
      {/* Header */}
      <div className="glass-card mx-4 mt-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              สวัสดี, {user.name}! 👋
            </h1>
            <p className="text-white/70">
              {user.userType === 'STUDENT' ? 'นักศึกษาจิตอาสา' : 'ผู้สูงอายุที่ต้องการความช่วยเหลือ'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/60">สมาชิกตั้งแต่</p>
            <p className="text-white font-medium">
              {new Date(user.createdAt).toLocaleDateString('th-TH')}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 px-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass-card p-6 text-center">
            <Clock className="w-12 h-12 text-pink-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-2">{stats.totalHours}</div>
            <div className="text-white/70">ชั่วโมงจิตอาสา</div>
          </div>
          
          <div className="glass-card p-6 text-center">
            <Award className="w-12 h-12 text-purple-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-2">{stats.completedTasks}</div>
            <div className="text-white/70">งานเสร็จสิ้น</div>
          </div>
          
          <div className="glass-card p-6 text-center">
            <Users className="w-12 h-12 text-blue-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-2">{stats.activeTasks}</div>
            <div className="text-white/70">งานกำลังดำเนินการ</div>
          </div>
          
          <div className="glass-card p-6 text-center">
            <Star className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-2">{stats.rating}</div>
            <div className="text-white/70">คะแนนความพึงพอใจ</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            เริ่มต้นใช้งาน
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/add-task" className="glass-button text-center p-4 hover:scale-105 transition-transform">
              <Plus className="w-8 h-8 mx-auto mb-2" />
              <span className="block font-medium">เพิ่มงานใหม่</span>
            </Link>
            
            <Link href="/search" className="glass-button-secondary text-center p-4 hover:scale-105 transition-transform">
              <Search className="w-8 h-8 mx-auto mb-2" />
              <span className="block font-medium">ค้นหางาน</span>
            </Link>
            
            <Link href="/my-tasks" className="glass-button text-center p-4 hover:scale-105 transition-transform">
              <Calendar className="w-8 h-8 mx-auto mb-2" />
              <span className="block font-medium">งานของฉัน</span>
            </Link>
            
            <Link href="/profile" className="glass-button-secondary text-center p-4 hover:scale-105 transition-transform">
              <User className="w-8 h-8 mx-auto mb-2" />
              <span className="block font-medium">โปรไฟล์</span>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold text-white mb-6">กิจกรรมล่าสุด</h2>
          
          <div className="space-y-4">
            {stats.activeTasks > 0 ? (
              <div className="flex items-center p-4 bg-white/10 rounded-lg">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-4"></div>
                <div className="flex-1">
                  <p className="text-white font-medium">มีงานที่กำลังดำเนินการ</p>
                  <p className="text-white/60 text-sm">งาน {stats.activeTasks} รายการ</p>
                </div>
                <Link href="/my-tasks" className="glass-button-secondary px-4 py-2 text-sm">
                  ดูรายละเอียด
                </Link>
              </div>
            ) : (
              <div className="text-center py-8">
                <Heart className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <p className="text-white/60">ยังไม่มีกิจกรรมล่าสุด</p>
                <p className="text-white/40 text-sm">เริ่มต้นการเป็นจิตอาสากันเลย!</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/my-tasks" className="glass-card p-6 hover:scale-105 transition-transform text-center">
            <Calendar className="w-12 h-12 text-pink-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-white mb-2">งานของฉัน</h3>
            <p className="text-white/60 text-sm">ดูและจัดการงาน</p>
          </Link>
          
          <Link href="/chat" className="glass-card p-6 hover:scale-105 transition-transform text-center">
            <Bell className="w-12 h-12 text-purple-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-white mb-2">แชท</h3>
            <p className="text-white/60 text-sm">สื่อสารกับผู้ใช้</p>
          </Link>
          
          <Link href="/notifications" className="glass-card p-6 hover:scale-105 transition-transform text-center">
            <Bell className="w-12 h-12 text-blue-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-white mb-2">การแจ้งเตือน</h3>
            <p className="text-white/60 text-sm">อัปเดตและข้อความ</p>
          </Link>
          
          <Link href="/statistics" className="glass-card p-6 hover:scale-105 transition-transform text-center">
            <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-white mb-2">สถิติ</h3>
            <p className="text-white/60 text-sm">ดูข้อมูลการใช้งาน</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
