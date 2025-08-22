'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MapPin,
  Calendar,
  Star,
  User,
  Eye,
  MessageCircle,
  MoreVertical,
  ChevronRight,
  Building,
  Globe,
  Heart,
  Wrench
} from 'lucide-react';
import Link from 'next/link';

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'PENDING' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  volunteerHours: number;
  estimatedHours: number;
  address: string;
  city: string;
  scheduledDate: string;
  scheduledTime: string;
  createdAt: string;
  creator: {
    id: string;
    firstName: string;
    lastName: string;
    userType: string;
    rating: number;
  };
  volunteer?: {
    id: string;
    firstName: string;
    lastName: string;
    rating: number;
  };
}

export default function MyTasksPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'completed' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }
    if (user) {
      loadMyTasks();
    }
  }, [user, loading, router]);

  const loadMyTasks = async () => {
    try {
      // Mock data based on user type
      const mockTasks: Task[] = user?.userType === 'STUDENT' ? [
        // Tasks accepted by student
        {
          id: '1',
          title: 'ช่วยซื้อของที่ซุปเปอร์มาร์เก็ต',
          description: 'ต้องการคนช่วยซื้อของที่ซุปเปอร์มาร์เก็ต เซ็นทรัลเวิลด์ ช่วยเลือกผักผลไม้และของใช้ในบ้าน',
          category: 'EXERCISE',
          status: 'ACCEPTED',
          volunteerHours: 2,
          estimatedHours: 2,
          address: 'เซ็นทรัลเวิลด์',
          city: 'กรุงเทพฯ',
          scheduledDate: '2024-01-22',
          scheduledTime: '09:00',
          createdAt: '2024-01-15T10:00:00Z',
          creator: {
            id: 'elderly-1',
            firstName: 'สมศรี',
            lastName: 'ใจดี',
            userType: 'ELDERLY',
            rating: 4.8
          },
          volunteer: {
            id: user?.id || 'student-1',
            firstName: user?.firstName || 'สมชาย',
            lastName: user?.lastName || 'ใจดี',
            rating: 4.9
          }
        },
        {
          id: '2',
          title: 'ช่วยติดตั้งคอมพิวเตอร์',
          description: 'ซื้อคอมพิวเตอร์ใหม่มา ต้องการคนช่วยติดตั้งและลงโปรแกรมพื้นฐาน',
          category: 'REPAIR',
          status: 'IN_PROGRESS',
          volunteerHours: 4,
          estimatedHours: 4,
          address: 'สุขุมวิท 55',
          city: 'กรุงเทพฯ',
          scheduledDate: '2024-01-25',
          scheduledTime: '14:00',
          createdAt: '2024-01-16T09:00:00Z',
          creator: {
            id: 'elderly-2',
            firstName: 'ประยุทธ',
            lastName: 'สมบูรณ์',
            userType: 'ELDERLY',
            rating: 4.5
          },
          volunteer: {
            id: user?.id || 'student-1',
            firstName: user?.firstName || 'สมชาย',
            lastName: user?.lastName || 'ใจดี',
            rating: 4.9
          }
        },
        {
          id: '3',
          title: 'พาไปตรวจสุขภาพที่โรงพยาบาล',
          description: 'ต้องการคนพาไปตรวจสุขภาพที่โรงพยาบาลมหาราช ตรวจความดันและน้ำตาลในเลือด',
          category: 'HOSPITAL',
          status: 'COMPLETED',
          volunteerHours: 4,
          estimatedHours: 4,
          address: 'โรงพยาบาลมหาราช',
          city: 'กรุงเทพฯ',
          scheduledDate: '2024-01-20',
          scheduledTime: '08:00',
          createdAt: '2024-01-18T16:00:00Z',
          creator: {
            id: 'elderly-3',
            firstName: 'สมศักดิ์',
            lastName: 'ใจเย็น',
            userType: 'ELDERLY',
            rating: 4.7
          },
          volunteer: {
            id: user?.id || 'student-1',
            firstName: user?.firstName || 'สมชาย',
            lastName: user?.lastName || 'ใจดี',
            rating: 4.9
          }
        }
      ] : [
        // Tasks created by elderly
        {
          id: '1',
          title: 'ช่วยซื้อของที่ซุปเปอร์มาร์เก็ต',
          description: 'ต้องการคนช่วยซื้อของที่ซุปเปอร์มาร์เก็ต เซ็นทรัลเวิลด์ ช่วยเลือกผักผลไม้และของใช้ในบ้าน',
          category: 'EXERCISE',
          status: 'ACCEPTED',
          volunteerHours: 2,
          estimatedHours: 2,
          address: 'เซ็นทรัลเวิลด์',
          city: 'กรุงเทพฯ',
          scheduledDate: '2024-01-22',
          scheduledTime: '09:00',
          createdAt: '2024-01-15T10:00:00Z',
          creator: {
            id: user?.id || 'elderly-1',
            firstName: user?.firstName || 'สมศรี',
            lastName: user?.lastName || 'ใจดี',
            userType: 'ELDERLY',
            rating: 4.8
          },
          volunteer: {
            id: 'student-1',
            firstName: 'สมชาย',
            lastName: 'ใจดี',
            rating: 4.9
          }
        },
        {
          id: '2',
          title: 'ช่วยติดตั้งคอมพิวเตอร์',
          description: 'ซื้อคอมพิวเตอร์ใหม่มา ต้องการคนช่วยติดตั้งและลงโปรแกรมพื้นฐาน',
          category: 'REPAIR',
          status: 'PENDING',
          volunteerHours: 4,
          estimatedHours: 4,
          address: 'สุขุมวิท 55',
          city: 'กรุงเทพฯ',
          scheduledDate: '2024-01-25',
          scheduledTime: '14:00',
          createdAt: '2024-01-16T09:00:00Z',
          creator: {
            id: user?.id || 'elderly-2',
            firstName: user?.firstName || 'ประยุทธ',
            lastName: user?.lastName || 'สมบูรณ์',
            userType: 'ELDERLY',
            rating: 4.5
          }
        }
      ];
      
      setTasks(mockTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'PENDING':
        return { label: 'รออาสาสมัคร', color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="w-4 h-4" /> };
      case 'ACCEPTED':
        return { label: 'ถูกยอมรับ', color: 'bg-blue-100 text-blue-800', icon: <CheckCircle className="w-4 h-4" /> };
      case 'IN_PROGRESS':
        return { label: 'กำลังดำเนินการ', color: 'bg-orange-100 text-orange-800', icon: <Clock className="w-4 h-4" /> };
      case 'COMPLETED':
        return { label: 'เสร็จสิ้น', color: 'bg-green-100 text-green-800', icon: <CheckCircle className="w-4 h-4" /> };
      case 'CANCELLED':
        return { label: 'ถูกยกเลิก', color: 'bg-red-100 text-red-800', icon: <XCircle className="w-4 h-4" /> };
      default:
        return { label: 'ไม่ทราบสถานะ', color: 'bg-gray-100 text-gray-800', icon: <AlertCircle className="w-4 h-4" /> };
    }
  };

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'HOSPITAL':
        return { name: 'โรงพยาบาล', emoji: '🏥', color: 'from-red-500 to-pink-500' };
      case 'TEMPLE':
        return { name: 'วัด', emoji: '🏛️', color: 'from-yellow-500 to-orange-500' };
      case 'EXERCISE':
        return { name: 'ออกกำลังกาย', emoji: '💪', color: 'from-green-500 to-teal-500' };
      case 'REPAIR':
        return { name: 'งานซ่อม', emoji: '🔧', color: 'from-blue-500 to-indigo-500' };
      default:
        return { name: 'อื่นๆ', emoji: '📋', color: 'from-gray-500 to-gray-600' };
    }
  };

  const getFilteredTasks = () => {
    let filtered = tasks;
    
    // Apply filter
    if (filter === 'pending') {
      filtered = filtered.filter(task => task.status === 'PENDING');
    } else if (filter === 'accepted') {
      filtered = filtered.filter(task => task.status === 'ACCEPTED');
    } else if (filter === 'completed') {
      filtered = filtered.filter(task => task.status === 'COMPLETED');
    } else if (filter === 'cancelled') {
      filtered = filtered.filter(task => task.status === 'CANCELLED');
    }
    
    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  const filteredTasks = getFilteredTasks();
  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'PENDING').length,
    accepted: tasks.filter(t => t.status === 'ACCEPTED').length,
    completed: tasks.filter(t => t.status === 'COMPLETED').length
  };

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
            
            <h1 className="text-lg font-semibold text-gray-900">
              {user?.userType === 'STUDENT' ? 'งานที่รับไว้' : 'งานที่สร้าง'}
            </h1>
            
            <Link
              href="/add-task"
              className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">ทั้งหมด</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">รอ</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.accepted}</div>
            <div className="text-sm text-gray-600">ยอมรับ</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">เสร็จ</div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหางาน..."
              className="w-full pl-10 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ทั้งหมด
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                filter === 'pending'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              รอ
            </button>
            <button
              onClick={() => setFilter('accepted')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                filter === 'accepted'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ยอมรับ
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                filter === 'completed'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              เสร็จ
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 px-4">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchQuery ? 'ไม่พบงานที่ค้นหา' : 'ไม่มีงาน'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery 
                ? 'ลองเปลี่ยนคำค้นหาหรือล้างตัวกรอง'
                : user?.userType === 'STUDENT'
                  ? 'คุณยังไม่ได้รับงานใดๆ'
                  : 'คุณยังไม่สร้างงานใดๆ'
              }
            </p>
            {user?.userType === 'ELDERLY' && (
              <Link
                href="/add-task"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                สร้างงานใหม่
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-3 p-4">
            {filteredTasks.map((task) => {
              const statusInfo = getStatusInfo(task.status);
              const categoryInfo = getCategoryInfo(task.category);
              
              return (
                <div
                  key={task.id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden"
                >
                  {/* Task Header */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 bg-gradient-to-r ${categoryInfo.color} rounded-xl flex items-center justify-center text-2xl`}>
                          {categoryInfo.emoji}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1 leading-tight">
                            {task.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {categoryInfo.name}
                          </p>
                        </div>
                      </div>
                      
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                        {statusInfo.icon}
                        <span className="ml-1">{statusInfo.label}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      {task.description}
                    </p>
                  </div>

                  {/* Task Details */}
                  <div className="px-4 py-3 bg-gray-50">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{task.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">
                          {formatDate(task.scheduledDate)} {formatTime(task.scheduledTime)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{task.estimatedHours} ชม.</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{task.volunteerHours} ชม.</span>
                      </div>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="px-4 py-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {user?.userType === 'STUDENT' 
                              ? `${task.creator.firstName} ${task.creator.lastName}`
                              : task.volunteer 
                                ? `${task.volunteer.firstName} ${task.volunteer.lastName}`
                                : 'ยังไม่มีอาสาสมัคร'
                            }
                          </p>
                          <p className="text-sm text-gray-600">
                            {user?.userType === 'STUDENT' 
                              ? 'ผู้สร้างงาน'
                              : 'อาสาสมัคร'
                            }
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {task.status === 'ACCEPTED' && (
                          <Link
                            href={`/chat?task=${task.id}`}
                            className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            <MessageCircle className="w-5 h-5" />
                          </Link>
                        )}
                        
                        <Link
                          href={`/task/${task.id}`}
                          className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                        
                        <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Mobile Safe Area */}
      <div className="h-6 bg-gray-50 md:hidden"></div>
    </div>
  );
}
