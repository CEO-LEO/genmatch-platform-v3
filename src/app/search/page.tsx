'use client';

import { useState, useEffect, useCallback } from 'react';
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
  category: string;
  status: string;
  budget: number;
  volunteerHours: number;
  estimatedHours: number;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  scheduledDate: string;
  scheduledTime: string;
  createdAt: string;
  creator: {
    id: string;
    firstName: string;
    lastName: string;
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

  // Define filterTasks function before using it in useEffect
  const filterTasks = useCallback(() => {
    let filtered = tasks;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.province.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter !== 'ALL') {
      filtered = filtered.filter(task => task.category === categoryFilter);
    }

    // Filter by location
    if (locationFilter) {
      filtered = filtered.filter(task =>
        task.address.toLowerCase().includes(locationFilter.toLowerCase()) ||
        task.city.toLowerCase().includes(locationFilter.toLowerCase()) ||
        task.province.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  }, [tasks, searchTerm, categoryFilter, locationFilter]);

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
  }, [filterTasks]);

  const loadTasks = async () => {
    try {
      console.log('Loading tasks...'); // Debug log
      const response = await fetch('/api/tasks');
      
      if (response.ok) {
        const allTasks = await response.json();
        console.log('Loaded tasks from API:', allTasks); // Debug log
        setTasks(allTasks);
      } else {
        console.error('Failed to load tasks:', response.status);
        console.log('Using fallback mock data...'); // Debug log
                 // Fallback to mock data
         const mockTasks: Task[] = [
           {
             id: '1',
             title: 'ช่วยซื้อของที่ซุปเปอร์มาร์เก็ต',
             description: 'ต้องการคนช่วยซื้อของที่ซุปเปอร์มาร์เก็ต เซ็นทรัลเวิลด์ ช่วยเลือกผักผลไม้และของใช้ในบ้าน',
             category: 'EXERCISE',
             status: 'PENDING',
             budget: 300,
             volunteerHours: 2,
             estimatedHours: 2,
             address: 'เซ็นทรัลเวิลด์',
             city: 'กรุงเทพฯ',
             province: 'กรุงเทพฯ',
             postalCode: '10330',
             scheduledDate: '2024-01-22',
             scheduledTime: '09:00',
             createdAt: '2024-01-15T10:00:00Z',
             creator: {
               id: 'elderly-1',
               firstName: 'สมศรี',
               lastName: 'ใจดี',
               userType: 'ELDERLY'
             }
           },
           {
             id: '2',
             title: 'ช่วยติดตั้งคอมพิวเตอร์',
             description: 'ซื้อคอมพิวเตอร์ใหม่มา ต้องการคนช่วยติดตั้งและลงโปรแกรมพื้นฐาน เช่น Office, Chrome',
             category: 'REPAIR',
             status: 'PENDING',
             budget: 400,
             volunteerHours: 3,
             estimatedHours: 3,
             address: 'บ้านผู้ใช้',
             city: 'กรุงเทพฯ',
             province: 'กรุงเทพฯ',
             postalCode: '10400',
             scheduledDate: '2024-01-25',
             scheduledTime: '13:00',
             createdAt: '2024-01-18T14:00:00Z',
             creator: {
               id: 'elderly-2',
               firstName: 'สมชาย',
               lastName: 'รักดี',
               userType: 'ELDERLY'
             }
           },
           {
             id: '3',
             title: 'พาไปตรวจสุขภาพที่โรงพยาบาล',
             description: 'ต้องการคนพาไปตรวจสุขภาพที่โรงพยาบาลมหาราช ตรวจความดันและน้ำตาลในเลือด',
             category: 'HOSPITAL',
             status: 'PENDING',
             budget: 500,
             volunteerHours: 4,
             estimatedHours: 4,
             address: 'โรงพยาบาลมหาราช',
             city: 'กรุงเทพฯ',
             province: 'กรุงเทพฯ',
             postalCode: '10400',
             scheduledDate: '2024-01-28',
             scheduledTime: '08:00',
             createdAt: '2024-01-20T16:00:00Z',
             creator: {
               id: 'elderly-3',
               firstName: 'สมศักดิ์',
               lastName: 'ใจเย็น',
               userType: 'ELDERLY'
             }
           }
         ];
        setTasks(mockTasks);
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
      console.log('Using fallback mock data...'); // Debug log
             // Fallback to mock data on error
       const mockTasks: Task[] = [
         {
           id: '1',
           title: 'ช่วยซื้อของที่ซุปเปอร์มาร์เก็ต',
           description: 'ต้องการคนช่วยซื้อของที่ซุปเปอร์มาร์เก็ต เซ็นทรัลเวิลด์ ช่วยเลือกผักผลไม้และของใช้ในบ้าน',
           category: 'EXERCISE',
           status: 'PENDING',
           budget: 300,
           volunteerHours: 2,
           estimatedHours: 2,
           address: 'เซ็นทรัลเวิลด์',
           city: 'กรุงเทพฯ',
           province: 'กรุงเทพฯ',
           postalCode: '10330',
           scheduledDate: '2024-01-22',
           scheduledTime: '09:00',
           createdAt: '2024-01-15T10:00:00Z',
           creator: {
             id: 'elderly-1',
             firstName: 'สมศรี',
             lastName: 'ใจดี',
             userType: 'ELDERLY'
           }
         }
       ];
      setTasks(mockTasks);
    } finally {
      setIsLoading(false);
    }
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
          <p className="mt-4 text-lg text-white">กรุณารอสักครู่...</p>
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
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <input
                type="text"
                placeholder="ค้นหาตามที่อยู่..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full bg-white/20 text-white placeholder-white/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div className="text-right">
              <p className="text-white/70 text-sm mb-1">งานทั้งหมด</p>
              <p className="text-2xl font-bold text-white">{filteredTasks.length}</p>
            </div>
          </div>
        </div>

        {/* Tasks List */}
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
          <div className="space-y-4">
            {filteredTasks.map((task) => {
              const categoryInfo = getCategoryInfo(task.category);

              return (
                <div key={task.id} className="glass-card p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Task Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className={`w-16 h-16 bg-gradient-to-r ${categoryInfo.color} rounded-2xl flex items-center justify-center text-white text-2xl font-bold`}>
                          {categoryInfo.name.charAt(0)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-white">{task.title}</h3>
                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-300">
                              รอการรับงาน
                            </span>
                          </div>
                          
                          <p className="text-white/70 mb-3 line-clamp-2">{task.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center text-white/60">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span className="line-clamp-1">{task.address}, {task.city}, {task.province}</span>
                            </div>
                            <div className="flex items-center text-white/60">
                              <Calendar className="w-4 h-4 mr-2" />
                              {new Date(task.scheduledDate).toLocaleDateString('th-TH')}
                            </div>
                            <div className="flex items-center text-white/60">
                              <Clock className="w-4 h-4 mr-2" />
                              {task.scheduledTime}
                            </div>
                            <div className="flex items-center text-white/60">
                              <Star className="w-4 h-4 mr-2" />
                              {task.estimatedHours} ชั่วโมง
                            </div>
                          </div>

                          <div className="mt-3 p-3 bg-white/10 rounded-lg">
                            <p className="text-white/70 text-sm mb-1">ผู้สร้างงาน:</p>
                            <div className="flex items-center text-white">
                              <User className="w-4 h-4 mr-2" />
                              {task.creator.firstName} {task.creator.lastName} ({task.creator.userType === 'STUDENT' ? 'นักศึกษา' : 'ผู้สูงอายุ'})
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 min-w-fit">
                      <Link
                        href={`/chat?task=${task.id}`}
                        className="glass-button-secondary px-4 py-2 text-center flex items-center justify-center"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        แชท
                      </Link>
                      
                      <Link
                        href={`/task/${task.id}`}
                        className="glass-button px-4 py-2 text-center flex items-center justify-center"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        ดูรายละเอียด
                      </Link>

                      <button
                        onClick={() => handleAcceptTask(task.id)}
                        className="glass-button px-4 py-2 text-center flex items-center justify-center"
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        รับงาน
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
