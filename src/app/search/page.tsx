'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Star, 
  ChevronRight,
  ArrowLeft,
  SlidersHorizontal,
  X,
  Building,
  Globe,
  Wrench
} from 'lucide-react'

export default function SearchPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  
  const [searchQuery, setSearchQuery] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(category || '')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedDate, setSelectedDate] = useState('')

  // Mock tasks data
  const tasks = [
    {
      id: 1,
      title: 'ช่วยซื้อของที่ซุปเปอร์มาร์เก็ต',
      description: 'ต้องการคนช่วยซื้อของที่ซุปเปอร์มาร์เก็ตใกล้บ้าน',
      category: 'shopping',
      location: 'กรุงเทพมหานคร',
      date: '2024-01-25',
      time: '14:00',
      duration: 2,
      budget: 200,
      rating: 4.8,
      urgent: true
    },
    {
      id: 2,
      title: 'ช่วยติดตั้งคอมพิวเตอร์',
      description: 'ต้องการคนช่วยติดตั้งคอมพิวเตอร์และโปรแกรมพื้นฐาน',
      category: 'repair',
      location: 'กรุงเทพมหานคร',
      date: '2024-01-26',
      time: '10:00',
      duration: 3,
      budget: 500,
      rating: 4.5,
      urgent: false
    },
    {
      id: 3,
      title: 'ช่วยพาไปตรวจสุขภาพ',
      description: 'ต้องการคนพาไปโรงพยาบาลเพื่อตรวจสุขภาพประจำปี',
      category: 'hospital',
      location: 'กรุงเทพมหานคร',
      date: '2024-01-27',
      time: '09:00',
      duration: 4,
      budget: 300,
      rating: 4.9,
      urgent: false
    }
  ]

  const categories = [
    { id: 'elderly-care', name: 'การดูแลผู้สูงอายุ', icon: <Users className="w-5 h-5" />, color: 'bg-blue-500' },
    { id: 'education', name: 'การศึกษา', icon: <GraduationCap className="w-5 h-5" />, color: 'bg-green-500' },
    { id: 'exercise', name: 'ออกกำลังกาย', icon: <TrendingUp className="w-5 h-5" />, color: 'bg-green-500' },
    { id: 'household', name: 'งานบ้าน', icon: <Building className="w-5 h-5" />, color: 'bg-purple-500' },
    { id: 'shopping', name: 'ซื้อของ', icon: <Globe className="w-5 h-5" />, color: 'bg-purple-500' },
    { id: 'repair', name: 'งานซ่อม', icon: <Wrench className="w-5 h-5" />, color: 'bg-orange-500' }
  ]

  const locations = ['กรุงเทพมหานคร', 'นนทบุรี', 'ปทุมธานี', 'สมุทรปราการ', 'นครปฐม']

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  if (!user) {
    router.push('/login')
    return null
  }

  const filteredTasks = tasks.filter(task => {
    if (selectedCategory && task.category !== selectedCategory) return false
    if (selectedLocation && task.location !== selectedLocation) return false
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">ค้นหางาน</h1>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ค้นหางานที่ต้องการ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
              isFilterOpen 
                ? 'border-indigo-500 bg-indigo-50 text-indigo-600' 
                : 'border-gray-300 text-gray-600 hover:border-indigo-300'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-sm font-medium">ตัวกรอง</span>
          </button>
          
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory('')}
              className="flex items-center space-x-2 px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm"
            >
              <span>{categories.find(c => c.id === selectedCategory)?.name}</span>
              <X className="w-4 h-4" />
            </button>
          )}
          
          {selectedLocation && (
            <button
              onClick={() => setSelectedLocation('')}
              className="flex items-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm"
            >
              <span>{selectedLocation}</span>
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="mt-4 space-y-4">
            {/* Categories */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">หมวดหมู่</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(selectedCategory === cat.id ? '' : cat.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      selectedCategory === cat.id
                        ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${cat.color}`}></div>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">ตำแหน่ง</h3>
              <div className="flex flex-wrap gap-2">
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setSelectedLocation(selectedLocation === loc ? '' : loc)}
                    className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      selectedLocation === loc
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            ผลการค้นหา ({filteredTasks.length})
          </h2>
          <button className="text-sm text-indigo-600">เรียงลำดับ</button>
        </div>

        {/* Task Cards */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <Link
              key={task.id}
              href={`/task/${task.id}`}
              className="block bg-white rounded-2xl p-4 shadow-sm border border-gray-100 active:scale-95 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    categories.find(c => c.id === task.category)?.color || 'bg-gray-500'
                  }`}></div>
                  <span className="text-sm text-gray-600">
                    {categories.find(c => c.id === task.category)?.name}
                  </span>
                </div>
                {task.urgent && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                    ด่วน
                  </span>
                )}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{task.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{task.description}</p>

              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{task.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{task.duration} ชม.</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-700">{task.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">฿{task.budget}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </Link>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบงานที่ค้นหา</h3>
            <p className="text-gray-500">ลองเปลี่ยนคำค้นหาหรือตัวกรองดูครับ</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation Placeholder */}
      <div className="h-20"></div>
    </div>
  )
}
