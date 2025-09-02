
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar, Clock, Users, Tag, Phone, ArrowLeft } from 'lucide-react';

export default function AddTaskPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      console.log('No user found, redirecting to login...');
      router.push('/login');
    } else if (!loading && user && user.userType === 'STUDENT') {
      console.log('Students cannot create tasks, redirecting to search...');
      router.push('/search');
    }
  }, [user, loading, router]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    date: '',
    startTime: '',
    endTime: '',
    maxVolunteers: '1',
    requirements: '',
    tags: '',
    contactName: '',
    contactPhone: '',
    contactEmail: ''
  });

  const categories = [
    { id: 'hospital', name: 'โรงพยาบาล', icon: '🏥' },
    { id: 'temple', name: 'วัด', icon: '🏛️' },
    { id: 'exercise', name: 'ออกกำลังกาย', icon: '💪' },
    { id: 'repair', name: 'งานซ่อม', icon: '🔧' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🔥 Form submitted!');
    console.log('📋 Form data:', formData);
    console.log('👤 User:', user);
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'category', 'location', 'date', 'startTime', 'endTime'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      setMessage({ 
        type: 'error', 
        text: `กรุณากรอกข้อมูลให้ครบถ้วน: ${missingFields.join(', ')}` 
      });
      console.log('❌ Missing fields:', missingFields);
      return;
    }
    
    setIsLoading(true);
    setMessage(null);

    try {
      if (!user) {
        setMessage({ type: 'error', text: 'กรุณาเข้าสู่ระบบก่อนสร้างงาน' });
        setIsLoading(false);
        return;
      }

      console.log('📤 Creating task with data:', {
        ...formData,
        creatorId: user.id
      });

      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          maxVolunteers: parseInt(formData.maxVolunteers || '1', 10) || 1,
          creatorId: user.id
        }),
      });

      const data = await response.json();

      console.log('📨 API Response:', {
        status: response.status,
        ok: response.ok,
        data
      });

      if (response.ok) {
        setMessage({ type: 'success', text: data.message || 'สร้างงานสำเร็จแล้ว!' });
        
        // Auto redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
        
        // Reset form
        setFormData({
          title: '',
          description: '',
          category: '',
          location: '',
          date: '',
          startTime: '',
          endTime: '',
          maxVolunteers: '1',
          requirements: '',
          tags: '',
          contactName: '',
          contactPhone: '',
          contactEmail: ''
        });
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch (error) {
      console.error('❌ Error creating task:', error);
      setMessage({ type: 'error', text: 'เกิดข้อผิดพลาดในการเชื่อมต่อ' });
    } finally {
      setIsLoading(false);
    }
  };

  // Check if form is valid for submit
  const isFormValid = () => {
    const requiredFields = ['title', 'description', 'category', 'location', 'date', 'startTime', 'endTime'];
    return requiredFields.every(field => formData[field as keyof typeof formData]?.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Show access denied for students
  if (user.userType === 'STUDENT') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8 bg-white rounded-2xl shadow-lg">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🚫</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ไม่สามารถเข้าถึงได้</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            หน้านี้สำหรับ<strong>ผู้สูงอายุ</strong>เท่านั้น<br/>
            นักศึกษาสามารถ<strong>ค้นหาและรับงาน</strong>ได้
          </p>
          <div className="space-y-3">
            <button
              onClick={() => {
                console.log('🔍 Navigating to search...');
                // Add visual feedback
                const button = document.activeElement as HTMLButtonElement;
                if (button) {
                  button.style.transform = 'scale(0.95)';
                  setTimeout(() => {
                    button.style.transform = 'scale(1)';
                  }, 100);
                }
                router.push('/search');
              }}
              className="block w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              🔍 ค้นหางานจิตอาสา
            </button>
            <button
              onClick={() => {
                console.log('🏠 Navigating to dashboard...');
                // Add visual feedback
                const button = document.activeElement as HTMLButtonElement;
                if (button) {
                  button.style.transform = 'scale(0.95)';
                  setTimeout(() => {
                    button.style.transform = 'scale(1)';
                  }, 100);
                }
                router.push('/dashboard');
              }}
              className="block w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors active:scale-95 cursor-pointer"
            >
              🏠 กลับหน้าหลัก
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-2">
                <span className="text-white font-bold text-lg">GM</span>
              </div>
              <div>

              
          
          
                <h1 className="text-2xl font-bold text-gray-900">GenMatch</h1>
                <p className="text-sm text-gray-500">Generation Matching</p>
              </div>
            </div>

            {/* Back to Home Button */}
            <Link 
              href="/"
              className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
            >
              กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">สร้างงานจิตอาสาใหม่</h2>
          <p className="text-gray-600">สร้างงานจิตอาสาเพื่อให้นักศึกษาและจิตอาสาได้ช่วยเหลือ</p>
        </div>

        {/* Task Creation Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          {/* Basic Information */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                📝
              </span>
              ข้อมูลพื้นฐาน
            </h3>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  ชื่องานจิตอาสา *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="เช่น ช่วยเหลือในโรงพยาบาล, ทำความสะอาดวัด"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  รายละเอียดงาน *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="อธิบายรายละเอียดของงานที่ต้องการความช่วยเหลือ..."
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  หมวดหมู่งาน *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  required
                >
                  <option value="">เลือกหมวดหมู่งาน</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Location and Time */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <MapPin className="w-5 h-5 text-purple-600" />
              </span>
              สถานที่และเวลา
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  สถานที่ *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="เช่น กรุงเทพมหานคร, เชียงใหม่"
                  required
                />
              </div>

              <div>
                <label htmlFor="date" className="block 
                text-sm font-medium text-gray-700 mb-2">
                  วันที่ *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-2">
                  เวลาเริ่ม *
                </label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-2">
                  เวลาสิ้นสุด *
                </label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          {/* Requirements and Volunteers - REMOVED */}

          {/* Tags */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <Tag className="w-5 h-5 text-purple-600" />
              </span>
              แท็กและคำค้นหา
            </h3>
            
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                แท็ก (คั่นด้วยเครื่องหมายจุลภาค)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                placeholder="เช่น จิตอาสา, โรงพยาบาล, ผู้สูงอายุ, การศึกษา"
              />
              <p className="text-sm text-gray-500 mt-1">แท็กจะช่วยให้จิตอาสาค้นหางานของคุณได้ง่ายขึ้น</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <Phone className="w-5 h-5 text-purple-600" />
              </span>
              ข้อมูลติดต่อ
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
                  ชื่อผู้ติดต่อ *
                </label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="ชื่อผู้ติดต่อ"
                  required
                />
              </div>

              <div>
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-2">
                  เบอร์โทรศัพท์ *
                </label>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="081-234-5678"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  อีเมล
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`mb-6 p-6 rounded-xl border-2 ${
              message.type === 'success' 
                ? 'bg-green-50 border-green-300 text-green-800' 
                : 'bg-red-50 border-red-300 text-red-800'
            }`}>
              <div className="flex items-center justify-center">
                <span className="text-2xl mr-3">
                  {message.type === 'success' ? '🎉' : '⚠️'}
                </span>
                <div className="text-center">
                  <div className="font-bold text-lg mb-1">
                    {message.type === 'success' ? 'สร้างงานสำเร็จ!' : 'เกิดข้อผิดพลาด'}
                  </div>
                  <div className="text-base">{message.text}</div>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading || !isFormValid()}
              onClick={(e) => {
                console.log('🖱️ Button clicked!');
                console.log('📝 Form valid:', isFormValid());
                console.log('⏳ Loading:', isLoading);
              }}
              className={`px-12 py-4 text-white text-lg font-bold rounded-xl transition-all duration-200 transform hover:scale-105 ${
                isLoading || !isFormValid()
                  ? 'bg-gray-400 cursor-not-allowed shadow-md' 
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  กำลังสร้างงาน...
                </div>
              ) : (
                'สร้างงานจิตอาสา'
              )}
            </button>
            
            {/* Form Status Info */}
            <div className="mt-4 text-sm text-gray-500">
              {!isFormValid() && (
                <div className="flex items-center justify-center text-orange-600">
                  <span className="mr-2">⚠️</span>
                  กรุณากรอกข้อมูลให้ครบถ้วนก่อนสร้างงาน
                </div>
              )}
              {isFormValid() && !isLoading && (
                <div className="flex items-center justify-center text-green-600">
                  <span className="mr-2">✅</span>
                  พร้อมสร้างงานแล้ว
                </div>
              )}
            </div>
          </div>
        </form>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">การดำเนินการอย่างรวดเร็ว</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/search"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              ค้นหางาน
            </Link>
            <Link
              href="/my-tasks"
              className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium"
            >
              งานของฉัน
            </Link>
            <Link
              href="/profile"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              โปรไฟล์
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
