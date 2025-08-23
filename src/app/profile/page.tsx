'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  User, 
  Edit, 
  Camera, 
  MapPin, 
  Calendar, 
  Mail, 
  Phone,
  Star,
  Award,
  Heart,
  Clock,
  CheckCircle,
  Settings
} from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'สมชาย',
    lastName: 'ใจดี',
    email: 'somchai@example.com',
    phone: '081-234-5678',
    location: 'กรุงเทพมหานคร',
    bio: 'นักศึกษามหาวิทยาลัยมหิดล ที่มีความสนใจในการเป็นจิตอาสาและช่วยเหลือสังคม',
    birthDate: '1995-05-15',
    interests: ['การดูแลผู้สูงอายุ', 'การศึกษา', 'สิ่งแวดล้อม'],
    skills: ['การพูดคุย', 'การสอน', 'การดูแลเด็ก']
  });

  const mockStats = {
    totalTasks: 24,
    completedTasks: 18,
    totalHours: 156,
    rating: 4.8,
    badges: 8
  };

  const mockRecentTasks = [
    {
      id: '1',
      title: 'ช่วยเหลือผู้สูงอายุที่โรงพยาบาล',
      date: '20 ส.ค. 2568',
      status: 'completed',
      rating: 5.0
    },
    {
      id: '2',
      title: 'ทำความสะอาดวัด',
      date: '18 ส.ค. 2568',
      status: 'completed',
      rating: 4.5
    },
    {
      id: '3',
      title: 'สอนคอมพิวเตอร์ให้ผู้สูงอายุ',
      date: '15 ส.ค. 2568',
      status: 'completed',
      rating: 4.8
    }
  ];

  const mockBadges = [
    { name: 'จิตอาสาต้นแบบ', icon: '🏆', description: 'เข้าร่วมงานจิตอาสา 10 ครั้ง' },
    { name: 'ผู้ช่วยเหลือ', icon: '🤝', description: 'ช่วยเหลือผู้สูงอายุ 5 ครั้ง' },
    { name: 'ครูจิตอาสา', icon: '📚', description: 'สอนหนังสือ 3 ครั้ง' },
    { name: 'ผู้รักษ์สิ่งแวดล้อม', icon: '🌱', description: 'ทำความสะอาด 8 ครั้ง' }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Save profile data to backend
    console.log('Profile saved:', profileData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
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
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-white border-2 border-purple-500 rounded-full flex items-center justify-center hover:bg-purple-50 transition-colors">
                  <Camera className="w-5 h-5 text-purple-600" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <h2 className="text-3xl font-bold text-gray-900">
                    {profileData.firstName} {profileData.lastName}
                  </h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="text-gray-600 mb-4">{profileData.bio}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>{profileData.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-purple-600 mb-1">{mockStats.totalTasks}</div>
              <div className="text-sm text-gray-600">งานทั้งหมด</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-green-600 mb-1">{mockStats.completedTasks}</div>
              <div className="text-sm text-gray-600">เสร็จสิ้น</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-blue-600 mb-1">{mockStats.totalHours}</div>
              <div className="text-sm text-gray-600">ชั่วโมง</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-yellow-600 mb-1">{mockStats.rating}</div>
              <div className="text-sm text-gray-600">คะแนน</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-pink-600 mb-1">{mockStats.badges}</div>
              <div className="text-sm text-gray-600">เหรียญ</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profile Details */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <User className="w-5 h-5 mr-2 text-purple-600" />
                ข้อมูลส่วนตัว
              </h3>

              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อ</label>
                      <input
                        type="text"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">นามสกุล</label>
                      <input
                        type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">อีเมล</label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">เบอร์โทร</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ที่อยู่</label>
                    <input
                      type="text"
                      name="location"
                      value={profileData.location}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ประวัติย่อ</label>
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                    >
                      บันทึก
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      ยกเลิก
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">ชื่อ</label>
                      <p className="text-gray-900">{profileData.firstName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">นามสกุล</label>
                      <p className="text-gray-900">{profileData.lastName}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">อีเมล</label>
                    <p className="text-gray-900">{profileData.email}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">เบอร์โทร</label>
                    <p className="text-gray-900">{profileData.phone}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">ที่อยู่</label>
                    <p className="text-gray-900">{profileData.location}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">ประวัติย่อ</label>
                    <p className="text-gray-900">{profileData.bio}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Recent Tasks */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-purple-600" />
                งานล่าสุด
              </h3>
              
              <div className="space-y-4">
                {mockRecentTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{task.title}</h4>
                      <p className="text-gray-500 text-xs">{task.date}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-700">{task.rating}</span>
                      </div>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Link
                  href="/my-tasks"
                  className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                >
                  ดูงานทั้งหมด →
                </Link>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Award className="w-5 h-5 mr-2 text-purple-600" />
              เหรียญและความสำเร็จ
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockBadges.map((badge, index) => (
                <div key={index} className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <h4 className="font-semibold text-gray-900 mb-1">{badge.name}</h4>
                  <p className="text-sm text-gray-600">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 text-center">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">การดำเนินการด่วน</h3>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/settings"
                  className="bg-white text-purple-600 border-2 border-purple-600 px-6 py-3 rounded-full font-medium hover:bg-purple-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>ตั้งค่า</span>
                </Link>
                <Link
                  href="/add-task"
                  className="bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
                >
                  สร้างงานใหม่
                </Link>
                <Link
                  href="/search"
                  className="bg-white text-purple-600 border-2 border-purple-600 px-6 py-3 rounded-full font-medium hover:bg-purple-50 transition-colors"
                >
                  ค้นหางาน
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
