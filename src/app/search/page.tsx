'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, Clock, User, Heart } from 'lucide-react';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: 'hospital', name: 'โรงพยาบาล', icon: '🏥' },
    { id: 'temple', name: 'วัด', icon: '🏛️' },
    { id: 'exercise', name: 'ออกกำลังกาย', icon: '💪' },
    { id: 'repair', name: 'งานซ่อม', icon: '🔧' },
    { id: 'cleaning', name: 'ทำความสะอาด', icon: '🧹' },
    { id: 'education', name: 'การศึกษา', icon: '📚' }
  ];

  const locations = [
    'กรุงเทพมหานคร', 'เชียงใหม่', 'ภูเก็ต', 'พัทยา', 'หาดใหญ่', 'นครราชสีมา'
  ];

  // Fetch tasks from API
  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedLocation) params.append('location', selectedLocation);
      
      const response = await fetch(`/api/tasks?${params.toString()}`);
      const data = await response.json();
      
      if (response.ok) {
        setTasks(data.tasks || []);
      } else {
        setError(data.error || 'เกิดข้อผิดพลาดในการดึงข้อมูล');
      }
    } catch (error) {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
      setIsLoading(false);
    }
  };

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTasks();
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? '' : categoryId);
  };

  const handleLocationChange = (location: string) => {
    setSelectedLocation(selectedLocation === location ? '' : location);
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">ค้นหางานจิตอาสา</h2>
          <p className="text-gray-600">ค้นหางานจิตอาสาที่เหมาะสมกับคุณ</p>
        </div>

        {/* Search Form */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Search Input */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                ค้นหางาน
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="ค้นหางานจิตอาสา..."
                />
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  หมวดหมู่งาน
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => handleCategoryChange(category.id)}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        selectedCategory === category.id
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300'
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

              {/* Locations */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  สถานที่
                </label>
                <div className="space-y-2">
                  {locations.map((location) => (
                    <button
                      key={location}
                      type="button"
                      onClick={() => handleLocationChange(location)}
                      className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                        selectedLocation === location
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {location}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              ค้นหา
            </button>
          </form>
        </div>

        {/* Search Results */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">ผลการค้นหา</h3>
          
          {isLoading && <p>กำลังค้นหางาน...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {tasks.length === 0 && !isLoading && !error && (
            <p>ไม่พบงานที่ตรงกับเงื่อนไขที่คุณค้นหา</p>
          )}

          {tasks.map((task) => (
            <div key={task.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{task.title}</h4>
                  <p className="text-gray-600 mb-3">{task.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {task.location} ({task.distance})
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {task.time} ({task.duration})
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm text-gray-500">โดย</div>
                    <div className="font-medium text-gray-900">{task.user}</div>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                    {task.avatar}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  {task.category}
                </span>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <Link
                    href={`/task/${task.id}`}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                  >
                    ดูรายละเอียด
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">การดำเนินการอย่างรวดเร็ว</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/add-task"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              สร้างงานใหม่
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
