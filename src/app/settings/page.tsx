'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Palette, 
  Download, 
  LogOut,
  User,
  Eye,
  EyeOff,
  Check,
  X
} from 'lucide-react';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    weekly: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    locationVisible: false,
    activityVisible: true,
    contactVisible: false
  });

  const [appearance, setAppearance] = useState({
    theme: 'light',
    fontSize: 'medium',
    language: 'th'
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

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

  const handleAppearanceChange = (key: string, value: string) => {
    setAppearance(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const togglePasswordVisibility = (field: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev]
    }));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert('รหัสผ่านใหม่ไม่ตรงกัน');
      return;
    }
    // TODO: Implement password change logic
    console.log('Password changed:', passwords);
    setShowPasswordModal(false);
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logging out...');
  };

  const exportData = () => {
    // TODO: Implement data export logic
    console.log('Exporting data...');
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
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">ตั้งค่า</h2>
            <p className="text-gray-600">จัดการการตั้งค่าบัญชีและการแอปพลิเคชัน</p>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {/* Account Settings */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <User className="w-5 h-5 mr-2 text-purple-600" />
                บัญชี
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">เปลี่ยนรหัสผ่าน</h4>
                    <p className="text-sm text-gray-600">อัปเดตรหัสผ่านของคุณ</p>
                  </div>
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    เปลี่ยน
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">ลบบัญชี</h4>
                    <p className="text-sm text-gray-600">ลบบัญชีและข้อมูลทั้งหมดอย่างถาวร</p>
                  </div>
                  <button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-50 transition-colors">
                    ลบ
                  </button>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-purple-600" />
                การแจ้งเตือน
              </h3>
              
              <div className="space-y-4">
                {[
                  { key: 'email', label: 'อีเมล', description: 'รับการแจ้งเตือนทางอีเมล' },
                  { key: 'push', label: 'Push Notification', description: 'การแจ้งเตือนในแอป' },
                  { key: 'sms', label: 'SMS', description: 'รับการแจ้งเตือนทาง SMS' },
                  { key: 'weekly', label: 'รายงานรายสัปดาห์', description: 'สรุปกิจกรรมประจำสัปดาห์' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{item.label}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange(item.key)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notifications[item.key as keyof typeof notifications]
                          ? 'bg-purple-600'
                          : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        notifications[item.key as keyof typeof notifications]
                          ? 'transform translate-x-6'
                          : 'transform translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-purple-600" />
                ความเป็นส่วนตัว
              </h3>
              
              <div className="space-y-4">
                {[
                  { key: 'profileVisible', label: 'โปรไฟล์สาธารณะ', description: 'ให้ผู้อื่นเห็นโปรไฟล์ของคุณ' },
                  { key: 'locationVisible', label: 'แสดงตำแหน่ง', description: 'แสดงตำแหน่งในงานจิตอาสา' },
                  { key: 'activityVisible', label: 'แสดงกิจกรรม', description: 'ให้ผู้อื่นเห็นกิจกรรมของคุณ' },
                  { key: 'contactVisible', label: 'แสดงข้อมูลติดต่อ', description: 'ให้ผู้อื่นเห็นข้อมูลติดต่อ' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{item.label}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <button
                      onClick={() => handlePrivacyChange(item.key)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        privacy[item.key as keyof typeof privacy]
                          ? 'bg-purple-600'
                          : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        privacy[item.key as keyof typeof privacy]
                          ? 'transform translate-x-6'
                          : 'transform translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Appearance Settings */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Palette className="w-5 h-5 mr-2 text-purple-600" />
                ลักษณะ
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">ธีม</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'light', label: 'สว่าง', color: 'bg-white border-gray-300' },
                      { value: 'dark', label: 'มืด', color: 'bg-gray-800 border-gray-600' },
                      { value: 'auto', label: 'อัตโนมัติ', color: 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300' }
                    ].map((theme) => (
                      <button
                        key={theme.value}
                        onClick={() => handleAppearanceChange('theme', theme.value)}
                        className={`p-3 rounded-lg border-2 transition-colors ${
                          appearance.theme === theme.value
                            ? 'border-purple-500 bg-purple-50'
                            : theme.color
                        }`}
                      >
                        <span className={`text-sm font-medium ${
                          appearance.theme === theme.value ? 'text-purple-700' : 'text-gray-700'
                        }`}>
                          {theme.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">ขนาดตัวอักษร</label>
                  <select
                    value={appearance.fontSize}
                    onChange={(e) => handleAppearanceChange('fontSize', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="small">เล็ก</option>
                    <option value="medium">ปานกลาง</option>
                    <option value="large">ใหญ่</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">ภาษา</label>
                  <select
                    value={appearance.language}
                    onChange={(e) => handleAppearanceChange('language', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="th">ไทย</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Data & Export */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Download className="w-5 h-5 mr-2 text-purple-600" />
                ข้อมูลและการส่งออก
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">ส่งออกข้อมูล</h4>
                    <p className="text-sm text-gray-600">ดาวน์โหลดข้อมูลบัญชีของคุณ</p>
                  </div>
                  <button
                    onClick={exportData}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    ส่งออก
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">ลบข้อมูล</h4>
                    <p className="text-sm text-gray-600">ลบข้อมูลทั้งหมดในบัญชี</p>
                  </div>
                  <button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-50 transition-colors">
                    ลบ
                  </button>
                </div>
              </div>
            </div>

            {/* Logout */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">ออกจากระบบ</h3>
                  <p className="text-sm text-gray-600">ออกจากระบบและกลับไปยังหน้าล็อกอิน</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center space-x-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span>ออกจากระบบ</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 text-center">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">การดำเนินการด่วน</h3>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/profile"
                  className="bg-white text-purple-600 border-2 border-purple-600 px-6 py-3 rounded-full font-medium hover:bg-purple-50 transition-colors"
                >
                  โปรไฟล์
                </Link>
                <Link
                  href="/help"
                  className="bg-white text-purple-600 border-2 border-purple-600 px-6 py-3 rounded-full font-medium hover:bg-purple-50 transition-colors"
                >
                  ช่วยเหลือ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">เปลี่ยนรหัสผ่าน</h3>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">รหัสผ่านปัจจุบัน</label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    name="current"
                    value={passwords.current}
                    onChange={handlePasswordChange}
                    required
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="รหัสผ่านปัจจุบัน"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">รหัสผ่านใหม่</label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    name="new"
                    value={passwords.new}
                    onChange={handlePasswordChange}
                    required
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="รหัสผ่านใหม่"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ยืนยันรหัสผ่านใหม่</label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    name="confirm"
                    value={passwords.confirm}
                    onChange={handlePasswordChange}
                    required
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="ยืนยันรหัสผ่านใหม่"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  เปลี่ยนรหัสผ่าน
                </button>
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
