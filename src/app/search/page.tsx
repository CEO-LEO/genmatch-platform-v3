'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, Clock, User, Heart, Filter, Calendar, Users } from 'lucide-react';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: 'hospital', name: 'โรงพยาบาล', icon: '🏥', color: 'bg-red-100 text-red-700' },
    { id: 'temple', name: 'วัด', icon: '🏛️', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'exercise', name: 'ออกกำลังกาย', icon: '💪', color: 'bg-green-100 text-green-700' },
    { id: 'repair', name: 'งานซ่อม', icon: '🔧', color: 'bg-blue-100 text-blue-700' },
    { id: 'cleaning', name: 'ทำความสะอาด', icon: '🧹', color: 'bg-purple-100 text-purple-700' },
    { id: 'education', name: 'การศึกษา', icon: '📚', color: 'bg-indigo-100 text-indigo-700' }
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'ACCEPTED': return 'bg-blue-100 text-blue-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING': return 'รอจิตอาสา';
      case 'ACCEPTED': return 'มีจิตอาสารับแล้ว';
      case 'COMPLETED': return 'เสร็จสิ้น';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">GM</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">GenMatch</h1>
                <p className="text-sm text-gray-600">ค้นหางานจิตอาสา</p>
              </div>
            </div>
            <Link 
              href="/"
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">ค้นหางานจิตอาสา</h2>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ค้นหางานจิตอาสา..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center space-x-2"
              >
                <Search className="h-5 w-5" />
                <span>ค้นหา</span>
              </button>
            </div>
          </form>

          {/* Filters */}
          <div className="space-y-4">
            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                ประเภทงาน
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleCategoryChange(category.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedCategory === category.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-1">{category.icon}</div>
                      <div className="text-sm font-medium text-gray-700">{category.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Locations */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                สถานที่
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {locations.map((location) => (
                  <button
                    key={location}
                    type="button"
                    onClick={() => handleLocationChange(location)}
                    className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
                      selectedLocation === location
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-sm font-medium text-gray-700">{location}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">ผลการค้นหา</h3>
            <div className="text-sm text-gray-600">
              พบ {tasks.length} งาน
            </div>
          </div>
          
          {isLoading && (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">กำลังค้นหางาน...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <div className="text-red-500 mb-4">❌</div>
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {tasks.length === 0 && !isLoading && !error && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">🔍</div>
              <p className="text-gray-600">ไม่พบงานที่ตรงกับเงื่อนไขที่คุณค้นหา</p>
            </div>
          )}

          {/* Task Results */}
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-xl font-semibold text-gray-900">{task.title}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {getStatusText(task.status)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{task.description}</p>
                  </div>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{task.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{task.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{task.startTime} - {task.endTime}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">ต้องการ {task.maxVolunteers} คน</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {task.firstName} {task.lastName}
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
