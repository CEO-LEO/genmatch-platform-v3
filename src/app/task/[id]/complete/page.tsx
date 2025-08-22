'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ArrowLeft,
  CheckCircle,
  Camera,
  Upload,
  Star,
  MessageCircle,
  Clock,
  MapPin,
  Calendar,
  Heart,
  AlertCircle,
  ChevronRight,
  Image as ImageIcon,
  X
} from 'lucide-react';
import Link from 'next/link';

interface Task {
  id: string;
  title: string;
  category: string;
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  volunteerHours: number;
}

export default function TaskCompletePage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    completionNotes: '',
    actualHours: '',
    rating: 0,
    feedback: ''
  });
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const categories = [
    { id: 'HOSPITAL', name: 'โรงพยาบาล', emoji: '🏥' },
    { id: 'TEMPLE', name: 'วัด', emoji: '🏛️' },
    { id: 'EXERCISE', name: 'ออกกำลังกาย', emoji: '💪' },
    { id: 'REPAIR', name: 'งานซ่อม', emoji: '🔧' }
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
      // Mock data
      const mockTask = {
        id: params.id as string,
        title: 'ช่วยซื้อของที่ซุปเปอร์มาร์เก็ต',
        category: 'EXERCISE',
        scheduledDate: '2024-01-22',
        scheduledTime: '09:00',
        address: 'เซ็นทรัลเวิลด์',
        volunteerHours: 2
      };
      
      setTask(mockTask);
    } catch (error) {
      console.error('Error loading task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setUploadedImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success - redirect to dashboard
      router.push('/dashboard?completed=true');
    } catch (error) {
      console.error('Error completing task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            กลับไปหน้าแรก
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
            
            <h1 className="text-lg font-semibold text-gray-900">เสร็จสิ้นงาน</h1>
            
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 space-y-6">
        {/* Task Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center text-2xl">
              {categoryInfo.emoji}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">{task.title}</h2>
              <p className="text-sm text-gray-600">{categoryInfo.name}</p>
            </div>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-3">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">{formatDate(task.scheduledDate)} เวลา {task.scheduledTime}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">{task.address}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">ชั่วโมงที่คาดการณ์: {task.volunteerHours} ชม.</span>
            </div>
          </div>
        </div>

        {/* Completion Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Completion Notes */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">บันทึกการทำงาน</h3>
            <textarea
              value={formData.completionNotes}
              onChange={(e) => setFormData({ ...formData, completionNotes: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 resize-none"
              placeholder="อธิบายงานที่ทำเสร็จสิ้น..."
              required
            />
          </div>

          {/* Actual Hours */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ชั่วโมงที่ใช้จริง</h3>
            <input
              type="number"
              value={formData.actualHours}
              onChange={(e) => setFormData({ ...formData, actualHours: e.target.value })}
              min="0.5"
              step="0.5"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
              placeholder="0.5"
              required
            />
            <p className="text-sm text-gray-600 mt-2">กรอกชั่วโมงที่ใช้จริงในการทำงาน</p>
          </div>

          {/* Photo Evidence */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">รูปภาพประกอบ</h3>
            <p className="text-sm text-gray-600 mb-4">อัปโหลดรูปภาพเพื่อแสดงหลักฐานการทำงาน</p>
            
            {/* Upload Button */}
            <label className="block w-full p-6 border-2 border-dashed border-gray-300 rounded-xl text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-200">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">คลิกเพื่ออัปโหลดรูปภาพ</p>
              <p className="text-sm text-gray-500">รองรับ JPG, PNG ขนาดไม่เกิน 5MB</p>
            </label>

            {/* Uploaded Images */}
            {uploadedImages.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">รูปภาพที่อัปโหลดแล้ว:</h4>
                <div className="grid grid-cols-3 gap-3">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`รูปภาพ ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ให้คะแนนงาน</h3>
            <div className="flex items-center space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                    star <= formData.rating
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  <Star className="w-5 h-5" />
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              {formData.rating === 0 && 'เลือกคะแนน'}
              {formData.rating === 1 && 'ไม่พอใจเลย'}
              {formData.rating === 2 && 'ไม่พอใจ'}
              {formData.rating === 3 && 'พอใช้'}
              {formData.rating === 4 && 'พอใจ'}
              {formData.rating === 5 && 'พอใจมาก'}
            </p>
          </div>

          {/* Feedback */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ข้อเสนอแนะ</h3>
            <textarea
              value={formData.feedback}
              onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 resize-none"
              placeholder="ให้ข้อเสนอแนะเพื่อปรับปรุงการทำงานในอนาคต..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-green-600 text-white rounded-xl font-semibold text-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                กำลังบันทึก...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                เสร็จสิ้นงาน
              </div>
            )}
          </button>
        </form>

        {/* Help Text */}
        <div className="text-center text-sm text-gray-500 pb-6">
          <p>การบันทึกงานเสร็จสิ้นจะช่วยให้ระบบคำนวณชั่วโมงอาสาของคุณได้อย่างถูกต้อง</p>
        </div>
      </main>

      {/* Mobile Safe Area */}
      <div className="h-6 bg-gray-50 md:hidden"></div>
    </div>
  );
}
