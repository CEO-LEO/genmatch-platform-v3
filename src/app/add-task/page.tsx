'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Plus, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Tag,
  FileText
} from 'lucide-react';

export default function AddTaskPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'hospital',
    location: '',
    date: '',
    time: '',
    maxVolunteers: 1,
    requirements: '',
    contactInfo: ''
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const categories = [
    { id: 'hospital', name: 'โรงพยาบาล', icon: '🏥' },
    { id: 'temple', name: 'วัด', icon: '🕍' },
    { id: 'exercise', name: 'ออกกำลังกาย', icon: '💪' },
    { id: 'repair', name: 'ซ่อมแซม', icon: '🔧' },
    { id: 'education', name: 'การศึกษา', icon: '📚' },
    { id: 'environment', name: 'สิ่งแวดล้อม', icon: '🌱' }
  ];

  const availableTags = [
    'ด่วน', 'ต้องการความช่วยเหลือ', 'เหมาะสำหรับนักศึกษา', 'เหมาะสำหรับผู้สูงอายุ',
    'งานกลางแจ้ง', 'งานในร่ม', 'ต้องการทักษะพิเศษ', 'ไม่ต้องการประสบการณ์'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement task creation logic
    console.log('Create Task:', { ...formData, tags: selectedTags });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-white">GM</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-gray-900">GenMatch</h1>
                <div className="text-sm text-gray-600 leading-tight">
                  <span>Generation</span><br/>
                  <span>Matching</span>
                </div>
              </div>
            </div>
            
            {/* Back Button */}
            <Link 
              href="/"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>กลับหน้าหลัก</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">สร้างงานจิตอาสาใหม่</h2>
            <p className="text-gray-600">สร้างงานที่ต้องการความช่วยเหลือจากจิตอาสา</p>
          </div>

          {/* Task Creation Form */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-purple-600" />
                  ข้อมูลพื้นฐาน
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ชื่องาน *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="เช่น ช่วยเหลือผู้สูงอายุที่โรงพยาบาล"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    รายละเอียด *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="อธิบายรายละเอียดของงานที่ต้องการความช่วยเหลือ"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    หมวดหมู่ *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Location and Time */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                  สถานที่และเวลา
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    สถานที่ *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="เช่น โรงพยาบาลมหาราช, กรุงเทพมหานคร"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      วันที่ *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      เวลา *
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Requirements and Volunteers */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-purple-600" />
                  ความต้องการและจิตอาสา
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    จำนวนจิตอาสาที่ต้องการ *
                  </label>
                  <input
                    type="number"
                    name="maxVolunteers"
                    value={formData.maxVolunteers}
                    onChange={handleChange}
                    required
                    min="1"
                    max="50"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ความต้องการพิเศษ
                  </label>
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="เช่น ต้องการผู้ที่มีประสบการณ์, ต้องการผู้ที่พูดภาษาอังกฤษได้"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Tag className="w-5 h-5 mr-2 text-purple-600" />
                  แท็ก
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`p-3 rounded-lg border-2 transition-colors text-sm ${
                        selectedTags.includes(tag)
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-purple-600" />
                  ข้อมูลติดต่อ
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ข้อมูลติดต่อเพิ่มเติม
                  </label>
                  <textarea
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="เช่น เบอร์โทร, อีเมล, หรือข้อมูลอื่นๆ ที่จิตอาสาสามารถติดต่อได้"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors shadow-lg"
                >
                  สร้างงานจิตอาสา
                </button>
              </div>
            </form>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 text-center">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">การดำเนินการด่วน</h3>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/search"
                  className="bg-white text-purple-600 border-2 border-purple-600 px-6 py-3 rounded-full font-medium hover:bg-purple-50 transition-colors"
                >
                  ค้นหางาน
                </Link>
                <Link
                  href="/my-tasks"
                  className="bg-white text-purple-600 border-2 border-purple-600 px-6 py-3 rounded-full font-medium hover:bg-purple-50 transition-colors"
                >
                  งานของฉัน
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
