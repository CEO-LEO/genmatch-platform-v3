'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  Filter, 
  Heart,
  ArrowLeft,
  Eye,
  MessageCircle,
  Star,
  User
} from 'lucide-react';
import Link from 'next/link';

interface Task {
  id: string;
  title: string;
  description: string;
  location: string;
  status: string;
  createdAt: string;
  date: string;
  time: string;
  duration: number;
  budget?: number;
  category: string;
  creator: {
    id: string;
    name: string;
    userType: string;
  };
}

export default function SearchPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [locationFilter, setLocationFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: 'ALL', name: 'ทั้งหมด', color: 'from-gray-500 to-gray-600' },
    { id: 'HOSPITAL', name: 'โรงพยาบาล', color: 'from-red-500 to-pink-500' },
    { id: 'TEMPLE', name: 'วัด', color: 'from-yellow-500 to-orange-500' },
    { id: 'EXERCISE', name: 'ออกกำลังกาย', color: 'from-green-500 to-teal-500' },
    { id: 'REPAIR', name: 'งานซ่อม', color: 'from-blue-500 to-indigo-500' }
  ];

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
      loadTasks();
    }
  }, [user, loading, router]);

  useEffect(() => {
    filterTasks();
  }, [tasks, searchTerm, categoryFilter, locationFilter]);

  const loadTasks = async () => {
    try {
      const response = await fetch('/api/tasks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const allTasks = await response.json();
        setTasks(allTasks);
      } else {
        // Mock data for demo
        const mockTasks: Task[] = [
          {
            id: '1',
            title: 'พาไปตรวจสุขภาพที่โรงพยาบาล',
            description: 'ต้องการคนพาไปตรวจสุขภาพที่โรงพยาบาลมหาราช ตรวจความดันและน้ำตาลในเลือด',
            location: 'โรงพยาบาลมหาราช, กรุงเทพฯ',
            status: 'PENDING',
            createdAt: '2024-01-15T10:00:00Z',
            date: '2024-01-20',
            time: '09:00',
            duration: 3,
            budget: 500,
            category: 'HOSPITAL',
            creator: {
              id: 'elderly-1',
              name: 'คุณสมศรี ใจดี',
              userType: 'ELDERLY'
            }
          },
          {
            id: '2',
            title: 'พาไปทำบุญที่วัดพระแก้ว',
            description: 'ต้องการคนพาไปทำบุญที่วัดพระแก้ว ทำบุญตักบาตรและไหว้พระ',
            location: 'วัดพระแก้ว, กรุงเทพฯ',
            status: 'PENDING',
            createdAt: '2024-01-18T14:00:00Z',
            date: '2024-01-25',
            time: '08:00',
            duration: 4,
            budget: 300,
            category: 'TEMPLE',
            creator: {
              id: 'elderly-2',
              name: 'คุณสมชาย รักดี',
              userType: 'ELDERLY'
            }
          },
          {
            id: '3',
            title: 'ช่วยซ่อมคอมพิวเตอร์',
            description: 'คอมพิวเตอร์เสีย เปิดไม่ติด ต้องการคนช่วยซ่อมและติดตั้งโปรแกรม',
            location: 'บ้านผู้ใช้, กรุงเทพฯ',
            status: 'PENDING',
            createdAt: '2024-01-20T16:00:00Z',
            date: '2024-01-30',
            time: '13:00',
            duration: 2,
            budget: 200,
            category: 'REPAIR',
            creator: {
              id: 'elderly-3',
              name: 'คุณสมศักดิ์ ใจเย็น',
              userType: 'ELDERLY'
            }
          },
          {
            id: '4',
            title: 'พาไปออกกำลังกายที่สวนลุมพินี',
            description: 'ต้องการคนพาไปเดินออกกำลังกายที่สวนลุมพินี ช่วงเช้า',
            location: 'สวนลุมพินี, กรุงเทพฯ',
            status: 'PENDING',
            createdAt: '2024-01-22T09:00:00Z',
            date: '2024-02-01',
            time: '06:00',
            duration: 2,
            budget: 150,
            category: 'EXERCISE',
            creator: {
              id: 'elderly-4',
              name: 'คุณสมหญิง สุขใจ',
              userType: 'ELDERLY'
            }
          },
          {
            id: '5',
            title: 'พาไปรับยาที่โรงพยาบาล',
            description: 'ต้องการคนพาไปรับยาที่โรงพยาบาลรามาธิบดี',
            location: 'โรงพยาบาลรามาธิบดี, กรุงเทพฯ',
            status: 'PENDING',
            createdAt: '2024-01-24T11:00:00Z',
            date: '2024-02-05',
            time: '10:00',
            duration: 2,
            budget: 250,
            category: 'HOSPITAL',
            creator: {
              id: 'elderly-5',
              name: 'คุณสมปอง มั่นคง',
              userType: 'ELDERLY'
            }
          }
        ];
        setTasks(mockTasks);
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterTasks = () => {
    let filtered = tasks;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter !== 'ALL') {
      filtered = filtered.filter(task => task.category === categoryFilter);
    }

    // Filter by location
    if (locationFilter) {
      filtered = filtered.filter(task =>
        task.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  };

  const getCategoryInfo = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat || categories[0];
  };

  const handleAcceptTask = async (taskId: string) => {
    try {
      // In a real app, this would call an API
      setTasks(prev => prev.map(task =>
        task.id === taskId ? { ...task, status: 'ACCEPTED' } : task
      ));
      alert('รับงานสำเร็จ! คุณสามารถติดต่อผู้สร้างงานผ่านระบบแชทได้');
    } catch (error) {
      console.error('Failed to accept task:', error);
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
          <Link href="/dashboard" className="text-white hover:text-pink-300 transition-colors">
            <ArrowLeft className="w-5 h-5 inline mr-2" />
            กลับไปหน้าแรก
          </Link>
          <h1 className="text-3xl font-bold text-white">ค้นหางาน</h1>
          <div className="w-32"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 px-4">
        {/* Search and Filters */}
        <div className="glass-card p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="ค้นหางาน..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/20 text-white placeholder-white/50 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full bg-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="สถานที่..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full bg-white/20 text-white placeholder-white/50 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div className="text-right">
              <p className="text-white/70 text-sm mb-1">งานที่พบ</p>
              <p className="text-2xl font-bold text-white">{filteredTasks.length}</p>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="glass-card p-4 mb-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setCategoryFilter(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  categoryFilter === category.id
                    ? 'bg-gradient-to-r ' + category.color + ' text-white shadow-lg'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tasks Grid */}
        {isLoading ? (
          <div className="glass-card p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-400 mx-auto mb-4"></div>
            <p className="text-white">กำลังโหลดงาน...</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-white/40" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">ไม่พบงาน</h3>
            <p className="text-white/60 mb-6">
              ลองเปลี่ยนคำค้นหาหรือตัวกรองดูครับ
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => {
              const categoryInfo = getCategoryInfo(task.category);
              
              return (
                <div key={task.id} className="glass-card p-6 hover:scale-105 transition-transform">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${categoryInfo?.color || 'from-gray-500 to-gray-600'} text-white`}>
                      {categoryInfo?.name || task.category}
                    </div>
                    <div className="flex items-center text-white/60 text-sm">
                      <Star className="w-4 h-4 mr-1" />
                      {task.budget ? `${task.budget} บาท` : 'ไม่มีงบประมาณ'}
                    </div>
                  </div>

                  {/* Task Title and Description */}
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                    {task.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-4 line-clamp-3">
                    {task.description}
                  </p>

                  {/* Task Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-white/60 text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      {task.location}
                    </div>
                    <div className="flex items-center text-white/60 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(task.date).toLocaleDateString('th-TH')} เวลา {task.time}
                    </div>
                    <div className="flex items-center text-white/60 text-sm">
                      <Clock className="w-4 h-4 mr-2" />
                      {task.duration} ชั่วโมง
                    </div>
                  </div>

                  {/* Creator Info */}
                  <div className="flex items-center justify-between mb-4 p-3 bg-white/10 rounded-lg">
                    <div className="flex items-center text-white/70 text-sm">
                      <User className="w-4 h-4 mr-2" />
                      {task.creator.name}
                    </div>
                    <div className="text-xs text-white/50">
                      {task.creator.userType === 'ELDERLY' ? 'ผู้สูงอายุ' : 'นักศึกษา'}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/task/${task.id}`}
                      className="flex-1 glass-button-secondary px-4 py-2 text-center text-sm"
                    >
                      <Eye className="w-4 h-4 inline mr-2" />
                      ดูรายละเอียด
                    </Link>
                    
                    {user.userType === 'STUDENT' && task.status === 'PENDING' && (
                      <button
                        onClick={() => handleAcceptTask(task.id)}
                        className="flex-1 glass-button px-4 py-2 text-center text-sm"
                      >
                        <Heart className="w-4 h-4 inline mr-2" />
                        รับงาน
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick Actions */}
        <div className="glass-card p-6 mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">การดำเนินการด่วน</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/add-task" className="glass-button-secondary p-4 text-center hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">สร้างงานใหม่</h4>
              <p className="text-white/70 text-sm">โพสต์งานที่ต้องการความช่วยเหลือ</p>
            </Link>
            
            <Link href="/my-tasks" className="glass-button-secondary p-4 text-center hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">งานของฉัน</h4>
              <p className="text-white/70 text-sm">ดูและจัดการงานที่สร้างไว้</p>
            </Link>
            
            <Link href="/chat" className="glass-button-secondary p-4 text-center hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">แชท</h4>
              <p className="text-white/70 text-sm">สื่อสารกับผู้ใช้อื่นๆ</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
