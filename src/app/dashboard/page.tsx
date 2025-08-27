'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  User, 
  LogOut, 
  Bell, 
  Settings, 
  Search, 
  Plus, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Star, 
  MessageCircle,
  Home,
  ChevronRight,
  Menu,
  X,
  Building,
  Wrench,
  Globe,
  Users,
  TrendingUp,
  Award,
  BarChart3,
  CheckSquare,
  MessageSquare,
  Image,
  Shield
} from 'lucide-react'
import LogoIcon from '@/components/LogoIcon'

export default function DashboardPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('home')

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // หมวดหม่งานตาม Figma prototype - Mobile Optimized
  const serviceCategories = [
    {
      id: 'hospital',
      title: 'โรงพยาบาล',
      description: 'ช่วยเหลือในโรงพยาบาล',
      icon: <Building className="w-8 h-8 text-white" />,
      bgColor: 'bg-gradient-to-br from-red-500 to-red-600',
      href: '/search?category=hospital',
      emoji: '🏥'
    },
    {
      id: 'temple',
      title: 'วัด',
      description: 'กิจกรรมจิตอาสาในวัด',
      icon: <Globe className="w-8 h-8 text-white" />,
      bgColor: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
      href: '/search?category=temple',
      emoji: '🏛️'
    },
    {
      id: 'exercise',
      title: 'ออกกำลังกาย',
      description: 'กิจกรรมออกกำลังกาย',
      icon: <Users className="w-8 h-8 text-white" />,
      bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
      href: '/search?category=exercise',
      emoji: '💪'
    },
    {
      id: 'repair',
      title: 'งานซ่อม',
      description: 'งานซ่อมแซมและปรับปรุง',
      icon: <Wrench className="w-8 h-8 text-white" />,
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
      href: '/search?category=repair',
      emoji: '🔧'
    }
  ]

  const quickActions = [
    {
      title: 'ค้นหางาน',
      description: 'หางานจิตอาสาที่เหมาะสม',
      icon: <Search className="w-8 h-8 text-white" />,
      color: 'bg-blue-500',
      href: '/search'
    },
    {
      title: 'เพิ่มงาน',
      description: 'สร้างงานใหม่สำหรับจิตอาสา',
      icon: <Plus className="w-8 h-8 text-white" />,
      color: 'bg-green-500',
      href: '/add-task'
    },
    {
      title: 'แชท',
      description: 'ติดต่อกับผู้ใช้คนอื่น',
      icon: <MessageCircle className="w-8 h-8 text-white" />,
      color: 'bg-purple-500',
      href: '/chat'
    },
    {
      title: 'โปรไฟล์',
      description: 'จัดการข้อมูลส่วนตัว',
      icon: <User className="w-8 h8 text-white" />,
      color: 'bg-orange-500',
      href: '/profile'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Status Bar (Mobile) */}
      <div className="bg-white px-4 py-3 text-sm text-gray-600 text-center border-b border-gray-100">
        <div className="flex items-center justify-between">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Location Header - Mobile Optimized */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MapPin className="w-6 h-6 text-indigo-600" />
            <div>
              <span className="text-lg font-semibold text-gray-800">กรุงเทพมหานคร</span>
              <div className="text-xs text-gray-500">ตำแหน่งปัจจุบัน</div>
            </div>
          </div>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{user.firstName} {user.lastName}</div>
                  <div className="text-sm text-gray-500">{user.userType === 'STUDENT' ? 'นักศึกษา' : 'ผู้สูงอายุ'}</div>
                  <div className="text-xs text-gray-400">{user.phone}</div>
                </div>
              </div>
              
              <nav className="space-y-2">
                <Link href="/profile" className="flex items-center p-3 rounded-lg hover:bg-gray-100">
                  <User className="w-5 h-5 mr-3" />
                  โปรไฟล์
                </Link>
                <Link href="/settings" className="flex items-center p-3 rounded-lg hover:bg-gray-100">
                  <Settings className="w-5 h-5 mr-3" />
                  ตั้งค่า
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full p-3 rounded-lg hover:bg-red-50 text-red-600"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  ออกจากระบบ
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Mobile Optimized */}
      <main className="px-4 py-6 space-y-6">
        {/* Welcome Section - Mobile Friendly */}
        <div className="text-center bg-white rounded-2xl p-6 shadow-sm">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">
              {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
            </span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            ยินดีต้อนรับ, {user.firstName}!
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            {user.userType === 'STUDENT' 
              ? 'คุณเป็นนักศึกษาที่สามารถรับงานอาสาเพื่อช่วยเหลือผู้สูงอายุและสังคม'
              : 'คุณเป็นผู้สูงอายุที่สามารถสร้างงานอาสาเพื่อให้นักศึกษาได้ช่วยเหลือ'
            }
          </p>
          <div className="mt-3 text-xs text-gray-500">
            เบอร์โทร: {user.phone}
          </div>
        </div>

        {/* Service Categories Grid - Mobile Optimized */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 px-2">
            หมวดหม่งานจิตอาสา
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {serviceCategories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className={`${category.bgColor} rounded-2xl p-5 text-center text-white shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 touch-manipulation`}
              >
                <div className="text-3xl mb-3">{category.emoji}</div>
                <h3 className="text-base font-bold mb-2">{category.title}</h3>
                <p className="text-xs text-white/90 leading-tight mb-3">{category.description}</p>
                <div className="flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 text-white/80" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Stats - Mobile Optimized */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลผู้ใช้</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-indigo-50 rounded-xl">
              <div className="text-2xl font-bold text-indigo-600">{user.userType === 'STUDENT' ? 'นักศึกษา' : 'ผู้สูงอายุ'}</div>
              <div className="text-xs text-gray-600">ประเภทผู้ใช้</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">{user.phone}</div>
              <div className="text-xs text-gray-600">เบอร์โทร</div>
            </div>
          </div>
        </div>

        {/* Recent Activity - Mobile Optimized */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">กิจกรรมล่าสุด</h3>
            <Link href="/notifications" className="text-sm text-indigo-600">ดูทั้งหมด</Link>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl active:bg-gray-100 transition-colors">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">งานเสร็จสิ้น</p>
                <p className="text-xs text-gray-500">เมื่อ 2 ชั่วโมงที่แล้ว</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl active:bg-gray-100 transition-colors">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">ข้อความใหม่</p>
                <p className="text-xs text-gray-500">เมื่อ 1 วันที่แล้ว</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Quick Actions - Mobile Optimized */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">การดำเนินการด่วน</h3>
          <div className="space-y-3">
            {user.userType === 'ELDERLY' ? (
              <>
                <Link href="/add-task" className="flex items-center p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white active:scale-95 transition-all duration-200">
                  <Plus className="w-6 h-6 mr-3" />
                  <div className="flex-1 text-left">
                    <div className="font-semibold">สร้างงานใหม่</div>
                    <div className="text-sm text-indigo-100">โพสต์งานที่ต้องการความช่วยเหลือ</div>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <Link href="/task-management" className="flex items-center p-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl text-white active:scale-95 transition-all duration-200">
                  <BarChart3 className="w-6 h-6 mr-3" />
                  <div className="flex-1 text-left">
                    <div className="font-semibold">จัดการงาน</div>
                    <div className="text-sm text-orange-100">ติดตามความคืบหน้าและสถานะ</div>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </>
            ) : (
              <>
                <Link href="/search" className="flex items-center p-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl text-white active:scale-95 transition-all duration-200">
                  <Search className="w-6 h-6 mr-3" />
                  <div className="flex-1 text-left">
                    <div className="font-semibold">ค้นหางานอาสา</div>
                    <div className="text-sm text-green-100">ค้นหางานที่คุณสามารถช่วยเหลือได้</div>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <Link href="/task-management" className="flex items-center p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white active:scale-95 transition-all duration-200">
                  <CheckSquare className="w-6 h-6 mr-3" />
                  <div className="flex-1 text-left">
                    <div className="font-semibold">งานของฉัน</div>
                    <div className="text-sm text-blue-100">ติดตามงานที่เข้าร่วม</div>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </>
            )}
                         <Link href="/chat" className="flex items-center p-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl text-white active:scale-95 transition-all duration-200">
               <MessageSquare className="w-6 h-6 mr-3" />
               <div className="flex-1 text-left">
                 <div className="font-semibold">แชท</div>
                 <div className="text-sm text-green-100">สื่อสารกับจิตอาสา/ผู้สร้างงาน</div>
               </div>
               <ChevronRight className="w-5 h-5" />
             </Link>
                           <Link href="/photo-verification" className="flex items-center p-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white active:scale-95 transition-all duration-200">
                <Image className="w-6 h-6 mr-3" />
                <div className="flex-1 text-left">
                  <div className="font-semibold">ยืนยันรูปถ่าย</div>
                  <div className="text-sm text-pink-100">ดูและยืนยันรูปถ่ายการทำงาน</div>
                </div>
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link href="/ratings" className="flex items-center p-4 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl text-white active:scale-95 transition-all duration-200">
                <Star className="w-6 h-6 mr-3" />
                <div className="flex-1 text-left">
                  <div className="font-semibold">คะแนนและรีวิว</div>
                  <div className="text-sm text-yellow-100">ให้คะแนนและรีวิวการทำงาน</div>
                </div>
                <ChevronRight className="w-5 h-5" />
              </Link>
              {/* Admin Panel - Only show for admin users */}
              {user.userType === 'STUDENT' && user.firstName === 'Leo' && (
                <Link href="/admin" className="flex items-center p-4 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl text-white active:scale-95 transition-all duration-200">
                  <Shield className="w-6 h-6 mr-3" />
                  <div className="flex-1 text-left">
                    <div className="font-semibold">ผู้ดูแลระบบ</div>
                    <div className="text-sm text-red-100">จัดการและติดตามระบบ</div>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </Link>
              )}
          </div>
        </div>
      </main>

      {/* Bottom Navigation Bar - Mobile Optimized */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 shadow-lg">
        <div className="flex items-center justify-around">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
              activeTab === 'home' 
                ? 'text-indigo-600 bg-indigo-50' 
                : 'text-gray-400 hover:text-indigo-600'
            }`}
          >
            <Home className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">หน้าหลัก</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('search')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
              activeTab === 'search' 
                ? 'text-indigo-600 bg-indigo-50' 
                : 'text-gray-400 hover:text-indigo-600'
            }`}
          >
            <Search className="w-6 h-6 mb-1" />
            <span className="text-xs">ค้นหา</span>
          </button>
          
          {user.userType === 'ELDERLY' ? (
            <button 
              onClick={() => setActiveTab('add')}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                activeTab === 'add' 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-gray-400 hover:text-indigo-600'
              }`}
            >
              <Plus className="w-6 h-6 mb-1" />
              <span className="text-xs">เพิ่มงาน</span>
            </button>
          ) : (
            <button 
              onClick={() => setActiveTab('tasks')}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                activeTab === 'tasks' 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-gray-400 hover:text-indigo-600'
              }`}
            >
              <Users className="w-6 h-6 mb-1" />
              <span className="text-xs">งานของฉัน</span>
            </button>
          )}
          
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 relative ${
              activeTab === 'notifications' 
                ? 'text-indigo-600 bg-indigo-50' 
                : 'text-gray-400 hover:text-indigo-600'
            }`}
          >
            <Bell className="w-6 h-6 mb-1" />
            <span className="text-xs">แจ้งเตือน</span>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">5</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
              activeTab === 'profile' 
                ? 'text-indigo-600 bg-indigo-50' 
                : 'text-gray-400 hover:text-indigo-600'
            }`}
          >
            <User className="w-6 h-6 mb-1" />
            <span className="text-xs">โปรไฟล์</span>
          </button>
        </div>
      </nav>

      {/* Safe Area for Mobile */}
      <div className="h-6 bg-gray-50"></div>
    </div>
  )
}
