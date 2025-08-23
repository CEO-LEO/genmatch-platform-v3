'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Lock,
  Smartphone,
  Globe,
  Palette,
  Download,
  Trash2,
  LogOut
} from 'lucide-react';

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false,
    taskUpdates: true,
    messages: true,
    achievements: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    locationVisible: false,
    contactVisible: false,
    activityVisible: true
  });

  const [theme, setTheme] = useState('light');

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logging out...');
  };

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบบัญชี? การดำเนินการนี้ไม่สามารถยกเลิกได้')) {
      console.log('Deleting account...');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-3">
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-gray-900">การตั้งค่า</h1>
            <p className="text-sm text-gray-500">จัดการการตั้งค่าบัญชีของคุณ</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 pb-24">
        {/* Account Settings */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">บัญชี</h3>
          
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Lock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">เปลี่ยนรหัสผ่าน</h4>
                    <p className="text-sm text-gray-600">อัปเดตรหัสผ่านของคุณ</p>
                  </div>
                </div>
                <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                  เปลี่ยน
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">การยืนยันตัวตน</h4>
                    <p className="text-sm text-gray-600">เพิ่มความปลอดภัยให้บัญชี</p>
                  </div>
                </div>
                <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                  ตั้งค่า
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">การแจ้งเตือน</h3>
          
          <div className="bg-white rounded-xl shadow-sm">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Bell className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {key === 'push' && 'การแจ้งเตือนแบบ Push'}
                      {key === 'email' && 'อีเมล'}
                      {key === 'sms' && 'ข้อความ SMS'}
                      {key === 'taskUpdates' && 'อัปเดตงาน'}
                      {key === 'messages' && 'ข้อความใหม่'}
                      {key === 'achievements' && 'ความสำเร็จ'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {key === 'push' && 'รับการแจ้งเตือนแบบ Push บนอุปกรณ์'}
                      {key === 'email' && 'รับการแจ้งเตือนทางอีเมล'}
                      {key === 'sms' && 'รับการแจ้งเตือนทาง SMS'}
                      {key === 'taskUpdates' && 'อัปเดตสถานะงาน'}
                      {key === 'messages' && 'ข้อความใหม่จากผู้ใช้อื่น'}
                      {key === 'achievements' && 'ความสำเร็จและรางวัล'}
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handleNotificationChange(key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ความเป็นส่วนตัว</h3>
          
          <div className="bg-white rounded-xl shadow-sm">
            {Object.entries(privacy).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {key === 'profileVisible' && 'โปรไฟล์ที่มองเห็นได้'}
                      {key === 'locationVisible' && 'ตำแหน่งที่มองเห็นได้'}
                      {key === 'contactVisible' && 'ข้อมูลการติดต่อที่มองเห็นได้'}
                      {key === 'activityVisible' && 'กิจกรรมที่มองเห็นได้'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {key === 'profileVisible' && 'แสดงโปรไฟล์ให้ผู้ใช้อื่นเห็น'}
                      {key === 'locationVisible' && 'แสดงตำแหน่งในงานจิตอาสา'}
                      {key === 'contactVisible' && 'แสดงข้อมูลการติดต่อ'}
                      {key === 'activityVisible' && 'แสดงกิจกรรมล่าสุด'}
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handlePrivacyChange(key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* Appearance */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">การแสดงผล</h3>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Palette className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">ธีม</h4>
                  <p className="text-sm text-gray-600">เลือกธีมการแสดงผล</p>
                </div>
              </div>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="light">สว่าง</option>
                <option value="dark">มืด</option>
                <option value="auto">อัตโนมัติ</option>
              </select>
            </div>
          </div>
        </section>

        {/* Data & Export */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลและการส่งออก</h3>
          
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Download className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">ส่งออกข้อมูล</h4>
                    <p className="text-sm text-gray-600">ดาวน์โหลดข้อมูลส่วนตัวของคุณ</p>
                  </div>
                </div>
                <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                  ส่งออก
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">ลบบัญชี</h4>
                    <p className="text-sm text-gray-600">ลบบัญชีและข้อมูลทั้งหมดอย่างถาวร</p>
                  </div>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  ลบ
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Logout */}
        <section className="mb-8">
          <button
            onClick={handleLogout}
            className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <LogOut className="w-5 h-5 text-gray-600" />
              </div>
              <span className="font-medium text-gray-900">ออกจากระบบ</span>
            </div>
          </button>
        </section>

        {/* App Info */}
        <div className="text-center text-sm text-gray-500">
          <p>GenMatch v1.0.0</p>
          <p className="mt-1">© 2024 GenMatch. สงวนลิขสิทธิ์.</p>
        </div>
      </main>
    </div>
  );
}
