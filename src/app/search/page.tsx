'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Clock, User, Filter, Calendar, Users } from 'lucide-react';

export default function SearchPage() {
  const { user } = useAuth();
  const router = useRouter();
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
    { id: 'repair', name: 'งานซ่อม', icon: '🔧', color: 'bg-blue-100 text-blue-700' }
  ];

  const locations = [
    'กรุงเทพมหานคร', 'เชียงใหม่', 'ภูเก็ต', 'พัทยา', 'หาดใหญ่', 'นครราชสีมา'
  ];

  // Fetch tasks from API
  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // For demo purposes, use mock data that simulates real tasks
      // In production, this would fetch from the actual API
      const mockTasks = [
                 {
           id: 1,
           title: 'ช่วยพาออกกำลังกาย',
           description: 'ช่วยพาออกกำลังกายที่สวนสุขภาพ ต้องการจิตอาสาที่มีประสบการณ์ในการดูแลผู้สูงอายุ',
           category: 'exercise',
           location: 'กรุงเทพมหานคร',
           date: '25 ส.ค. 2568',
           startTime: '09:00',
           endTime: '11:00',
           status: 'PENDING',
           firstName: 'ทอง',
           lastName: 'ใจดี',
           creatorPhone: '0829151870',
           tags: 'ออกกำลังกาย, ผู้สูงอายุ, สุขภาพ'
         },
                 {
           id: 2,
           title: 'งานซ่อมแซมบ้าน',
           description: 'ต้องการช่วยซ่อมแซมบ้านหลังเล็ก งานไม่หนัก ต้องการจิตอาสาที่มีทักษะการซ่อมแซม',
           category: 'repair',
           location: 'เชียงใหม่',
           date: '26 ส.ค. 2568',
           startTime: '14:00',
           endTime: '17:00',
           status: 'PENDING',
           firstName: 'สมชาย',
           lastName: 'รักดี',
           creatorPhone: '0812345678',
           tags: 'งานซ่อม, บ้าน, ช่วยเหลือ'
         },
                 {
           id: 3,
           title: 'ช่วยจัดงานบุญที่วัด',
           description: 'ช่วยจัดงานบุญประจำปี ต้องการจิตอาสาในการจัดเตรียมสถานที่และดูแลผู้เข้าร่วมงาน',
           category: 'temple',
           location: 'ภูเก็ต',
           date: '27 ส.ค. 2568',
           startTime: '08:00',
           endTime: '12:00',
           status: 'PENDING',
           firstName: 'ลุงปู่',
           lastName: 'ใจบุญ',
           creatorPhone: '0898765432',
           tags: 'วัด, งานบุญ, จัดงาน'
         },
         {
           id: 4,
           title: 'ช่วยดูแลผู้ป่วยในโรงพยาบาล',
           description: 'ช่วยดูแลผู้ป่วยสูงอายุในโรงพยาบาล งานไม่หนัก ต้องการจิตอาสาที่มีใจรักในการช่วยเหลือ',
           category: 'hospital',
           location: 'พัทยา',
           date: '28 ส.ค. 2568',
           startTime: '10:00',
           endTime: '16:00',
           status: 'PENDING',
           firstName: 'คุณยาย',
           lastName: 'ใจดี',
           creatorPhone: '0854321098',
           tags: 'โรงพยาบาล, ผู้ป่วย, ดูแล'
         }
      ];

      // Filter tasks based on search criteria
      let filteredTasks = mockTasks;

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredTasks = filteredTasks.filter(task => 
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query) ||
          task.tags.toLowerCase().includes(query)
        );
      }

      if (selectedCategory) {
        filteredTasks = filteredTasks.filter(task => task.category === selectedCategory);
      }

      if (selectedLocation) {
        filteredTasks = filteredTasks.filter(task => 
          task.location.includes(selectedLocation)
        );
      }

      setTasks(filteredTasks);
      
    } catch (error) {
      setError('เกิดข้อผิดพลาดในการดึงข้อมูล');
    } finally {
      setIsLoading(false);
    }
  };

  // Load tasks on component mount - Show all tasks by default
  useEffect(() => {
    fetchTasks();
  }, [searchQuery, selectedCategory, selectedLocation]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTasks();
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? '' : categoryId);
    // fetchTasks will be triggered automatically by useEffect
  };

  const handleLocationChange = (location: string) => {
    setSelectedLocation(selectedLocation === location ? '' : location);
    // fetchTasks will be triggered automatically by useEffect
  };

  const handleJoinTask = async (taskId: string, taskTitle: string) => {
    if (!user) {
      alert('กรุณาเข้าสู่ระบบก่อนสมัครเข้าร่วมงาน');
      router.push('/login');
      return;
    }

    const confirmJoin = window.confirm(`คุณต้องการสมัครเข้าร่วมงาน "${taskTitle}" ใช่หรือไม่?`);
    if (!confirmJoin) return;

    try {
      // Call API to join task
      const response = await fetch(`/api/tasks/${taskId}/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          userId: user.id
        })
      });

      if (response.ok) {
        alert('🎉 สมัครเข้าร่วมงานสำเร็จ!\n\nคุณสามารถดูงานในหน้า "งานของฉัน" ได้');
        // Optionally refresh tasks to update status
        fetchTasks();
      } else {
        const errorData = await response.json();
        alert(`❌ เกิดข้อผิดพลาด: ${errorData.error || 'ไม่สามารถสมัครเข้าร่วมงานได้'}`);
      }
    } catch (error) {
      console.error('Error joining task:', error);
      alert('❌ เกิดข้อผิดพลาดในการเชื่อมต่อ\n\nกรุณาลองใหม่อีกครั้ง');
    }
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
              <Link href="/dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">GM</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">GenMatch</h1>
                  <p className="text-sm text-gray-600">ค้นหางานจิตอาสา</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <Link 
                href="/add-task"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                สร้างงานใหม่
              </Link>
              <Link 
                href="/dashboard"
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                กลับแดชบอร์ด
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">ค้นหางานจิตอาสา</h2>
          <p className="text-gray-600 mb-6">เลือกประเภทงานหรือสถานที่เพื่อค้นหางานที่สนใจ หรือดูงานทั้งหมดด้านล่าง</p>
          
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
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleCategoryChange(category.id)}
                    className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                      selectedCategory === category.id
                        ? 'border-purple-500 bg-purple-50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{category.icon}</div>
                      <div className="text-sm font-semibold text-gray-700">{category.name}</div>
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
                    className={`w-full p-3 text-center rounded-lg border-2 transition-all hover:shadow-md ${
                      selectedLocation === location
                        ? 'border-purple-500 bg-purple-50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="text-sm font-medium text-gray-700">{location}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

                  {/* Active Filters */}
          {(selectedCategory || selectedLocation || searchQuery) && (
            <div className="bg-purple-50 rounded-xl p-4 mb-6">
              <h4 className="text-sm font-semibold text-purple-900 mb-2">ตัวกรองที่เลือก:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedCategory && (
                  <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-medium">
                    {categories.find(c => c.id === selectedCategory)?.name}
                  </span>
                )}
                {selectedLocation && (
                  <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
                    📍 {selectedLocation}
                  </span>
                )}
                {searchQuery && (
                  <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-medium">
                    🔍 "{searchQuery}"
                  </span>
                )}
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setSelectedLocation('');
                    setSearchQuery('');
                    fetchTasks();
                  }}
                  className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  ✕ ล้างทั้งหมด
                </button>
              </div>
            </div>
          )}

          {/* Results Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              {(selectedCategory || selectedLocation || searchQuery) ? 'ผลการค้นหา' : 'งานจิตอาสาทั้งหมด'}
            </h3>
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
              <div key={task.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className="text-xl font-semibold text-gray-900">{task.title}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {getStatusText(task.status)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">{task.description}</p>
                    
                    {/* Tags */}
                    {task.tags && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {task.tags.split(',').map((tag: string, index: number) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600 p-2 bg-gray-50 rounded-lg">
                    <MapPin className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium">{task.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 p-2 bg-gray-50 rounded-lg">
                    <Calendar className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium">{task.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 p-2 bg-gray-50 rounded-lg">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium">{task.startTime} - {task.endTime}</span>
                  </div>
                                     <div className="flex items-center space-x-2 text-gray-600 p-2 bg-gray-50 rounded-lg">
                     <Users className="h-4 w-4 text-purple-600" />
                     <span className="text-sm font-medium">งานจิตอาสา</span>
                   </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {task.firstName?.charAt(0)}{task.lastName?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {task.firstName} {task.lastName}
                      </div>
                      <div className="text-xs text-gray-500">
                        เบอร์โทร: {task.creatorPhone}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      href={`/task/${task.id}`}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                    >
                      ดูรายละเอียด
                    </Link>
                    <button 
                      onClick={() => handleJoinTask(task.id, task.title)}
                      className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium hover:bg-purple-600 hover:text-white"
                    >
                      สมัครเข้าร่วม
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
