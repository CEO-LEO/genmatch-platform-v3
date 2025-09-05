'use client';

// Force dynamic rendering to avoid serving stale cached UI
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Edit, Phone, Mail, Star, Award, Users, Clock, Heart, ArrowLeft } from 'lucide-react';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'สมชาย',
    lastName: 'ใจดี',
    email: 'somchai@example.com',
    phone: '081-234-5678',
    bio: 'จิตอาสาที่มีความสุขในการช่วยเหลือผู้อื่น โดยเฉพาะผู้สูงอายุและเด็ก'
  });

  const [stats, setStats] = useState<any | null>(null);
  const [statsLoading, setStatsLoading] = useState<boolean>(true);
  const [recentTasks, setRecentTasks] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }
    
    if (user) {
      // Update profile data with user data
      setProfileData({
        firstName: user.firstName || 'สมชาย',
        lastName: user.lastName || 'ใจดี',
        email: (user as any).email || 'user@example.com',
        phone: user.phone || '081-234-5678',
        bio: 'จิตอาสาที่มีความสุขในการช่วยเหลือผู้อื่น โดยเฉพาะผู้สูงอายุและเด็ก'
      });

      // Fetch realtime stats
      const fetchStats = async () => {
        try {
          setStatsLoading(true);
          const token = localStorage.getItem('token');
          const res = await fetch('/api/user/stats', {
            headers: {
              'Authorization': token ? `Bearer ${token}` : ''
            }
          });
          const data = await res.json();
          if (res.ok) {
            setStats(data.data?.stats || {});
            // If backend provides recentActivities but not concrete tasks, keep list empty
            setRecentTasks([]);
          } else {
            console.warn('Failed to fetch stats:', data?.error || res.statusText);
            setStats(null);
            setRecentTasks([]);
          }
        } catch (err) {
          console.error('Stats fetch error:', err);
          setStats(null);
          setRecentTasks([]);
        } finally {
          setStatsLoading(false);
        }
      };

      fetchStats();
    }
  }, [user, loading, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Profile updated:', profileData);
    setIsEditing(false);
  };

  // Derive counters from fetched stats to avoid showing fake data
  const derivedCounters = (() => {
    if (!stats || !user) {
      return { total: 0, completed: 0, hours: 0, rating: 0, badges: 0 };
    }
    if (user.userType === 'STUDENT') {
      return {
        total: stats.totalJoinedTasks || 0,
        completed: stats.completedTasks || 0,
        hours: stats.totalHours || 0,
        rating: stats.rating || 0,
        badges: stats.badges || 0
      };
    }
    return {
      total: stats.totalCreatedTasks || 0,
      completed: stats.completedTasks || 0,
      hours: 0,
      rating: 0,
      badges: 0
    };
  })();

  const mockBadges = [
    { id: 1, name: 'จิตอาสาต้นแบบ', icon: '🏆', description: 'ทำจิตอาสาเกิน 100 ชั่วโมง' },
    { id: 2, name: 'ผู้ช่วยเหลือ', icon: '🤝', description: 'ช่วยเหลือผู้สูงอายุ 50+ ครั้ง' },
    { id: 3, name: 'ครูสอนใจ', icon: '📚', description: 'สอนความรู้ให้ผู้อื่น 30+ ครั้ง' },
    { id: 4, name: 'ผู้รักษ์สิ่งแวดล้อม', icon: '🌱', description: 'ทำกิจกรรมรักษ์สิ่งแวดล้อม 20+ ครั้ง' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลดโปรไฟล์...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

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

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-3">
              <Link 
                href="/dashboard"
                className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>กลับแดชบอร์ด</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm mb-8">
          <div className="flex items-center space-x-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors">
                <Edit className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium"
                >
                  {isEditing ? 'ยกเลิก' : 'แก้ไข'}
                </button>
              </div>
              
              <p className="text-gray-600 mb-4">{profileData.bio}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  {profileData.phone}
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  {profileData.email}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">{derivedCounters.total}</div>
            <div className="text-sm text-gray-600">งานทั้งหมด</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{derivedCounters.completed}</div>
            <div className="text-sm text-gray-600">งานเสร็จ</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{derivedCounters.hours}</div>
            <div className="text-sm text-gray-600">ชั่วโมง</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">{derivedCounters.rating}</div>
            <div className="text-sm text-gray-600">คะแนน</div>
          </div>
        </div>

        {/* Profile Form */}
        {isEditing && (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">ข้อมูลส่วนตัว</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  ชื่อ
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  นามสกุล
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  อีเมล
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  เบอร์โทรศัพท์
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                />
              </div>
              
              
              <div className="md:col-span-2">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                  เกี่ยวกับฉัน
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                บันทึก
              </button>
            </div>
          </div>
        )}

        {/* Recent Tasks - show empty state if none */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">งานล่าสุด</h3>
          {statsLoading ? (
            <div className="text-gray-500">กำลังโหลด...</div>
          ) : recentTasks.length === 0 ? (
            <div className="text-gray-500">ยังไม่มีประวัติงานล่าสุด</div>
          ) : (
            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{task.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                        {task.category}
                      </span>
                      <span>{task.date}</span>
                      <span className="text-green-600">{task.status}</span>
                    </div>
                  </div>
                  <Link
                    href={`/task/${task.id}`}
                    className="px-3 py-1 bg-purple-600 text-white text-xs rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    ดู
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Achievements (no coin/monetary wording) */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">ความสำเร็จ</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockBadges.map((badge) => (
              <div key={badge.id} className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl">
                  {badge.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">{badge.name}</h4>
                  <p className="text-sm text-gray-600">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">การดำเนินการอย่างรวดเร็ว</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/add-task"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              สร้างงานใหม่
            </Link>
            <Link
              href="/search"
              className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium"
            >
              ค้นหางาน
            </Link>
            <Link
              href="/my-tasks"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              งานของฉัน
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
