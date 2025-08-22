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
  AlertCircle,
  Phone,
  Mail,
  Share2,
  Bookmark,
  Flag,
  ChevronRight,
  Building,
  Globe,
  Wrench
} from 'lucide-react';
import Link from 'next/link';

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
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
    rating?: number;
    totalTasks?: number;
  };
}

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const categories = [
    { id: 'HOSPITAL', name: 'โรงพยาบาล', color: 'from-red-500 to-pink-500', emoji: '🏥' },
    { id: 'TEMPLE', name: 'วัด', color: 'from-yellow-500 to-orange-500', emoji: '🏛️' },
    { id: 'EXERCISE', name: 'ออกกำลังกาย', color: 'from-green-500 to-teal-500', emoji: '💪' },
    { id: 'REPAIR', name: 'งานซ่อม', color: 'from-blue-500 to-indigo-500', emoji: '🔧' }
  ];

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };

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
      console.log('Loading task with ID:', params.id);
      
      // Mock data based on task ID
      const mockTasks = {
        '1': {
          id: '1',
          title: 'ช่วยซื้อของที่ซุปเปอร์มาร์เก็ต',
          description: 'ต้องการคนช่วยซื้อของที่ซุปเปอร์มาร์เก็ต เซ็นทรัลเวิลด์ ช่วยเลือกผักผลไม้และของใช้ในบ้าน เช่น ผักคะน้า ผักบุ้ง มะเขือเทศ แครอท แอปเปิ้ล ส้ม กล้วย และของใช้ในบ้าน เช่น น้ำยาล้างจาน แปรงสีฟัน สบู่ ผ้าขนหนู',
          category: 'EXERCISE',
          status: 'PENDING',
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
            userType: 'ELDERLY',
            rating: 4.8,
            totalTasks: 15
          }
        },
        '2': {
          id: '2',
          title: 'ช่วยติดตั้งคอมพิวเตอร์',
          description: 'ซื้อคอมพิวเตอร์ใหม่มา ต้องการคนช่วยติดตั้งและลงโปรแกรมพื้นฐาน เช่น Office, Chrome, Photoshop และโปรแกรมอื่นๆ ที่จำเป็น',
          category: 'REPAIR',
          status: 'PENDING',
          volunteerHours: 4,
          estimatedHours: 4,
          address: 'สุขุมวิท 55',
          city: 'กรุงเทพฯ',
          province: 'กรุงเทพฯ',
          postalCode: '10110',
          scheduledDate: '2024-01-25',
          scheduledTime: '14:00',
          createdAt: '2024-01-16T09:00:00Z',
          creator: {
            id: 'elderly-2',
            firstName: 'ประยุทธ',
            lastName: 'สมบูรณ์',
            userType: 'ELDERLY',
            rating: 4.5,
            totalTasks: 8
          }
        }
      };

      const taskData = mockTasks[params.id as keyof typeof mockTasks];
      if (taskData) {
        setTask(taskData);
      }
    } catch (error) {
      console.error('Error loading task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptTask = () => {
    if (task) {
      router.push(`/task/${task.id}/complete`);
    }
  };

  const handleContactCreator = () => {
    // Handle contact creator
    console.log('Contacting creator...');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
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

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">ไม่พบงาน</h2>
          <p className="text-gray-600 mb-6">งานที่คุณค้นหาอาจถูกลบหรือไม่มีอยู่</p>
          <Link 
            href="/search"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            กลับไปค้นหา
          </Link>
        </div>
      </div>
    );
  }

  const categoryInfo = getCategoryInfo(task.category);

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
            
            <h1 className="text-lg font-semibold text-gray-900">รายละเอียดงาน</h1>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked 
                    ? 'text-red-500 hover:bg-red-50' 
                    : 'text-gray-400 hover:bg-gray-100'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 space-y-6">
        {/* Task Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${categoryInfo.color} rounded-xl flex items-center justify-center text-2xl`}>
                  {categoryInfo.emoji}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 leading-tight">
                    {task.title}
                  </h2>
                  <p className="text-sm text-gray-600">{categoryInfo.name}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{task.estimatedHours} ชม.</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(task.scheduledDate)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(task.scheduledTime)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
            รออาสาสมัคร
          </div>
        </div>

        {/* Creator Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ผู้สร้างงาน</h3>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">
                {task.creator.firstName} {task.creator.lastName}
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                {task.creator.userType === 'ELDERLY' ? 'ผู้สูงอายุ' : 'นักศึกษา'}
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-gray-700">{task.creator.rating}</span>
                </div>
                <div className="text-gray-600">
                  งานที่สร้าง {task.creator.totalTasks} งาน
                </div>
              </div>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Task Details */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">รายละเอียดงาน</h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            {task.description}
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">{task.address}</p>
                <p className="text-sm text-gray-600">{task.city}, {task.province} {task.postalCode}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">วันที่และเวลา</p>
                <p className="text-sm text-gray-600">
                  {formatDate(task.scheduledDate)} เวลา {formatTime(task.scheduledTime)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Heart className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">ชั่วโมงอาสา</p>
                <p className="text-sm text-gray-600">{task.volunteerHours} ชั่วโมง</p>
              </div>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ความต้องการ</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">อายุ 18 ปีขึ้นไป</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">มีประสบการณ์ในงานที่เกี่ยวข้อง</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">สามารถเดินทางไปยังสถานที่ได้</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pb-6">
          <button
            onClick={handleAcceptTask}
            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-semibold text-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 active:scale-95"
          >
            รับงานนี้
          </button>
          
          <button
            onClick={handleContactCreator}
            className="w-full py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold text-lg hover:border-indigo-300 hover:text-indigo-600 transition-all duration-200 active:scale-95"
          >
            <MessageCircle className="w-5 h-5 inline mr-2" />
            ติดต่อผู้สร้างงาน
          </button>
        </div>
      </main>

      {/* Mobile Safe Area */}
      <div className="h-6 bg-gray-50 md:hidden"></div>
    </div>
  );
}
