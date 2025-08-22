'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Edit, 
  Save, 
  X, 
  Camera, 
  Star, 
  Users, 
  Calendar, 
  Clock, 
  Award,
  TrendingUp,
  CheckCircle,
  Zap,
  Crown,
  Shield,
  Building,
  GraduationCap,
  Globe,
  Wrench,
  Target,
  Settings,
  LogOut,
  ChevronRight,
  HelpCircle,
  Info,
  Bell,
  Lock,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userType: string;
  studentId?: string;
  university?: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  joinDate: string;
  rating: number;
  totalTasks: number;
  completedTasks: number;
  volunteerHours: number;
  achievements: string[];
}

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: ''
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }
    if (user) {
      loadProfile();
    }
  }, [user, loading, router]);

  const loadProfile = async () => {
    try {
      // Mock profile data
      const mockProfile: UserProfile = {
        id: user?.id || '1',
        firstName: user?.firstName || 'สมชาย',
        lastName: user?.lastName || 'ใจดี',
        email: user?.email || 'somchai@example.com',
        phone: '081-234-5678',
        userType: user?.userType || 'STUDENT',
        studentId: user?.userType === 'STUDENT' ? '6xxxxxxxxx' : undefined,
        university: user?.userType === 'STUDENT' ? 'มหาวิทยาลัยมหิดล' : undefined,
        address: '123 ถนนสุขุมวิท',
        city: 'กรุงเทพฯ',
        province: 'กรุงเทพฯ',
        postalCode: '10110',
        joinDate: '2024-01-01',
        rating: 4.8,
        totalTasks: 25,
        completedTasks: 23,
        volunteerHours: 47,
        achievements: ['จิตอาสาดีเด่น', 'ผู้ช่วยเหลือยอดเยี่ยม', 'อาสาสมัครประจำเดือน']
      };
      
      setProfile(mockProfile);
      setEditForm({
        firstName: mockProfile.firstName,
        lastName: mockProfile.lastName,
        phone: mockProfile.phone,
        address: mockProfile.address,
        city: mockProfile.city,
        province: mockProfile.province,
        postalCode: mockProfile.postalCode
      });
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (profile) {
        setProfile({
          ...profile,
          ...editForm
        });
      }
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">ไม่พบข้อมูลโปรไฟล์</h2>
          <p className="text-gray-600 mb-6">ไม่สามารถโหลดข้อมูลโปรไฟล์ได้</p>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            กลับไป
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Status Bar */}
      <div className="bg-white px-4 py-3 text-sm text-gray-600 text-center border-b border-gray-100 md:hidden">
        <div className="flex items-center justify-between">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <h1 className="text-lg font-semibold text-gray-900">โปรไฟล์</h1>
            
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-2 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-3xl text-white">
              {profile.firstName.charAt(0)}
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            {profile.firstName} {profile.lastName}
          </h2>
          <p className="text-gray-600 mb-3">
            {profile.userType === 'STUDENT' ? 'นักศึกษา' : 'ผู้สูงอายุ'}
          </p>
          
          <div className="flex items-center justify-center space-x-1 mb-4">
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <span className="text-gray-700 font-medium">{profile.rating}</span>
            <span className="text-gray-500">({profile.totalTasks} รีวิว)</span>
          </div>
          
          <div className="text-sm text-gray-500">
            เข้าร่วมเมื่อ {formatDate(profile.joinDate)}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {profile.volunteerHours}
            </div>
            <div className="text-sm text-gray-600">ชั่วโมงอาสา</div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {profile.completedTasks}
            </div>
            <div className="text-sm text-gray-600">งานเสร็จ</div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {profile.achievements.length}
            </div>
            <div className="text-sm text-gray-600">รางวัล</div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลส่วนตัว</h3>
          
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อ</label>
                  <input
                    type="text"
                    value={editForm.firstName}
                    onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">นามสกุล</label>
                  <input
                    type="text"
                    value={editForm.lastName}
                    onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">เบอร์โทรศัพท์</label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ที่อยู่</label>
                <textarea
                  value={editForm.address}
                  onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 resize-none"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">เมือง</label>
                  <input
                    type="text"
                    value={editForm.city}
                    onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">จังหวัด</label>
                  <input
                    type="text"
                    value={editForm.province}
                    onChange={(e) => setEditForm({ ...editForm, province: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">รหัสไปรษณีย์</label>
                  <input
                    type="text"
                    value={editForm.postalCode}
                    onChange={(e) => setEditForm({ ...editForm, postalCode: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                >
                  บันทึก
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">อีเมล</p>
                  <p className="text-gray-900">{profile.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">เบอร์โทรศัพท์</p>
                  <p className="text-gray-900">{profile.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">ที่อยู่</p>
                  <p className="text-gray-900">
                    {profile.address}, {profile.city}, {profile.province} {profile.postalCode}
                  </p>
                </div>
              </div>
              
              {profile.userType === 'STUDENT' && (
                <>
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">รหัสนักศึกษา</p>
                      <p className="text-gray-900">{profile.studentId}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">มหาวิทยาลัย</p>
                      <p className="text-gray-900">{profile.university}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Achievements */}
        {profile.achievements.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">รางวัลและความสำเร็จ</h3>
            <div className="space-y-3">
              {profile.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-xl">
                  <Award className="w-5 h-5 text-yellow-600" />
                  <span className="text-gray-900">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings & Actions */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">การตั้งค่า</h3>
          </div>
          
          <div className="divide-y divide-gray-100">
            <Link
              href="/notifications"
              className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">การแจ้งเตือน</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            
            <Link
              href="/privacy"
              className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">ความเป็นส่วนตัว</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            
            <Link
              href="/help"
              className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <HelpCircle className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">ความช่วยเหลือ</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            
            <Link
              href="/about"
              className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Info className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">เกี่ยวกับเรา</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-4 border-2 border-red-300 text-red-600 rounded-xl font-semibold text-lg hover:bg-red-50 transition-all duration-200 active:scale-95"
        >
          <LogOut className="w-5 h-5 inline mr-2" />
          ออกจากระบบ
        </button>
      </main>

      {/* Mobile Safe Area */}
      <div className="h-6 bg-gray-50 md:hidden"></div>
    </div>
  );
}
