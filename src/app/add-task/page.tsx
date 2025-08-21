'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Plus, 
  MapPin, 
  Calendar, 
  Clock, 
  FileText, 
  AlertCircle,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default function AddTask() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Hospital',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    scheduledDate: '',
    scheduledTime: '',
    estimatedHours: 2,
    volunteerHours: 2,
    requirements: '',
    budget: 0
  });

  // Access control - only elderly users can add tasks
  if (user?.userType !== 'ELDERLY') {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
              <div className="card p-8 text-center max-w-md">
        <AlertCircle className="w-16 h-16 text-error-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">เข้าถึงไม่ได้</h1>
        <p className="text-neutral-600 mb-6">
          เฉพาะผู้สูงอายุเท่านั้นที่สามารถโพสต์งานได้
        </p>
        <Link 
          href="/dashboard" 
          className="btn-primary inline-flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          กลับไปหน้าแรก
        </Link>
      </div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Mock API call - in real app, this would be a POST to /api/tasks
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('งานถูกโพสต์เรียบร้อยแล้ว!');
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการโพสต์งาน');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 shadow-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-neutral-600 hover:text-primary-600">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-xl font-bold text-neutral-900">โพสต์งานใหม่</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="friendly-card p-8">
          {/* Success Message */}
          {success && (
            <div className="bg-success-50 border border-success-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-success-600 mr-2" />
                <p className="text-success-700">{success}</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-error-50 border border-error-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-error-600 mr-2" />
                <p className="text-error-700">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="form-friendly">
            {/* Task Title */}
            <div className="form-group">
              <label className="form-label">
                ชื่องาน *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="input-friendly"
                placeholder="เช่น พาไปโรงพยาบาล, ซ่อมก๊อกน้ำ"
                required
              />
            </div>

            {/* Task Description */}
            <div className="form-group">
              <label className="form-label">
                รายละเอียดงาน *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="input-friendly min-h-[120px] resize-none"
                placeholder="อธิบายรายละเอียดงานที่ต้องการความช่วยเหลือ..."
                required
              />
            </div>

            {/* Category and Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">
                  หมวดหม่งาน *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="input-friendly"
                  required
                >
                  <option value="Hospital">โรงพยาบาล</option>
                  <option value="Temple">วัด</option>
                  <option value="Exercise">ออกกำลังกาย</option>
                  <option value="Repair">งานซ่อม</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  งบประมาณ (บาท)
                </label>
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', parseInt(e.target.value) || 0)}
                  className="input-friendly"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            {/* Address */}
            <div className="form-group">
              <label className="form-label">
                ที่อยู่ *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="input-friendly"
                    placeholder="ที่อยู่"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="input-friendly"
                    placeholder="อำเภอ/เขต"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={formData.province}
                    onChange={(e) => handleInputChange('province', e.target.value)}
                    className="input-friendly"
                    placeholder="จังหวัด"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="form-group">
                <label className="form-label">
                  วันที่ต้องการ *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="date"
                    value={formData.scheduledDate}
                    onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
                    className="input-friendly pl-10"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  เวลาที่ต้องการ *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="time"
                    value={formData.scheduledTime}
                    onChange={(e) => handleInputChange('scheduledTime', e.target.value)}
                    className="input-friendly pl-10"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  จำนวนชั่วโมง *
                </label>
                <input
                  type="number"
                  value={formData.estimatedHours}
                  onChange={(e) => handleInputChange('estimatedHours', parseInt(e.target.value) || 1)}
                  className="input-friendly"
                  placeholder="2"
                  min="1"
                  max="24"
                  required
                />
              </div>
            </div>

            {/* Volunteer Hours and Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">
                  ชั่วโมงจิตอาสา *
                </label>
                <input
                  type="number"
                  value={formData.volunteerHours}
                  onChange={(e) => handleInputChange('volunteerHours', parseInt(e.target.value) || 1)}
                  className="input-friendly"
                  placeholder="2"
                  min="1"
                  max="24"
                  required
                />
                <p className="text-caption mt-1">
                  จำนวนชั่วโมงที่นักศึกษาจะได้รับเป็นจิตอาสา
                </p>
              </div>

              <div className="form-group">
                <label className="form-label">
                  ความต้องการพิเศษ
                </label>
                <input
                  type="text"
                  value={formData.requirements}
                  onChange={(e) => handleInputChange('requirements', e.target.value)}
                  className="input-friendly"
                  placeholder="เช่น ต้องการผู้หญิง, มีรถยนต์"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end space-x-4 pt-6">
              <Link 
                href="/dashboard" 
                className="btn-friendly-outline"
              >
                ยกเลิก
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-friendly-primary"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    กำลังโพสต์...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    โพสต์งาน
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Tips */}
        <div className="mt-8 friendly-card p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-primary-600" />
            เคล็ดลับการโพสต์งาน
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neutral-600">
            <div>
              <p className="mb-2"><strong>•</strong> ระบุรายละเอียดให้ชัดเจน</p>
              <p className="mb-2"><strong>•</strong> กำหนดเวลาให้เหมาะสม</p>
              <p className="mb-2"><strong>•</strong> ระบุที่อยู่ที่ชัดเจน</p>
            </div>
            <div>
              <p className="mb-2"><strong>•</strong> ตั้งค่าชั่วโมงจิตอาสาที่สมเหตุสมผล</p>
              <p className="mb-2"><strong>•</strong> ระบุความต้องการพิเศษถ้ามี</p>
              <p className="mb-2"><strong>•</strong> ตอบกลับข้อความอย่างรวดเร็ว</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
