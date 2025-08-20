'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign, 
  FileText,
  ArrowLeft,
  Save,
  X
} from 'lucide-react';
import Link from 'next/link';

interface TaskForm {
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  time: string;
  duration: string;
  budget: string;
  requirements: string;
}

export default function AddTask() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<TaskForm>({
    title: '',
    description: '',
    category: '',
    location: '',
    date: '',
    time: '',
    duration: '',
    budget: '',
    requirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: 'HOSPITAL', name: 'โรงพยาบาล', description: 'พาไปตรวจสุขภาพ, รับยา' },
    { id: 'TEMPLE', name: 'วัด', description: 'พาไปทำบุญ, กิจกรรมทางศาสนา' },
    { id: 'EXERCISE', name: 'ออกกำลังกาย', description: 'พาไปออกกำลังกาย, เดินเล่น' },
    { id: 'REPAIR', name: 'งานซ่อม', description: 'ซ่อมแซมอุปกรณ์, งานช่าง' }
  ];

  const durations = [
    { value: '1', label: '1 ชั่วโมง' },
    { value: '2', label: '2 ชั่วโมง' },
    { value: '3', label: '3 ชั่วโมง' },
    { value: '4', label: '4 ชั่วโมง' },
    { value: '5', label: '5 ชั่วโมง' },
    { value: '6', label: '6 ชั่วโมง' },
    { value: '8', label: '8 ชั่วโมง' },
    { value: '10', label: '10 ชั่วโมง' }
  ];

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

  if (!user) {
    router.push('/login');
    return null;
  }

  // Only elderly users can add tasks
  if (user.userType !== 'ELDERLY') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 flex items-center justify-center p-4">
        <div className="glass-card p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">ไม่สามารถเข้าถึงได้</h2>
          <p className="text-white/70 mb-6">เฉพาะผู้สูงอายุเท่านั้นที่สามารถโพสต์งานได้</p>
          <Link href="/dashboard" className="btn-modern px-6 py-3">
            กลับไปหน้าแรก
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          location: formData.location,
          budget: formData.budget ? parseFloat(formData.budget) : null,
          category: formData.category,
          date: formData.date,
          time: formData.time,
          duration: parseInt(formData.duration),
          requirements: formData.requirements
        })
      });

      if (response.ok) {
        router.push('/my-tasks');
      } else {
        throw new Error('Failed to create task');
      }
    } catch (error) {
      console.error('Error creating task:', error);
      alert('เกิดข้อผิดพลาดในการสร้างงาน กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.title && formData.description && formData.category && 
                     formData.location && formData.date && formData.time && formData.duration;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900">
      {/* Header */}
      <div className="glass-card mx-4 mt-4 p-6">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="text-white hover:text-pink-300 transition-colors">
            <ArrowLeft className="w-5 h-5 inline mr-2" />
            กลับไปหน้าแรก
          </Link>
          <h1 className="text-3xl font-bold text-white">เพิ่มงานใหม่</h1>
          <div className="w-32"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-6 px-4">
        <div className="glass-card p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">สร้างงานใหม่</h2>
            <p className="text-white/70">
              กรอกข้อมูลงานที่ต้องการความช่วยเหลือ นักศึกษาจะสามารถรับงานและช่วยเหลือคุณได้
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">
                  ชื่องาน <span className="text-pink-400">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="เช่น พาไปตรวจสุขภาพที่โรงพยาบาล"
                  className="input-modern w-full text-white placeholder-white/50"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  หมวดหมู่ <span className="text-pink-400">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="input-modern w-full text-white"
                  required
                >
                  <option value="">เลือกหมวดหมู่</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name} - {category.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-white font-medium mb-2">
                รายละเอียดงาน <span className="text-pink-400">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="อธิบายรายละเอียดงานที่ต้องการความช่วยเหลือ..."
                className="input-modern w-full text-white placeholder-white/50 resize-none"
                required
              />
            </div>

            {/* Location and Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">
                  สถานที่ <span className="text-pink-400">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="ที่อยู่หรือสถานที่"
                    className="input-modern w-full text-white placeholder-white/50 pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  วันที่ต้องการ <span className="text-pink-400">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="input-modern w-full text-white pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Time and Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">
                  เวลาที่ต้องการ <span className="text-pink-400">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="input-modern w-full text-white pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  ระยะเวลาที่ต้องการ <span className="text-pink-400">*</span>
                </label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="input-modern w-full text-white"
                  required
                >
                  <option value="">เลือกระยะเวลา</option>
                  {durations.map((duration) => (
                    <option key={duration.value} value={duration.value}>
                      {duration.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Budget and Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">
                  งบประมาณ (บาท)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    className="input-modern w-full text-white placeholder-white/50 pl-10"
                  />
                </div>
                <p className="text-white/60 text-sm mt-1">
                  หมายเหตุ: นักศึกษาจะได้รับชั่วโมงจิตอาสาแทนผลตอบแทนเป็นเงิน
                </p>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  ความต้องการพิเศษ
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="text"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    placeholder="เช่น ต้องการผู้หญิง, มีรถยนต์, ฯลฯ"
                    className="input-modern w-full text-white placeholder-white/50 pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 pt-6">
              <Link
                href="/dashboard"
                className="glass-button-secondary px-6 py-3 rounded-lg hover:scale-105 transition-transform"
              >
                ยกเลิก
              </Link>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-modern px-8 py-3 rounded-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    กำลังสร้างงาน...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Save className="w-5 h-5 mr-2" />
                    สร้างงาน
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Card */}
        <div className="glass-card p-6 mt-6">
          <h3 className="text-lg font-semibold text-white mb-3">ข้อมูลเพิ่มเติม</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/70">
            <div>
              <p>• นักศึกษาจะได้รับชั่วโมงจิตอาสาตามระยะเวลางาน</p>
              <p>• งานจะแสดงในระบบค้นหาสำหรับนักศึกษาทั่วไป</p>
            </div>
            <div>
              <p>• คุณสามารถติดต่อนักศึกษาผ่านระบบแชท</p>
              <p>• สามารถยกเลิกงานได้ก่อนที่นักศึกษาจะรับงาน</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
