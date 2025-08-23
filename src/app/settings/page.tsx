'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, Shield, Palette, Download, LogOut, User, Eye, EyeOff } from 'lucide-react';

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    profileVisibility: 'public',
    theme: 'light',
    language: 'th',
    fontSize: 'medium'
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setSettings(prev => ({
        ...prev,
        [name]: target.checked
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password update logic here
    console.log('Password update:', passwordData);
  };

  const handleDeleteAccount = () => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบบัญชี? การดำเนินการนี้ไม่สามารถยกเลิกได้')) {
      // Handle account deletion logic here
      console.log('Account deletion requested');
    }
  };

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

            {/* Back to Home Button */}
            <Link 
              href="/"
              className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
            >
              กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">ตั้งค่า</h2>
          <p className="text-gray-600">จัดการการตั้งค่าบัญชีและการแจ้งเตือน</p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {/* Account Settings */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <User className="w-5 h-5 text-purple-600" />
              </span>
              บัญชี
            </h3>

            {/* Change Password */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">เปลี่ยนรหัสผ่าน</h4>
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    รหัสผ่านปัจจุบัน
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    รหัสผ่านใหม่
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      required
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
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    ยืนยันรหัสผ่านใหม่
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  เปลี่ยนรหัสผ่าน
                </button>
              </form>
            </div>

            {/* Delete Account */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-lg font-medium text-red-600 mb-4">ลบบัญชี</h4>
              <p className="text-gray-600 mb-4">
                การลบบัญชีจะทำให้ข้อมูลทั้งหมดหายไปและไม่สามารถกู้คืนได้
              </p>
              <button
                onClick={handleDeleteAccount}
                className="px-6 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                ลบบัญชี
              </button>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <Bell className="w-5 h-5 text-purple-600" />
              </span>
              การแจ้งเตือน
            </h3>
            
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={handleSettingChange}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="ml-3 text-gray-700">แจ้งเตือนทางอีเมล</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="pushNotifications"
                  checked={settings.pushNotifications}
                  onChange={handleSettingChange}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="ml-3 text-gray-700">แจ้งเตือนแบบ Push</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="marketingEmails"
                  checked={settings.marketingEmails}
                  onChange={handleSettingChange}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="ml-3 text-gray-700">อีเมลข่าวสารและโปรโมชั่น</span>
              </label>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <Shield className="w-5 h-5 text-purple-600" />
              </span>
              ความเป็นส่วนตัว
            </h3>
            
            <div>
              <label htmlFor="profileVisibility" className="block text-sm font-medium text-gray-700 mb-2">
                การแสดงผลโปรไฟล์
              </label>
              <select
                id="profileVisibility"
                name="profileVisibility"
                value={settings.profileVisibility}
                onChange={handleSettingChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              >
                <option value="public">สาธารณะ</option>
                <option value="friends">เพื่อนเท่านั้น</option>
                <option value="private">ส่วนตัว</option>
              </select>
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <Palette className="w-5 h-5 text-purple-600" />
              </span>
              ลักษณะ
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-2">
                  ธีม
                </label>
                <select
                  id="theme"
                  name="theme"
                  value={settings.theme}
                  onChange={handleSettingChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                >
                  <option value="light">สว่าง</option>
                  <option value="dark">มืด</option>
                  <option value="auto">อัตโนมัติ</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700 mb-2">
                  ขนาดตัวอักษร
                </label>
                <select
                  id="fontSize"
                  name="fontSize"
                  value={settings.fontSize}
                  onChange={handleSettingChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                >
                  <option value="small">เล็ก</option>
                  <option value="medium">กลาง</option>
                  <option value="large">ใหญ่</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                  ภาษา
                </label>
                <select
                  id="language"
                  name="language"
                  value={settings.language}
                  onChange={handleSettingChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                >
                  <option value="th">ไทย</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data & Export */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <Download className="w-5 h-5 text-purple-600" />
              </span>
              ข้อมูลและการส่งออก
            </h3>
            
            <div className="space-y-4">
              <button className="px-6 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                ดาวน์โหลดข้อมูลของฉัน
              </button>
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                ส่งออกข้อมูล
              </button>
            </div>
          </div>

          {/* Logout */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                <LogOut className="w-5 h-5 text-red-600" />
              </span>
              ออกจากระบบ
            </h3>
            
            <p className="text-gray-600 mb-4">
              ออกจากระบบและกลับไปยังหน้าหลัก
            </p>
            <Link
              href="/"
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              ออกจากระบบ
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">การดำเนินการอย่างรวดเร็ว</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/profile"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              โปรไฟล์
            </Link>
            <Link
              href="/my-tasks"
              className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium"
            >
              งานของฉัน
            </Link>
            <Link
              href="/search"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              ค้นหางาน
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
