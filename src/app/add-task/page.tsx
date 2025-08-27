'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Calendar, Clock, Users, Tag, Phone } from 'lucide-react';

export default function AddTaskPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    date: '',
    startTime: '',
    endTime: '',
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
    
    setIsLoading(true);
    setMessage(null);

    try {
      // Get user info from localStorage (if logged in)
      const userStr = localStorage.getItem('user');
      let creatorId = 1; // Default for demo
      
      if (userStr) {
        const user = JSON.parse(userStr);
        creatorId = user.id;
      }

      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          creatorId
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        // Reset form
        setFormData({
          title: '',
          description: '',
          category: '',
          location: '',
          date: '',
          startTime: '',
          endTime: '',
          tags: '',
          contactName: '',
          contactPhone: '',
          contactEmail: ''
        });
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'เกิดข้อผิดพลาดในการเชื่อมต่อ' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
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
              disabled={isLoading}
              className={`px-12 py-4 text-white text-lg font-bold rounded-xl transition-all duration-200 transform hover:scale-105 ${
                isLoading 
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
