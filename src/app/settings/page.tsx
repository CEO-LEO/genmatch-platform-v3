'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Bell, 
  Eye, 
  EyeOff, 
  Lock, 
  Shield, 
  Palette, 
  Settings as SettingsIcon,
  Users,
  Star,
  Award,
  TrendingUp,
  Target,
  Zap,
  Crown,
  Building,
  GraduationCap,
  Globe,
  Wrench,
  CheckCircle,
  AlertCircle,
  Info,
  HelpCircle,
  LogOut,
  ChevronRight,
  User,
  Globe as GlobeIcon,
  Moon,
  Sun,
  Smartphone,
  Monitor,
  Wifi,
  WifiOff,
  Volume2,
  VolumeX,
  Download,
  Trash2,
  Save,
  X
} from 'lucide-react'

interface SettingSection {
  id: string;
  title: string;
  icon: any;
  color: string;
  items: SettingItem[];
}

interface SettingItem {
  id: string;
  title: string;
  description: string;
  type: 'toggle' | 'select' | 'button' | 'input';
  value?: any;
  options?: { label: string; value: any }[];
  action?: () => void;
}

export default function SettingsPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [settings, setSettings] = useState({
    notifications: {
      push: true,
      email: true,
      sms: false,
      sound: true,
      vibration: true
    },
    privacy: {
      profileVisibility: 'public',
      locationSharing: true,
      activityFeed: true,
      contactInfo: 'friends'
    },
    appearance: {
      theme: 'auto',
      language: 'th',
      fontSize: 'medium'
    },
    general: {
      autoSave: true,
      dataUsage: 'balanced',
      backupFrequency: 'weekly'
    }
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }
    
    if (user) {
      loadSettings();
    }
  }, [user, loading, router]);

  const loadSettings = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
  };

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  const handlePasswordChange = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert('รหัสผ่านใหม่ไม่ตรงกัน');
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('เปลี่ยนรหัสผ่านสำเร็จ');
      setIsEditing(false);
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน');
    }
  };

  const handleLogout = async () => {
    if (confirm('คุณต้องการออกจากระบบหรือไม่?')) {
      try {
        await logout();
        router.push('/login');
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
  };

  const settingSections: SettingSection[] = [
    {
      id: 'notifications',
      title: 'การแจ้งเตือน',
      icon: Bell,
      color: 'from-blue-500 to-indigo-500',
      items: [
        {
          id: 'push',
          title: 'การแจ้งเตือนแบบ Push',
          description: 'รับการแจ้งเตือนเมื่อมีงานใหม่หรือข้อความ',
          type: 'toggle',
          value: settings.notifications.push,
          action: () => handleSettingChange('notifications', 'push', !settings.notifications.push)
        },
        {
          id: 'email',
          title: 'อีเมล',
          description: 'รับการแจ้งเตือนทางอีเมล',
          type: 'toggle',
          value: settings.notifications.email,
          action: () => handleSettingChange('notifications', 'email', !settings.notifications.email)
        },
        {
          id: 'sound',
          title: 'เสียง',
          description: 'เล่นเสียงเมื่อมีการแจ้งเตือน',
          type: 'toggle',
          value: settings.notifications.sound,
          action: () => handleSettingChange('notifications', 'sound', !settings.notifications.sound)
        },
        {
          id: 'vibration',
          title: 'การสั่น',
          description: 'สั่นเมื่อมีการแจ้งเตือน',
          type: 'toggle',
          value: settings.notifications.vibration,
          action: () => handleSettingChange('notifications', 'vibration', !settings.notifications.vibration)
        }
      ]
    },
    {
      id: 'privacy',
      title: 'ความเป็นส่วนตัว',
      icon: Shield,
      color: 'from-green-500 to-teal-500',
      items: [
        {
          id: 'profileVisibility',
          title: 'การแสดงโปรไฟล์',
          description: 'ใครสามารถดูโปรไฟล์ของคุณได้',
          type: 'select',
          value: settings.privacy.profileVisibility,
          options: [
            { label: 'สาธารณะ', value: 'public' },
            { label: 'เพื่อนเท่านั้น', value: 'friends' },
            { label: 'ส่วนตัว', value: 'private' }
          ],
          action: () => {}
        },
        {
          id: 'locationSharing',
          title: 'แชร์ตำแหน่ง',
          description: 'อนุญาตให้แชร์ตำแหน่งกับผู้ใช้อื่น',
          type: 'toggle',
          value: settings.privacy.locationSharing,
          action: () => handleSettingChange('privacy', 'locationSharing', !settings.privacy.locationSharing)
        },
        {
          id: 'activityFeed',
          title: 'ฟีดกิจกรรม',
          description: 'แสดงกิจกรรมในฟีดชุมชน',
          type: 'toggle',
          value: settings.privacy.activityFeed,
          action: () => handleSettingChange('privacy', 'activityFeed', !settings.privacy.activityFeed)
        }
      ]
    },
    {
      id: 'appearance',
      title: 'การแสดงผล',
      icon: SettingsIcon,
      color: 'from-purple-500 to-pink-500',
      items: [
        {
          id: 'theme',
          title: 'ธีม',
          description: 'เลือกธีมการแสดงผล',
          type: 'select',
          value: settings.appearance.theme,
          options: [
            { label: 'อัตโนมัติ', value: 'auto' },
            { label: 'สว่าง', value: 'light' },
            { label: 'มืด', value: 'dark' }
          ],
          action: () => {}
        },
        {
          id: 'fontSize',
          title: 'ขนาดตัวอักษร',
          description: 'ปรับขนาดตัวอักษรให้เหมาะสม',
          type: 'select',
          value: settings.appearance.fontSize,
          options: [
            { label: 'เล็ก', value: 'small' },
            { label: 'กลาง', value: 'medium' },
            { label: 'ใหญ่', value: 'large' }
          ],
          action: () => {}
        }
      ]
    },
    {
      id: 'general',
      title: 'ทั่วไป',
      icon: SettingsIcon,
      color: 'from-gray-500 to-gray-600',
      items: [
        {
          id: 'autoSave',
          title: 'บันทึกอัตโนมัติ',
          description: 'บันทึกข้อมูลอัตโนมัติ',
          type: 'toggle',
          value: settings.general.autoSave,
          action: () => handleSettingChange('general', 'autoSave', !settings.general.autoSave)
        },
        {
          id: 'dataUsage',
          title: 'การใช้ข้อมูล',
          description: 'ปรับการใช้งานข้อมูล',
          type: 'select',
          value: settings.general.dataUsage,
          options: [
            { label: 'ประหยัด', value: 'low' },
            { label: 'สมดุล', value: 'balanced' },
            { label: 'สูง', value: 'high' }
          ],
          action: () => {}
        }
      ]
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
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
            
            <h1 className="text-lg font-semibold text-gray-900">ตั้งค่า</h1>
            
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 space-y-6">
        {/* Settings Sections */}
        {settingSections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Section Header */}
              <div className="px-4 py-4 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-r ${section.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                  </div>
                </div>
              </div>

              {/* Section Items */}
              <div className="divide-y divide-gray-100">
                {section.items.map((item) => (
                  <div key={item.id} className="px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-medium text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      
                      <div className="ml-4">
                        {item.type === 'toggle' && (
                          <button
                            onClick={item.action}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              item.value ? 'bg-indigo-600' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                item.value ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        )}
                        
                        {item.type === 'select' && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">
                              {item.options?.find(opt => opt.value === item.value)?.label}
                            </span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </div>
                        )}
                        
                        {item.type === 'button' && (
                          <button
                            onClick={item.action}
                            className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                          >
                            เปลี่ยน
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Password Change Section */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">ความปลอดภัย</h3>
              </div>
            </div>
          </div>

          <div className="px-4 py-4">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                เปลี่ยนรหัสผ่าน
              </button>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">รหัสผ่านปัจจุบัน</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.currentPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 pr-12"
                      placeholder="รหัสผ่านปัจจุบัน"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">รหัสผ่านใหม่</label>
                  <input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                    placeholder="รหัสผ่านใหม่"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ยืนยันรหัสผ่านใหม่</label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                    placeholder="ยืนยันรหัสผ่านใหม่"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    }}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    ยกเลิก
                  </button>
                  <button
                    onClick={handlePasswordChange}
                    className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                  >
                    บันทึก
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">บัญชีผู้ใช้</h3>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            <button
              onClick={() => router.push('/help')}
              className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <HelpCircle className="w-5 h-5 text-gray-400" />
                  <div>
                    <h4 className="text-base font-medium text-gray-900">ความช่วยเหลือ</h4>
                    <p className="text-sm text-gray-600">คู่มือการใช้งานและคำถามที่พบบ่อย</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            <button
              onClick={() => router.push('/about')}
              className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Info className="w-5 h-5 text-gray-400" />
                  <div>
                    <h4 className="text-base font-medium text-gray-900">เกี่ยวกับแอป</h4>
                    <p className="text-sm text-gray-600">ข้อมูลเวอร์ชันและทีมพัฒนา</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            <button
              onClick={handleLogout}
              className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <LogOut className="w-5 h-5 text-red-500" />
                <div>
                  <h4 className="text-base font-medium text-red-600">ออกจากระบบ</h4>
                  <p className="text-sm text-gray-600">ออกจากระบบและกลับไปหน้าเข้าสู่ระบบ</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </main>

      {/* Mobile Safe Area */}
      <div className="h-6 bg-gray-50 md:hidden"></div>
    </div>
  );
}
