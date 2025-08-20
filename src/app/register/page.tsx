'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Phone, 
  Building, 
  GraduationCap,
  Heart,
  ArrowRight,
  ArrowLeft,
  Shield,
  CheckCircle,
  MapPin
} from 'lucide-react';
import Link from 'next/link';

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'STUDENT' as 'STUDENT' | 'ELDERLY',
    studentId: '',
    university: '',
    address: '',
    city: '',
    province: '',
    postalCode: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน');
      return;
    }

    if (formData.password.length < 6) {
      setError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
      return;
    }

    if (formData.userType === 'STUDENT' && (!formData.studentId || !formData.university)) {
      setError('กรุณากรอกข้อมูลนักศึกษาให้ครบถ้วน');
      return;
    }

    setIsLoading(true);

    try {
      const success = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        userType: formData.userType,
        studentId: formData.studentId,
        university: formData.university,
        address: formData.address,
        city: formData.city,
        province: formData.province,
        postalCode: formData.postalCode
      });

      if (success) {
        router.push('/dashboard');
      } else {
        setError('เกิดข้อผิดพลาดในการลงทะเบียน');
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการลงทะเบียน');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 flex items-center justify-center p-4">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            กลับหน้าหลัก
          </Link>
          
          <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">สร้างบัญชีใหม่</h1>
          <p className="text-white/70 text-lg">เข้าร่วมชุมชนจิตอาสา GenMatch</p>
        </div>

        {/* Form Container */}
        <div className="glass-card p-8">
          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-6">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  ชื่อ *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="กรอกชื่อ"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  นามสกุล *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="กรอกนามสกุล"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  อีเมล *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="กรอกอีเมลของคุณ"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  รหัสผ่าน *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="รหัสผ่านอย่างน้อย 6 ตัวอักษร"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  ยืนยันรหัสผ่าน *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="ยืนยันรหัสผ่าน"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  ที่อยู่ *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="กรอกที่อยู่ของคุณ"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  จังหวัด *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="text"
                    value={formData.province}
                    onChange={(e) => handleInputChange('province', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="กรอกจังหวัด"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  รหัสไปรษณีย์
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="กรอกรหัสไปรษณีย์"
                  />
                </div>
              </div>
            </div>

            {/* User Type Selection */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-3">
                ประเภทผู้ใช้ *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleInputChange('userType', 'STUDENT')}
                  className={`p-4 rounded-lg border transition-all ${
                    formData.userType === 'STUDENT'
                      ? 'border-pink-500 bg-pink-500/20 text-white ring-2 ring-pink-500/30'
                      : 'border-white/20 bg-white/10 text-white/70 hover:bg-white/20 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 mr-3" />
                    <div className="text-left">
                      <div className="font-semibold">นักศึกษา</div>
                      <div className="text-xs opacity-80">รับงานจิตอาสา สะสมชั่วโมง</div>
                    </div>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => handleInputChange('userType', 'ELDERLY')}
                  className={`p-4 rounded-lg border transition-all ${
                    formData.userType === 'ELDERLY'
                      ? 'border-pink-500 bg-pink-500/20 text-white ring-2 ring-pink-500/30'
                      : 'border-white/20 bg-white/10 text-white/70 hover:bg-white/20 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <Heart className="w-6 h-6 mr-3" />
                    <div className="text-left">
                      <div className="font-semibold">ผู้สูงอายุ</div>
                      <div className="text-xs opacity-80">โพสต์งานที่ต้องการความช่วยเหลือ</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Student-specific fields */}
            {formData.userType === 'STUDENT' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    รหัสนิสิต *
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type="text"
                      value={formData.studentId}
                      onChange={(e) => handleInputChange('studentId', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="กรอกรหัสนิสิต"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    มหาวิทยาลัย *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type="text"
                      value={formData.university}
                      onChange={(e) => handleInputChange('university', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="กรอกชื่อมหาวิทยาลัย"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full glass-button-primary py-4 px-6 rounded-lg font-medium text-white transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  กำลังสร้างบัญชี...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  สร้างบัญชีใหม่
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              )}
            </button>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-white/70">
                มีบัญชีอยู่แล้ว?{' '}
                <Link href="/login" className="text-pink-400 hover:text-pink-300 font-medium">
                  เข้าสู่ระบบเลย
                </Link>
              </p>
            </div>
          </form>

          {/* Terms and Privacy */}
          <div className="mt-6 text-center">
            <p className="text-white/60 text-xs">
              การลงทะเบียนถือว่าคุณยอมรับ{' '}
              <Link href="/terms" className="text-pink-400 hover:text-pink-300">
                ข้อกำหนดการใช้งาน
              </Link>{' '}
              และ{' '}
              <Link href="/privacy" className="text-pink-400 hover:text-pink-300">
                นโยบายความเป็นส่วนตัว
              </Link>
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 text-center">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <p className="text-white/70 text-xs">ปลอดภัย 100%</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <p className="text-white/70 text-xs">ยืนยันตัวตน</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <p className="text-white/70 text-xs">เชื่อมโยงชุมชน</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
