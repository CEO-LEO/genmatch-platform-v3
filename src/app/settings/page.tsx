'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Download, 
  LogOut,
  Settings,
  Eye,
  EyeOff,
  Check,
  X
} from 'lucide-react';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false,
    marketing: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    locationVisible: true,
    contactVisible: false,
    activityVisible: true
  });

  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('th');
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handlePrivacyChange = (key: string) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert('รหัสผ่านใหม่ไม่ตรงกัน');
      return;
    }
    if (newPassword.length < 6) {
      alert('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
      return;
    }
    alert('เปลี่ยนรหัสผ่านสำเร็จ');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleExportData = () => {
    alert('กำลังส่งข้อมูลไปยังอีเมลของคุณ');
  };

  const handleDeleteAccount = () => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบบัญชี? การกระทำนี้ไม่สามารถยกเลิกได้')) {
      alert('บัญชีของคุณจะถูกลบใน 30 วัน');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/profile" className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">การตั้งค่า</h1>
                <p className="text-sm text-gray-600">จัดการบัญชีและการตั้งค่าต่างๆ</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 pb-24">
        {/* Account Settings */}
        <section className="mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">บัญชี</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">อีเมล</label>
                <input
                  type="email"
                  value="user@example.com"
                  disabled
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อผู้ใช้</label>
                <input
                  type="text"
                  value="user123"
                  disabled
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Password Change */}
        <section className="mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">เปลี่ยนรหัสผ่าน</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">รหัสผ่านปัจจุบัน</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="รหัสผ่านปัจจุบัน"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">รหัสผ่านใหม่</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="รหัสผ่านใหม่"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ยืนยันรหัสผ่านใหม่</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="ยืนยันรหัสผ่านใหม่"
                />
              </div>
              
              <button
                onClick={handlePasswordChange}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                เปลี่ยนรหัสผ่าน
              </button>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">การแจ้งเตือน</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">การแจ้งเตือนแบบ Push</h4>
                  <p className="text-sm text-gray-600">รับการแจ้งเตือนทันทีในแอป</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('push')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notifications.push ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    notifications.push ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">อีเมล</h4>
                  <p className="text-sm text-gray-600">รับการแจ้งเตือนทางอีเมล</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('email')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notifications.email ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    notifications.email ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">SMS</h4>
                  <p className="text-sm text-gray-600">รับการแจ้งเตือนทาง SMS</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('sms')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notifications.sms ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    notifications.sms ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">การตลาด</h4>
                  <p className="text-sm text-gray-600">รับข่าวสารและโปรโมชั่น</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('marketing')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notifications.marketing ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    notifications.marketing ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section className="mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">ความเป็นส่วนตัว</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">โปรไฟล์สาธารณะ</h4>
                  <p className="text-sm text-gray-600">ให้ผู้อื่นเห็นโปรไฟล์ของคุณ</p>
                </div>
                <button
                  onClick={() => handlePrivacyChange('profileVisible')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    privacy.profileVisible ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    privacy.profileVisible ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">แสดงตำแหน่ง</h4>
                  <p className="text-sm text-gray-600">ให้ผู้อื่นเห็นตำแหน่งของคุณ</p>
                </div>
                <button
                  onClick={() => handlePrivacyChange('locationVisible')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    privacy.locationVisible ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    privacy.locationVisible ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">ข้อมูลติดต่อ</h4>
                  <p className="text-sm text-gray-600">ให้ผู้อื่นเห็นข้อมูลติดต่อ</p>
                </div>
                <button
                  onClick={() => handlePrivacyChange('contactVisible')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    privacy.contactVisible ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    privacy.contactVisible ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">กิจกรรม</h4>
                  <p className="text-sm text-gray-600">ให้ผู้อื่นเห็นกิจกรรมของคุณ</p>
                </div>
                <button
                  onClick={() => handlePrivacyChange('activityVisible')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    privacy.activityVisible ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    privacy.activityVisible ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Appearance */}
        <section className="mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                <Palette className="w-5 h-5 text-pink-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">การแสดงผล</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ธีม</label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                >
                  <option value="light">สว่าง</option>
                  <option value="dark">มืด</option>
                  <option value="auto">อัตโนมัติ</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ภาษา</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                >
                  <option value="th">ไทย</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Data & Export */}
        <section className="mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Download className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">ข้อมูลและการส่งออก</h2>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={handleExportData}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                ส่งออกข้อมูลของฉัน
              </button>
              
              <button
                onClick={handleDeleteAccount}
                className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                ลบบัญชี
              </button>
            </div>
          </div>
        </section>

        {/* Logout */}
        <section className="mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <button className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
              <LogOut className="w-5 h-5" />
              <span>ออกจากระบบ</span>
            </button>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="text-center">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">การดำเนินการด่วน</h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/profile"
                className="bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
              >
                กลับไปโปรไฟล์
              </Link>
              <Link
                href="/"
                className="bg-white text-purple-600 border-2 border-purple-600 px-6 py-3 rounded-full font-medium hover:bg-purple-50 transition-colors"
              >
                หน้าหลัก
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around py-2">
          <Link 
            href="/"
            className="flex flex-col items-center py-2 px-3 rounded-lg text-gray-600 hover:text-purple-600 transition-colors"
          >
            <div className="w-6 h-6 mb-1">🏠</div>
            <span className="text-xs">หน้าหลัก</span>
          </Link>
          <Link 
            href="/search"
            className="flex flex-col items-center py-2 px-3 rounded-lg text-gray-600 hover:text-purple-600 transition-colors"
          >
            <div className="w-6 h-6 mb-1">🔍</div>
            <span className="text-xs">ค้นหา</span>
          </Link>
          <Link 
            href="/add-task"
            className="flex flex-col items-center py-2 px-3 rounded-lg text-gray-600 hover:text-purple-600 transition-colors"
          >
            <div className="w-6 h-6 mb-1">➕</div>
            <span className="text-xs">สร้างงาน</span>
          </Link>
          <Link 
            href="/my-tasks"
            className="flex flex-col items-center py-2 px-3 rounded-lg text-gray-600 hover:text-purple-600 transition-colors"
          >
            <div className="w-6 h-6 mb-1">❤️</div>
            <span className="text-xs">งานของฉัน</span>
          </Link>
          <Link 
            href="/profile"
            className="flex flex-col items-center py-2 px-3 rounded-lg text-purple-600 bg-purple-50 transition-colors"
          >
            <div className="w-6 h-6 mb-1">👤</div>
            <span className="text-xs">โปรไฟล์</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
