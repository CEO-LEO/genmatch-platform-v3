'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Clock,
  MapPin,
  Users,
  Heart,
  Target,
  Award,
  Star,
  ChevronRight,
  Filter,
  Download,
  Share2,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Info,
  Zap,
  Crown,
  Shield,
  Building,
  GraduationCap,
  Globe,
  Wrench
} from 'lucide-react';

interface StatCard {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: any;
  color: string;
  description?: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

interface MonthlyStats {
  month: string;
  tasksCompleted: number;
  volunteerHours: number;
  pointsEarned: number;
  rating: number;
}

export default function StatisticsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'volunteer' | 'social' | 'skill'>('all');
  const [showDetailedStats, setShowDetailedStats] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const periods = [
    { id: 'week', name: 'สัปดาห์', icon: Calendar },
    { id: 'month', name: 'เดือน', icon: Calendar },
    { id: 'year', name: 'ปี', icon: Calendar }
  ];

  const categories = [
    { id: 'all', name: 'ทั้งหมด', color: 'from-indigo-500 to-purple-500' },
    { id: 'volunteer', name: 'จิตอาสา', color: 'from-red-500 to-pink-500' },
    { id: 'social', name: 'สังคม', color: 'from-blue-500 to-indigo-500' },
    { id: 'skill', name: 'ทักษะ', color: 'from-green-500 to-teal-500' }
  ];

  const statCards: StatCard[] = [
    {
      title: 'งานที่เสร็จสิ้น',
      value: 24,
      change: 12,
      changeType: 'increase',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'ชั่วโมงจิตอาสา',
      value: 156,
      change: 8,
      changeType: 'increase',
      icon: Clock,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'คะแนนรวม',
      value: 4.8,
      change: 0.2,
      changeType: 'increase',
      icon: Star,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'ผู้ใช้ที่ติดต่อ',
      value: 18,
      change: 5,
      changeType: 'increase',
      icon: Users,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const monthlyStats: MonthlyStats[] = [
    { month: 'ม.ค.', tasksCompleted: 5, volunteerHours: 12, pointsEarned: 45, rating: 4.5 },
    { month: 'ก.พ.', tasksCompleted: 8, volunteerHours: 18, pointsEarned: 75, rating: 4.7 },
    { month: 'มี.ค.', tasksCompleted: 12, volunteerHours: 25, pointsEarned: 120, rating: 4.8 },
    { month: 'เม.ย.', tasksCompleted: 15, volunteerHours: 32, pointsEarned: 180, rating: 4.9 },
    { month: 'พ.ค.', tasksCompleted: 18, volunteerHours: 38, pointsEarned: 220, rating: 4.7 },
    { month: 'มิ.ย.', tasksCompleted: 23, volunteerHours: 45, pointsEarned: 275, rating: 4.8 }
  ];

  const categoryDistribution = [
    { name: 'จิตอาสา', value: 45, color: '#ef4444' },
    { name: 'สังคม', value: 25, color: '#3b82f6' },
    { name: 'ทักษะ', value: 20, color: '#10b981' },
    { name: 'อื่นๆ', value: 10, color: '#8b5cf6' }
  ];

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }
    
    if (user) {
      loadStatistics();
    }
  }, [user, loading, router]);

  const loadStatistics = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
  };

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'decrease':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Status Bar */}
      <div className="bg-white px-4 py-3 text-sm text-gray-600 text-center border-b border-gray-100 md:hidden">
        <div className="flex items-center justify-between">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <h1 className="text-lg font-semibold text-gray-900">สถิติ</h1>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowDetailedStats(!showDetailedStats)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {showDetailedStats ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Period Selector */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex space-x-2">
          {periods.map((period) => {
            const Icon = period.icon;
            return (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 ${
                  selectedPeriod === period.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{period.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 space-y-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 gap-4">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex items-center space-x-1">
                    {getChangeIcon(stat.changeType)}
                    <span className={`text-xs font-medium ${getChangeColor(stat.changeType)}`}>
                      {stat.change > 0 ? '+' : ''}{stat.change}%
                    </span>
                  </div>
                </div>
                
                <div className="mb-2">
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.title}</div>
                </div>
                
                {stat.description && (
                  <p className="text-xs text-gray-500">{stat.description}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">หมวดหมู่</h3>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as any)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Monthly Progress Chart */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">ความคืบหน้าประจำเดือน</h3>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {monthlyStats.map((stat, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-16 text-sm text-gray-600 font-medium">{stat.month}</div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">งานเสร็จ: {stat.tasksCompleted}</span>
                    <span className="text-gray-600">ชั่วโมง: {stat.volunteerHours}</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(stat.tasksCompleted / 25) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>คะแนน: {stat.pointsEarned}</span>
                    <span>คะแนน: {stat.rating}/5.0</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">การกระจายหมวดหมู่</h3>
          
          <div className="space-y-3">
            {categoryDistribution.map((category, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                ></div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                    <span className="text-sm text-gray-600">{category.value}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${category.value}%`,
                        backgroundColor: category.color
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Stats (Conditional) */}
        {showDetailedStats && (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">สถิติรายละเอียด</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-indigo-600">7</div>
                  <div className="text-sm text-gray-600">วันติดต่อกัน</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <div className="text-sm text-gray-600">พื้นที่ที่ไป</div>
                </div>
              </div>
              
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="flex items-center space-x-2 text-yellow-800">
                  <Info className="w-4 h-4" />
                  <span className="text-sm">คุณอยู่ในอันดับที่ 15 จากผู้ใช้ทั้งหมด 1,234 คน</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">การดำเนินการด่วน</h3>
          
          <div className="space-y-3">
            <button 
              onClick={() => router.push('/search')}
              className="w-full flex items-center justify-between p-3 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900">ค้นหางานใหม่</div>
                  <div className="text-sm text-gray-600">เพิ่มสถิติและคะแนน</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <button 
              onClick={() => router.push('/achievements')}
              className="w-full flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-xl transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900">ดูความสำเร็จ</div>
                  <div className="text-sm text-gray-600">ติดตามเป้าหมาย</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </main>

      {/* Mobile Safe Area */}
      <div className="h-6 bg-gray-50 md:hidden"></div>
    </div>
  );
}
