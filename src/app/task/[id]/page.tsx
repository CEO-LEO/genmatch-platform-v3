'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Star,
  User,
  Heart,
  MessageCircle,
  Eye,
  CheckCircle,
  AlertCircle
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

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: 'HOSPITAL', name: 'โรงพยาบาล', color: 'from-red-500 to-pink-500' },
    { id: 'TEMPLE', name: 'วัด', color: 'from-yellow-500 to-orange-500' },
    { id: 'EXERCISE', name: 'ออกกำลังกาย', color: 'from-green-500 to-teal-500' },
    { id: 'REPAIR', name: 'งานซ่อม', color: 'from-blue-500 to-indigo-500' }
  ];

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }
    if (user) {
      loadTask();
    }
  }, [user, loading, router]);

  const loadTask = async () => {
    try {
      console.log('Loading task with ID:', params.id); // Debug log
      
      // Mock data for demo
      const mockTask: Task = {
        id: params.id as string,
        title: 'ช่วยซื้อของที่ซุปเปอร์มาร์เก็ต',
        description: 'ต้องการคนช่วยซื้อของที่ซุปเปอร์มาร์เก็ต เซ็นทรัลเวิลด์ ช่วยเลือกผักผลไม้และของใช้ในบ้าน เช่น ผักคะน้า ผักบุ้ง มะเขือเทศ แครอท แอปเปิ้ล ส้ม กล้วย และของใช้ในบ้าน เช่น น้ำยาล้างจาน แปรงสีฟัน สบู่ ผ้าขนหนู',
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
      };
      
      console.log('Mock task loaded:', mockTask); // Debug log
      setTask(mockTask);
    } catch (error) {
      console.error('Failed to load task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryInfo = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat || categories[0];
  };

  const handleAcceptTask = async () => {
    try {
      // In a real app, this would call an API
      setTask(prev => prev ? { ...prev, status: 'ACCEPTED' } : null);
      alert('รับงานสำเร็จ! คุณสามารถติดต่อผู้สร้างงานผ่านระบบแชทได้');
    } catch (error) {
      console.error('Failed to accept task:', error);
    }
  };

     if (loading) {
     return (
       <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700">
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

     if (isLoading) {
     return (
       <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700">
         <div className="text-center">
           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-400 mx-auto"></div>
           <p className="mt-4 text-lg text-white">กำลังโหลดรายละเอียดงาน...</p>
         </div>
       </div>
     );
   }

     if (!task) {
     return (
       <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 flex items-center justify-center">
         <div className="glass-card p-8 text-center max-w-md">
           <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
           <h1 className="text-xl font-bold text-white mb-4">ไม่พบงาน</h1>
           <p className="text-white/70 mb-6">งานที่คุณค้นหาอาจถูกลบหรือไม่มีอยู่</p>
           <Link href="/search" className="glass-button px-6 py-3">
             กลับไปค้นหางาน
           </Link>
         </div>
       </div>
     );
   }

  const categoryInfo = getCategoryInfo(task.category);

  return (
         <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700">
       {/* Header */}
       <div className="glass-card mx-4 mt-4 p-6">
        <div className="flex items-center justify-between">
          <Link href="/search" className="text-white hover:text-pink-300 transition-colors">
            <ArrowLeft className="w-5 h-5 inline mr-2" />
            กลับไปค้นหางาน
          </Link>
          <h1 className="text-3xl font-bold text-white">รายละเอียดงาน</h1>
          <div className="w-32"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-6 px-4">
        {/* Task Detail Card */}
        <div className="glass-card p-8 mb-6">
          <div className="flex items-start gap-6">
            {/* Category Icon */}
            <div className={`w-24 h-24 bg-gradient-to-r ${categoryInfo.color} rounded-3xl flex items-center justify-center text-white text-4xl font-bold`}>
              {categoryInfo.name.charAt(0)}
            </div>
            
            {/* Task Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-3xl font-bold text-white">{task.title}</h2>
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                  รอการรับงาน
                </span>
              </div>
              
              <p className="text-white/80 text-lg leading-relaxed mb-6">{task.description}</p>
              
              {/* Task Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-center text-white/70">
                  <MapPin className="w-5 h-5 mr-3 text-pink-400" />
                  <span className="text-lg">{task.address}, {task.city}, {task.province}</span>
                </div>
                <div className="flex items-center text-white/70">
                  <Calendar className="w-5 h-5 mr-3 text-pink-400" />
                  <span className="text-lg">{new Date(task.scheduledDate).toLocaleDateString('th-TH')}</span>
                </div>
                <div className="flex items-center text-white/70">
                  <Clock className="w-5 h-5 mr-3 text-pink-400" />
                  <span className="text-lg">{task.scheduledTime}</span>
                </div>
                <div className="flex items-center text-white/70">
                  <Star className="w-5 h-5 mr-3 text-pink-400" />
                  <span className="text-lg">{task.estimatedHours} ชั่วโมง</span>
                </div>
              </div>

              {/* Budget and Volunteer Hours */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-white/60 text-sm mb-2">งบประมาณ</p>
                  <p className="text-2xl font-bold text-green-400">{task.budget} บาท</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-white/60 text-sm mb-2">ชั่วโมงจิตอาสา</p>
                  <p className="text-2xl font-bold text-blue-400">{task.volunteerHours} ชั่วโมง</p>
                </div>
              </div>

              {/* Creator Info */}
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-white/70 text-sm mb-2">ผู้สร้างงาน</p>
                <div className="flex items-center text-white">
                  <User className="w-5 h-5 mr-3 text-pink-400" />
                  <span className="text-lg">{task.creator.firstName} {task.creator.lastName}</span>
                  <span className="ml-3 px-3 py-1 rounded-full text-sm bg-purple-500/20 text-purple-300">
                    {task.creator.userType === 'STUDENT' ? 'นักศึกษา' : 'ผู้สูงอายุ'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold text-white mb-4">ดำเนินการ</h3>
          <div className="flex flex-col sm:flex-row gap-4">
                         <button
               onClick={handleAcceptTask}
               className="glass-button flex-1 px-8 py-4 text-lg font-semibold flex items-center justify-center"
             >
               รับงาน
             </button>
            
            <Link
              href={`/chat?task=${task.id}`}
              className="glass-button-secondary flex-1 px-8 py-4 text-lg font-semibold flex items-center justify-center"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              แชทกับผู้สร้างงาน
            </Link>
            
            <Link
              href="/search"
              className="glass-button-secondary flex-1 px-8 py-4 text-lg font-semibold flex items-center justify-center"
            >
              <Eye className="w-6 h-6 mr-3" />
              ดูงานอื่นๆ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
