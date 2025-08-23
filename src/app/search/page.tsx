'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Search as SearchIcon,
  Filter,
  MapPin,
  Calendar,
  Clock,
  Users,
  Building,
  Wrench,
  Heart,
  Star
} from 'lucide-react';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Mock data for search results
  const searchResults = [
    {
      id: '1',
      title: 'พาไปตรวจสุขภาพที่โรงพยาบาล',
      description: 'ต้องการจิตอาสาพาไปตรวจสุขภาพที่โรงพยาบาลมหิดล ตรวจความดันและน้ำตาลในเลือด',
      category: 'hospital',
      location: 'โรงพยาบาลมหิดล',
      date: '2024-03-15',
      time: '09:00',
      maxVolunteers: 2,
      currentVolunteers: 1,
      categoryName: 'โรงพยาบาล',
      categoryColor: 'bg-red-500',
      creator: 'คุณยายสมศรี',
      rating: 4.8,
      urgent: true
    },
    {
      id: '2',
      title: 'ช่วยติดตั้งคอมพิวเตอร์',
      description: 'ต้องการความช่วยเหลือในการติดตั้งคอมพิวเตอร์และโปรแกรมพื้นฐาน',
      category: 'repair',
      location: 'บ้านพัก ถนนสุขุมวิท',
      date: '2024-03-20',
      time: '14:00',
      maxVolunteers: 1,
      currentVolunteers: 0,
      categoryName: 'งานซ่อมแซม',
      categoryColor: 'bg-blue-500',
      creator: 'คุณลุงประยุทธ',
      rating: 4.5,
      urgent: false
    },
    {
      id: '3',
      title: 'กิจกรรมจิตอาสาในวัด',
      description: 'ช่วยจัดกิจกรรมวันสำคัญของวัด จัดเตรียมสถานที่และอุปกรณ์',
      category: 'temple',
      location: 'วัดพระศรีมหาธาตุ',
      date: '2024-03-25',
      time: '08:00',
      maxVolunteers: 3,
      currentVolunteers: 1,
      categoryName: 'วัด',
      categoryColor: 'bg-yellow-500',
      creator: 'พระอาจารย์',
      rating: 4.9,
      urgent: false
    },
    {
      id: '4',
      title: 'ช่วยสอนหนังสือเด็ก',
      description: 'ต้องการจิตอาสาช่วยสอนหนังสือเด็กประถม วิชาคณิตศาสตร์และภาษาไทย',
      category: 'education',
      location: 'โรงเรียนวัดสระแก้ว',
      date: '2024-03-18',
      time: '15:00',
      maxVolunteers: 2,
      currentVolunteers: 0,
      categoryName: 'การศึกษา',
      categoryColor: 'bg-purple-500',
      creator: 'คุณครูสมศรี',
      rating: 4.7,
      urgent: false
    }
  ];

  const categories = [
    { id: 'all', name: 'ทั้งหมด', color: 'bg-gray-500' },
    { id: 'hospital', name: 'โรงพยาบาล', color: 'bg-red-500' },
    { id: 'temple', name: 'วัด', color: 'bg-yellow-500' },
    { id: 'physical', name: 'งานใช้แรงกาย', color: 'bg-green-500' },
    { id: 'repair', name: 'งานซ่อมแซม', color: 'bg-blue-500' },
    { id: 'education', name: 'การศึกษา', color: 'bg-purple-500' }
  ];

  const locations = [
    { id: 'all', name: 'ทุกที่' },
    { id: 'bangkok', name: 'กรุงเทพมหานคร' },
    { id: 'nonthaburi', name: 'นนทบุรี' },
    { id: 'pathum-thani', name: 'ปทุมธานี' },
    { id: 'samut-prakan', name: 'สมุทรปราการ' }
  ];

  const filteredResults = searchResults.filter(task => {
    const matchesSearch = searchQuery === '' || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || task.location.includes(locations.find(l => l.id === selectedLocation)?.name || '');
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-3">
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900">ค้นหางานจิตอาสา</h1>
            <p className="text-sm text-gray-500">ค้นหางานที่เหมาะกับคุณ</p>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหางานจิตอาสา..."
            className="w-full pl-10 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-200 transition-all duration-200"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        {/* Categories */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">หมวดหมู่</h3>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <div className={`w-3 h-3 ${category.color} rounded-full`}></div>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">สถานที่</h3>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => setSelectedLocation(location.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedLocation === location.id
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {location.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <main className="px-4 py-6 pb-24">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            ผลการค้นหา ({filteredResults.length})
          </h2>
          <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 hover:bg-gray-200 transition-colors">
            <Filter className="w-4 h-4" />
            <span>เรียงลำดับ</span>
          </button>
        </div>

        {filteredResults.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SearchIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบงานที่ค้นหา</h3>
            <p className="text-gray-500">ลองเปลี่ยนคำค้นหาหรือตัวกรอง</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredResults.map((task) => (
              <div key={task.id} className="bg-white rounded-xl p-6 shadow-sm">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${task.categoryColor} rounded-lg flex items-center justify-center`}>
                      <span className="text-white text-sm font-bold">
                        {task.categoryName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{task.title}</h3>
                        {task.urgent && (
                          <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full font-medium">
                            เร่งด่วน
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{task.categoryName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{task.rating}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-4">{task.description}</p>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{task.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(task.date).toLocaleDateString('th-TH')}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{task.time}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{task.currentVolunteers}/{task.maxVolunteers}</span>
                  </div>
                </div>

                {/* Creator */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-sm font-medium">
                        {task.creator.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">{task.creator}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    <Heart className="w-4 h-4 inline mr-2" />
                    บันทึก
                  </button>
                  <Link
                    href={`/task/${task.id}`}
                    className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors text-center"
                  >
                    ดูรายละเอียด
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
