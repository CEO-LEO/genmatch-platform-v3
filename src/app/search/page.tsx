'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Users, 
  Heart,
  Star
} from 'lucide-react';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const categories = [
    { id: 'all', name: 'ทั้งหมด', icon: '🌟' },
    { id: 'hospital', name: 'โรงพยาบาล', icon: '🏥' },
    { id: 'temple', name: 'วัด', icon: '🕍' },
    { id: 'exercise', name: 'ออกกำลังกาย', icon: '💪' },
    { id: 'repair', name: 'ซ่อมแซม', icon: '🔧' }
  ];

  const locations = [
    { id: 'all', name: 'ทุกที่' },
    { id: 'bangkok', name: 'กรุงเทพมหานคร' },
    { id: 'chiangmai', name: 'เชียงใหม่' },
    { id: 'phuket', name: 'ภูเก็ต' },
    { id: 'pattaya', name: 'พัทยา' }
  ];

  const mockTasks = [
    {
      id: '1',
      title: 'ช่วยเหลือผู้สูงอายุที่โรงพยาบาล',
      description: 'ช่วยดูแลผู้ป่วยสูงอายุ ให้น้ำ อาหาร และพูดคุย',
      category: 'hospital',
      location: 'กรุงเทพมหานคร',
      date: '25 ส.ค. 2568',
      time: '09:00',
      maxVolunteers: 2,
      currentVolunteers: 1,
      rating: 4.8,
      urgent: true
    },
    {
      id: '2',
      title: 'ทำความสะอาดวัด',
      description: 'ช่วยทำความสะอาดบริเวณวัดและจัดดอกไม้',
      category: 'temple',
      location: 'เชียงใหม่',
      date: '26 ส.ค. 2568',
      time: '08:00',
      maxVolunteers: 5,
      currentVolunteers: 3,
      rating: 4.6,
      urgent: false
    },
    {
      id: '3',
      title: 'สอนคอมพิวเตอร์ให้ผู้สูงอายุ',
      description: 'สอนการใช้คอมพิวเตอร์และอินเทอร์เน็ตพื้นฐาน',
      category: 'repair',
      location: 'กรุงเทพมหานคร',
      date: '27 ส.ค. 2568',
      time: '14:00',
      maxVolunteers: 3,
      currentVolunteers: 0,
      rating: 4.9,
      urgent: false
    }
  ];

  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || task.location.includes(selectedLocation);
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

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
        {/* Search Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">ค้นหางานจิตอาสา</h2>
          <p className="text-gray-600">ค้นหางานที่เหมาะกับคุณและเริ่มต้นการเป็นจิตอาสา</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหางานจิตอาสา..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors text-lg"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              ตัวกรอง
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">หมวดหมู่</label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        selectedCategory === category.id
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-1">{category.icon}</div>
                        <div className="text-sm font-medium">{category.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">สถานที่</label>
                <div className="space-y-2">
                  {locations.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => setSelectedLocation(location.id)}
                      className={`w-full p-3 rounded-lg border-2 transition-colors text-left ${
                        selectedLocation === location.id
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-4 h-4" />
                        <span>{location.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              ผลการค้นหา ({filteredTasks.length} รายการ)
            </h3>
            <button className="px-4 py-2 text-purple-600 hover:text-purple-700 font-medium">
              ล้างตัวกรอง
            </button>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบงานที่ค้นหา</h3>
              <p className="text-gray-600">ลองเปลี่ยนคำค้นหาหรือตัวกรองดูครับ</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div key={task.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{task.title}</h4>
                        {task.urgent && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">
                            ด่วน
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">{task.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{task.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{task.date} {task.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{task.currentVolunteers}/{task.maxVolunteers} คน</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{task.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">หมวดหมู่:</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                        {categories.find(c => c.id === task.category)?.name}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                      <Link
                        href={`/task/${task.id}`}
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                      >
                        ดูรายละเอียด
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
