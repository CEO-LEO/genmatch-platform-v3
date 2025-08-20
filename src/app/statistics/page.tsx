'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  TrendingUp, 
  Clock, 
  Award, 
  Star, 
  Users, 
  MapPin,
  Calendar,
  ArrowLeft,
  BarChart3,
  PieChart,
  Activity,
  Target
} from 'lucide-react';
import Link from 'next/link';

interface Statistics {
  totalHours: number;
  completedTasks: number;
  activeTasks: number;
  totalRating: number;
  averageRating: number;
  totalReviews: number;
  monthlyStats: MonthlyStat[];
  categoryStats: CategoryStat[];
  locationStats: LocationStat[];
}

interface MonthlyStat {
  month: string;
  hours: number;
  tasks: number;
  rating: number;
}

interface CategoryStat {
  category: string;
  count: number;
  hours: number;
  percentage: number;
}

interface LocationStat {
  location: string;
  count: number;
  percentage: number;
}

export default function Statistics() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<Statistics | null>(null);
  const [timeRange, setTimeRange] = useState<'1M' | '3M' | '6M' | '1Y'>('3M');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
      loadStatistics();
    }
  }, [user, loading, router, timeRange]);

  const loadStatistics = async () => {
    try {
      // Mock data for demo
      const mockStats: Statistics = {
        totalHours: 48,
        completedTasks: 24,
        activeTasks: 3,
        totalRating: 4.8,
        averageRating: 4.8,
        totalReviews: 24,
        monthlyStats: [
          { month: 'ม.ค.', hours: 8, tasks: 4, rating: 4.5 },
          { month: 'ก.พ.', hours: 12, tasks: 6, rating: 4.7 },
          { month: 'มี.ค.', hours: 16, tasks: 8, rating: 4.9 },
          { month: 'เม.ย.', hours: 12, tasks: 6, rating: 4.8 }
        ],
        categoryStats: [
          { category: 'โรงพยาบาล', count: 10, hours: 20, percentage: 42 },
          { category: 'วัด', count: 8, hours: 16, percentage: 33 },
          { category: 'ออกกำลังกาย', count: 4, hours: 8, percentage: 17 },
          { category: 'งานซ่อม', count: 2, hours: 4, percentage: 8 }
        ],
        locationStats: [
          { location: 'กรุงเทพฯ', count: 18, percentage: 75 },
          { location: 'นนทบุรี', count: 4, percentage: 17 },
          { location: 'สมุทรปราการ', count: 2, percentage: 8 }
        ]
      };
      
      setStats(mockStats);
    } catch (error) {
      console.error('Failed to load statistics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'โรงพยาบาล': return 'from-red-500 to-pink-500';
      case 'วัด': return 'from-yellow-500 to-orange-500';
      case 'ออกกำลังกาย': return 'from-green-500 to-teal-500';
      case 'งานซ่อม': return 'from-blue-500 to-indigo-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'from-green-500 to-emerald-500';
    if (percentage >= 60) return 'from-blue-500 to-indigo-500';
    if (percentage >= 40) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
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

  if (!user || !stats) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900">
      {/* Header */}
      <div className="glass-card mx-4 mt-4 p-6">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="text-white hover:text-pink-300 transition-colors">
            <ArrowLeft className="w-5 h-5 inline mr-2" />
            กลับไปหน้าแรก
          </Link>
          <h1 className="text-3xl font-bold text-white">สถิติการใช้งาน</h1>
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-pink-400" />
            <span className="text-white/70">ข้อมูลเชิงลึก</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 px-4">
        {/* Time Range Selector */}
        <div className="glass-card p-4 mb-6">
          <div className="flex justify-center">
            <div className="flex bg-white/10 rounded-lg p-1">
              {[
                { key: '1M', label: '1 เดือน' },
                { key: '3M', label: '3 เดือน' },
                { key: '6M', label: '6 เดือน' },
                { key: '1Y', label: '1 ปี' }
              ].map((range) => (
                <button
                  key={range.key}
                  onClick={() => setTimeRange(range.key as any)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    timeRange === range.key
                      ? 'bg-pink-500 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass-card p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{stats.totalHours}</div>
            <div className="text-white/70">ชั่วโมงจิตอาสา</div>
            <div className="text-pink-400 text-sm mt-2">+12% จากเดือนที่แล้ว</div>
          </div>
          
          <div className="glass-card p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{stats.completedTasks}</div>
            <div className="text-white/70">งานเสร็จสิ้น</div>
            <div className="text-blue-400 text-sm mt-2">+3 จากเดือนที่แล้ว</div>
          </div>
          
          <div className="glass-card p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{stats.averageRating}</div>
            <div className="text-white/70">คะแนนเฉลี่ย</div>
            <div className="text-green-400 text-sm mt-2">จาก {stats.totalReviews} รีวิว</div>
          </div>
          
          <div className="glass-card p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{stats.activeTasks}</div>
            <div className="text-white/70">งานกำลังดำเนินการ</div>
            <div className="text-purple-400 text-sm mt-2">กำลังดำเนินการ</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Progress Chart */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-3 text-pink-400" />
              ความคืบหน้ารายเดือน
            </h3>
            
            <div className="space-y-4">
              {stats.monthlyStats.map((month, index) => (
                <div key={month.month} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">{month.month}</span>
                    <div className="flex items-center space-x-4 text-white/60">
                      <span>{month.hours} ชม.</span>
                      <span>{month.tasks} งาน</span>
                      <span className="flex items-center">
                        <Star className="w-3 h-3 mr-1 text-yellow-400" />
                        {month.rating}
                      </span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className={`h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-1000`}
                      style={{ width: `${(month.hours / Math.max(...stats.monthlyStats.map(m => m.hours))) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Distribution */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <PieChart className="w-6 h-6 mr-3 text-blue-400" />
              การกระจายตามหมวดหมู่
            </h3>
            
            <div className="space-y-4">
              {stats.categoryStats.map((category) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">{category.category}</span>
                    <div className="flex items-center space-x-4 text-white/60">
                      <span>{category.count} งาน</span>
                      <span>{category.hours} ชม.</span>
                      <span className="font-medium">{category.percentage}%</span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <div 
                      className={`h-3 bg-gradient-to-r ${getCategoryColor(category.category)} rounded-full transition-all duration-1000`}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Location and Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Location Distribution */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-3 text-green-400" />
              การกระจายตามสถานที่
            </h3>
            
            <div className="space-y-4">
              {stats.locationStats.map((location) => (
                <div key={location.location} className="flex items-center justify-between">
                  <span className="text-white/70">{location.location}</span>
                  <div className="flex items-center space-x-3">
                    <span className="text-white/60">{location.count} งาน</span>
                    <div className="w-24 bg-white/10 rounded-full h-2">
                      <div 
                        className={`h-2 bg-gradient-to-r ${getProgressColor(location.percentage)} rounded-full transition-all duration-1000`}
                        style={{ width: `${location.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-white font-medium w-12 text-right">{location.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Insights */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Target className="w-6 h-6 mr-3 text-purple-400" />
              ข้อมูลเชิงลึก
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-white/10 rounded-lg">
                <h4 className="text-white font-semibold mb-2">ประสิทธิภาพสูงสุด</h4>
                <p className="text-white/70 text-sm">
                  คุณมีประสิทธิภาพสูงสุดในหมวดหมู่ &ldquo;โรงพยาบาล&rdquo; ด้วยคะแนนเฉลี่ย 4.9/5.0
                </p>
              </div>
              
              <div className="p-4 bg-white/10 rounded-lg">
                <h4 className="text-white font-semibold mb-2">เป้าหมายรายเดือน</h4>
                <p className="text-white/70 text-sm">
                  เป้าหมาย: 20 ชั่วโมง/เดือน | ปัจจุบัน: {stats.totalHours} ชั่วโมง
                </p>
                <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                  <div 
                    className="h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min((stats.totalHours / 20) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="p-4 bg-white/10 rounded-lg">
                <h4 className="text-white font-semibold mb-2">คำแนะนำ</h4>
                <p className="text-white/70 text-sm">
                  ลองรับงานในหมวดหมู่ &ldquo;งานซ่อม&rdquo; เพิ่มเติมเพื่อเพิ่มความหลากหลาย
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">การดำเนินการด่วน</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/search" className="glass-button-secondary p-4 text-center hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">ค้นหางานใหม่</h4>
              <p className="text-white/70 text-sm">เพิ่มชั่วโมงจิตอาสา</p>
            </Link>
            
            <Link href="/my-tasks" className="glass-button-secondary p-4 text-center hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">งานของฉัน</h4>
              <p className="text-white/70 text-sm">ติดตามความคืบหน้า</p>
            </Link>
            
            <Link href="/profile" className="glass-button-secondary p-4 text-center hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">โปรไฟล์</h4>
              <p className="text-white/70 text-sm">ดูความสำเร็จ</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
