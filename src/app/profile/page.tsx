'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Building,
  Edit,
  Save,
  X,
  Award,
  Clock,
  Star,
  Calendar,
  Heart,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  studentId?: string;
  university?: string;
  userType: 'STUDENT' | 'ELDERLY';
  createdAt: string;
  totalHours: number;
  completedTasks: number;
  rating: number;
  achievements: Achievement[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export default function Profile() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    address: '',
    studentId: '',
    university: ''
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
      loadUserProfile();
    }
  }, [user, loading, router]);

  const loadUserProfile = async () => {
    try {
      // Mock profile data
      const mockProfile: UserProfile = {
        id: user?.id || '',
        name: user?.name || '',
        email: user?.email || '',
        phone: '081-234-5678',
        address: '123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110',
        studentId: user?.userType === 'STUDENT' ? '6400000001' : undefined,
        university: user?.userType === 'STUDENT' ? 'มหาวิทยาลัยมหิดล' : undefined,
        userType: user?.userType || 'STUDENT',
        createdAt: user?.createdAt || new Date().toISOString(),
        totalHours: 24,
        completedTasks: 12,
        rating: 4.8,
        achievements: [
          {
            id: '1',
            title: 'จิตอาสาครั้งแรก',
            description: 'เสร็จสิ้นงานจิตอาสาครั้งแรก',
            icon: '🌟',
            unlockedAt: '2024-01-15'
          },
          {
            id: '2',
            title: 'ผู้ช่วยเหลือยอดเยี่ยม',
            description: 'ได้รับคะแนนความพึงพอใจ 5 ดาว',
            icon: '⭐',
            unlockedAt: '2024-02-20'
          },
          {
            id: '3',
            title: 'จิตอาสา 10 ชั่วโมง',
            description: 'สะสมชั่วโมงจิตอาสาได้ 10 ชั่วโมง',
            icon: '🏆',
            unlockedAt: '2024-03-10'
          }
        ]
      };
      
      setProfile(mockProfile);
      setEditForm({
        name: mockProfile.name,
        phone: mockProfile.phone,
        address: mockProfile.address,
        studentId: mockProfile.studentId || '',
        university: mockProfile.university || ''
      });
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  };

  const handleSave = () => {
    if (profile) {
      setProfile({
        ...profile,
        name: editForm.name,
        phone: editForm.phone,
        address: editForm.address,
        studentId: editForm.studentId,
        university: editForm.university
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setEditForm({
        name: profile.name,
        phone: profile.phone,
        address: profile.address,
        studentId: profile.studentId || '',
        university: profile.university || ''
      });
      setIsEditing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-400 mx-auto"></div>
          <p className="mt-4 text-lg text-white">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900">
      {/* Header */}
      <div className="glass-card mx-4 mt-4 p-6">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="text-white hover:text-pink-300 transition-colors">
            ← กลับไปหน้าแรก
          </Link>
          <h1 className="text-3xl font-bold text-white">โปรไฟล์</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="glass-button-secondary px-4 py-2 flex items-center space-x-2"
          >
            {isEditing ? (
              <>
                <X className="w-4 h-4" />
                ยกเลิก
              </>
            ) : (
              <>
                <Edit className="w-4 h-4" />
                แก้ไข
              </>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8 mb-6">
              <h2 className="text-2xl font-bold text-white mb-6">ข้อมูลส่วนตัว</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/70 text-sm mb-2">ชื่อ</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="w-full bg-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                  ) : (
                    <div className="flex items-center text-white">
                      <User className="w-5 h-5 mr-3 text-pink-400" />
                      {profile.name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">อีเมล</label>
                  <div className="flex items-center text-white">
                    <Mail className="w-5 h-5 mr-3 text-pink-400" />
                    {profile.email}
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">เบอร์โทรศัพท์</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                      className="w-full bg-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                  ) : (
                    <div className="flex items-center text-white">
                      <Phone className="w-5 h-5 mr-3 text-pink-400" />
                      {profile.phone}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">ประเภทผู้ใช้</label>
                  <div className="flex items-center text-white">
                    <Heart className="w-5 h-5 mr-3 text-pink-400" />
                    {profile.userType === 'STUDENT' ? 'นักศึกษา' : 'ผู้สูงอายุ'}
                  </div>
                </div>

                {profile.userType === 'STUDENT' && (
                  <>
                    <div>
                      <label className="block text-white/70 text-sm mb-2">รหัสนิสิต</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.studentId}
                          onChange={(e) => setEditForm({...editForm, studentId: e.target.value})}
                          className="w-full bg-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                      ) : (
                        <div className="flex items-center text-white">
                          <GraduationCap className="w-5 h-5 mr-3 text-pink-400" />
                          {profile.studentId}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-white/70 text-sm mb-2">มหาวิทยาลัย</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.university}
                          onChange={(e) => setEditForm({...editForm, university: e.target.value})}
                          className="w-full bg-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                      ) : (
                        <div className="flex items-center text-white">
                          <Building className="w-5 h-5 mr-3 text-pink-400" />
                          {profile.university}
                        </div>
                      )}
                    </div>
                  </>
                )}

                <div className="md:col-span-2">
                  <label className="block text-white/70 text-sm mb-2">ที่อยู่</label>
                  {isEditing ? (
                    <textarea
                      value={editForm.address}
                      onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                      rows={3}
                      className="w-full bg-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                  ) : (
                    <div className="flex items-start text-white">
                      <MapPin className="w-5 h-5 mr-3 text-pink-400 mt-1" />
                      {profile.address}
                    </div>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={handleCancel}
                    className="glass-button-secondary px-6 py-2"
                  >
                    ยกเลิก
                  </button>
                  <button
                    onClick={handleSave}
                    className="glass-button px-6 py-2"
                  >
                    <Save className="w-4 h-4 inline mr-2" />
                    บันทึก
                  </button>
                </div>
              )}
            </div>

            {/* Statistics */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold text-white mb-6">สถิติการใช้งาน</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white/10 rounded-lg">
                  <Clock className="w-12 h-12 text-pink-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-2">{profile.totalHours}</div>
                  <div className="text-white/70">ชั่วโมงจิตอาสา</div>
                </div>
                
                <div className="text-center p-6 bg-white/10 rounded-lg">
                  <Award className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-2">{profile.completedTasks}</div>
                  <div className="text-white/70">งานเสร็จสิ้น</div>
                </div>
                
                <div className="text-center p-6 bg-white/10 rounded-lg">
                  <Star className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-2">{profile.rating}</div>
                  <div className="text-white/70">คะแนนความพึงพอใจ</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Member Since */}
            <div className="glass-card p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">สมาชิกตั้งแต่</h3>
              <div className="flex items-center text-white">
                <Calendar className="w-5 h-5 mr-3 text-pink-400" />
                {new Date(profile.createdAt).toLocaleDateString('th-TH')}
              </div>
            </div>

            {/* Achievements */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">ความสำเร็จ</h3>
              
              <div className="space-y-3">
                {profile.achievements.map((achievement) => (
                  <div key={achievement.id} className="p-3 bg-white/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium text-sm">{achievement.title}</h4>
                        <p className="text-white/60 text-xs">{achievement.description}</p>
                        <p className="text-white/40 text-xs mt-1">
                          {new Date(achievement.unlockedAt).toLocaleDateString('th-TH')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
