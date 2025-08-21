'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  Clock, 
  MapPin, 
  User, 
  Calendar, 
  CheckCircle, 
  XCircle,
  Play,
  Pause,
  ArrowLeft,
  Filter,
  Search,
  Eye,
  MessageCircle
} from 'lucide-react';
import Link from 'next/link';

interface Task {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  status: 'PENDING' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  scheduledDate: string;
  scheduledTime: string;
  estimatedHours: number;
  budget?: number;
  category: string;
  creator: {
    id: string;
    firstName: string;
    lastName: string;
    userType: string;
  };
  accepter?: {
    id: string;
    firstName: string;
    lastName: string;
    userType: string;
  };
}

export default function MyTasks() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
      loadUserTasks();
    }
  }, [user, loading, router]);

  useEffect(() => {
    filterTasks();
  }, [tasks, statusFilter, searchTerm]);

  const loadUserTasks = async () => {
    try {
      const response = await fetch('/api/tasks/my-tasks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const userTasks = await response.json();
        setTasks(userTasks);
      } else {
                 // Mock data for demo
         const mockTasks: Task[] = [
           {
             id: '1',
             title: 'พาไปตรวจสุขภาพที่โรงพยาบาล',
             description: 'ต้องการคนพาไปตรวจสุขภาพที่โรงพยาบาลมหาราช ตรวจความดันและน้ำตาลในเลือด ตรวจตา และตรวจสุขภาพทั่วไป',
             address: 'โรงพยาบาลมหาราช',
             city: 'กรุงเทพฯ',
             province: 'กรุงเทพฯ',
             postalCode: '10400',
             status: 'COMPLETED',
             createdAt: '2024-01-15T10:00:00Z',
             scheduledDate: '2024-01-20',
             scheduledTime: '09:00',
             estimatedHours: 3,
             budget: 500,
             category: 'HOSPITAL',
             creator: {
               id: user?.id || '',
               firstName: user?.firstName || '',
               lastName: user?.lastName || '',
               userType: user?.userType || 'ELDERLY'
             },
             accepter: {
               id: 'student-1',
               firstName: 'สมชาย',
               lastName: 'ใจดี',
               userType: 'STUDENT'
             }
           },
           {
             id: '2',
             title: 'พาไปทำบุญที่วัดพระแก้ว',
             description: 'ต้องการคนพาไปทำบุญที่วัดพระแก้ว ไหว้พระ ทำบุญใส่บาตร และเดินชมความสวยงามของวัด',
             address: 'วัดพระแก้ว',
             city: 'กรุงเทพฯ',
             province: 'กรุงเทพฯ',
             postalCode: '10200',
             status: 'IN_PROGRESS',
             createdAt: '2024-01-18T14:00:00Z',
             scheduledDate: '2024-01-25',
             scheduledTime: '08:00',
             estimatedHours: 4,
             budget: 300,
             category: 'TEMPLE',
             creator: {
               id: user?.id || '',
               firstName: user?.firstName || '',
               lastName: user?.lastName || '',
               userType: user?.userType || 'ELDERLY'
             },
             accepter: {
               id: 'student-2',
               firstName: 'สมหญิง',
               lastName: 'รักดี',
               userType: 'STUDENT'
             }
           },
           {
             id: '3',
             title: 'ช่วยซ่อมคอมพิวเตอร์',
             description: 'คอมพิวเตอร์เสีย ต้องการคนช่วยซ่อม ตรวจสอบฮาร์ดแวร์ และติดตั้งโปรแกรมใหม่',
             address: 'บ้านผู้ใช้',
             city: 'กรุงเทพฯ',
             province: 'กรุงเทพฯ',
             postalCode: '10400',
             status: 'PENDING',
             createdAt: '2024-01-20T16:00:00Z',
             scheduledDate: '2024-01-30',
             scheduledTime: '13:00',
             estimatedHours: 2,
             budget: 200,
             category: 'REPAIR',
             creator: {
               id: user?.id || '',
               firstName: user?.firstName || '',
               lastName: user?.lastName || '',
               userType: user?.userType || 'ELDERLY'
             }
           },
           {
             id: '4',
             title: 'ช่วยออกกำลังกายที่สวนสาธารณะ',
             description: 'ต้องการคนช่วยออกกำลังกายที่สวนลุมพินี เดินเร็ว วิ่งเหยาะๆ และทำท่ากายบริหารเบาๆ',
             address: 'สวนลุมพินี',
             city: 'กรุงเทพฯ',
             province: 'กรุงเทพฯ',
             postalCode: '10400',
             status: 'ACCEPTED',
             createdAt: '2024-01-22T08:00:00Z',
             scheduledDate: '2024-02-01',
             scheduledTime: '06:00',
             estimatedHours: 2,
             budget: 150,
             category: 'EXERCISE',
             creator: {
               id: user?.id || '',
               firstName: user?.firstName || '',
               lastName: user?.lastName || '',
               userType: user?.userType || 'ELDERLY'
             },
             accepter: {
               id: 'student-3',
               firstName: 'สมชาย',
               lastName: 'รักสุขภาพ',
               userType: 'STUDENT'
             }
           },
           {
             id: '5',
             title: 'ช่วยซื้อของที่ตลาด',
             description: 'ต้องการคนพาไปซื้อของที่ตลาดคลองเตย ซื้อผัก ผลไม้ เนื้อสัตว์ และของใช้ในบ้าน',
             address: 'ตลาดคลองเตย',
             city: 'กรุงเทพฯ',
             province: 'กรุงเทพฯ',
             postalCode: '10110',
             status: 'COMPLETED',
             createdAt: '2024-01-10T07:00:00Z',
             scheduledDate: '2024-01-15',
             scheduledTime: '07:30',
             estimatedHours: 2,
             budget: 250,
             category: 'EXERCISE',
             creator: {
               id: user?.id || '',
               firstName: user?.firstName || '',
               lastName: user?.lastName || '',
               userType: user?.userType || 'ELDERLY'
             },
             accepter: {
               id: 'student-4',
               firstName: 'สมหญิง',
               lastName: 'ใจดี',
               userType: 'STUDENT'
             }
           },
           {
             id: '6',
             title: 'ช่วยจัดระเบียบห้องสมุด',
             description: 'ต้องการคนช่วยจัดระเบียบหนังสือในห้องสมุด จัดหมวดหมู่ และทำความสะอาดพื้นที่',
             address: 'ห้องสมุดประชาชน',
             city: 'กรุงเทพฯ',
             province: 'กรุงเทพฯ',
             postalCode: '10300',
             status: 'CANCELLED',
             createdAt: '2024-01-25T14:00:00Z',
             scheduledDate: '2024-02-05',
             scheduledTime: '14:00',
             estimatedHours: 4,
             budget: 350,
             category: 'REPAIR',
             creator: {
               id: user?.id || '',
               firstName: user?.firstName || '',
               lastName: user?.lastName || '',
               userType: user?.userType || 'ELDERLY'
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

    // Filter by status
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

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

    setFilteredTasks(filtered);
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'PENDING':
        return { text: 'รอการรับงาน', color: 'bg-yellow-500/20 text-yellow-300', icon: Clock };
      case 'ACCEPTED':
        return { text: 'รับงานแล้ว', color: 'bg-blue-500/20 text-blue-300', icon: CheckCircle };
      case 'IN_PROGRESS':
        return { text: 'กำลังดำเนินการ', color: 'bg-purple-500/20 text-purple-300', icon: Play };
      case 'COMPLETED':
        return { text: 'เสร็จสิ้น', color: 'bg-green-500/20 text-green-300', icon: CheckCircle };
      case 'CANCELLED':
        return { text: 'ยกเลิก', color: 'bg-red-500/20 text-red-300', icon: XCircle };
      default:
        return { text: 'ไม่ทราบสถานะ', color: 'bg-gray-500/20 text-gray-300', icon: Clock };
    }
  };

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'HOSPITAL':
        return { name: 'โรงพยาบาล', color: 'from-red-500 to-pink-500' };
      case 'TEMPLE':
        return { name: 'วัด', color: 'from-yellow-500 to-orange-500' };
      case 'EXERCISE':
        return { name: 'ออกกำลังกาย', color: 'from-green-500 to-teal-500' };
      case 'REPAIR':
        return { name: 'งานซ่อม', color: 'from-blue-500 to-indigo-500' };
      default:
        return { name: 'อื่นๆ', color: 'from-gray-500 to-gray-600' };
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    try {
      // In a real app, this would call an API
      setTasks(prev => prev.map(task =>
        task.id === taskId ? { ...task, status: newStatus as Task['status'] } : task
      ));
    } catch (error) {
      console.error('Failed to update task status:', error);
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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700">
      {/* Header */}
      <div className="glass-card mx-4 mt-4 p-6">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="text-white hover:text-pink-300 transition-colors">
            <ArrowLeft className="w-5 h-5 inline mr-2" />
            กลับไปหน้าแรก
          </Link>
          <h1 className="text-3xl font-bold text-white">งานของฉัน</h1>
          <Link href="/add-task" className="glass-button px-4 py-2">
            เพิ่มงานใหม่
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 px-4">
        {/* Filters and Search */}
        <div className="glass-card p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                <option value="ALL">สถานะทั้งหมด</option>
                <option value="PENDING">รอการรับงาน</option>
                <option value="ACCEPTED">รับงานแล้ว</option>
                <option value="IN_PROGRESS">กำลังดำเนินการ</option>
                <option value="COMPLETED">เสร็จสิ้น</option>
                <option value="CANCELLED">ยกเลิก</option>
              </select>
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
              <Clock className="w-10 h-10 text-white/40" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">ไม่มีงาน</h3>
            <p className="text-white/60 mb-6">
              {statusFilter === 'ALL' 
                ? 'คุณยังไม่มีงานใดๆ' 
                : `ไม่มีงานที่มีสถานะ "${getStatusInfo(statusFilter).text}"`
              }
            </p>
            <Link href="/add-task" className="glass-button px-6 py-3">
              สร้างงานใหม่
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => {
              const statusInfo = getStatusInfo(task.status);
              const categoryInfo = getCategoryInfo(task.category);
              const StatusIcon = statusInfo.icon;

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
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                              {statusInfo.text}
                            </span>
                          </div>
                          
                          <p className="text-white/70 mb-3">{task.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center text-white/60">
                              <MapPin className="w-4 h-4 mr-2" />
                              {task.address}, {task.city}, {task.province}
                            </div>
                            <div className="flex items-center text-white/60">
                              <Calendar className="w-4 h-4 mr-2" />
                              {new Date(task.scheduledDate).toLocaleDateString('th-TH')} เวลา {task.scheduledTime}
                            </div>
                            <div className="flex items-center text-white/60">
                              <Clock className="w-4 h-4 mr-2" />
                              {task.estimatedHours} ชั่วโมง
                            </div>
                          </div>

                          {task.accepter && (
                            <div className="mt-3 p-3 bg-white/10 rounded-lg">
                              <p className="text-white/70 text-sm mb-1">ผู้รับงาน:</p>
                              <div className="flex items-center text-white">
                                <User className="w-4 h-4 mr-2" />
                                {task.accepter.firstName} {task.accepter.lastName} ({task.accepter.userType === 'STUDENT' ? 'นักศึกษา' : 'ผู้สูงอายุ'})
                              </div>
                            </div>
                          )}
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

                      {/* Status Actions */}
                      {task.status === 'ACCEPTED' && (
                        <button
                          onClick={() => handleStatusChange(task.id, 'IN_PROGRESS')}
                          className="glass-button px-4 py-2 text-center flex items-center justify-center"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          เริ่มงาน
                        </button>
                      )}

                      {task.status === 'IN_PROGRESS' && (
                        <button
                          onClick={() => handleStatusChange(task.id, 'COMPLETED')}
                          className="glass-button px-4 py-2 text-center flex items-center justify-center"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          เสร็จสิ้น
                        </button>
                      )}

                      {(task.status === 'PENDING' || task.status === 'ACCEPTED') && (
                        <button
                          onClick={() => handleStatusChange(task.id, 'CANCELLED')}
                          className="glass-button-secondary px-4 py-2 text-center flex items-center justify-center text-red-300 hover:text-red-200"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          ยกเลิก
                        </button>
                      )}
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
