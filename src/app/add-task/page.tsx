'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft,
  Plus,
  Save,
  X,
  MapPin,
  Calendar,
  Clock,
  User,
  FileText,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Building,
  Globe,
  Heart,
  Wrench,
  Camera,
  Upload
} from 'lucide-react';
import Link from 'next/link';

interface TaskForm {
  title: string;
  description: string;
  category: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  scheduledDate: string;
  scheduledTime: string;
  estimatedHours: number;
  requirements: string[];
  images: File[];
}

export default function AddTaskPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<TaskForm>({
    title: '',
    description: '',
    category: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    scheduledDate: '',
    scheduledTime: '',
    estimatedHours: 1,
    requirements: ['อายุ 18 ปีขึ้นไป'],
    images: []
  });

  const categories = [
    { id: 'HOSPITAL', name: 'โรงพยาบาล', emoji: '🏥', color: 'from-red-500 to-pink-500' },
    { id: 'TEMPLE', name: 'วัด', emoji: '🏛️', color: 'from-yellow-500 to-orange-500' },
    { id: 'EXERCISE', name: 'ออกกำลังกาย', emoji: '💪', color: 'from-green-500 to-teal-500' },
    { id: 'REPAIR', name: 'งานซ่อม', emoji: '🔧', color: 'from-blue-500 to-indigo-500' }
  ];

  const provinces = [
    'กรุงเทพฯ', 'กระบี่', 'กาญจนบุรี', 'กาฬสินธุ์', 'กำแพงเพชร', 'ขอนแก่น', 'จันทบุรี', 'ฉะเชิงเทรา',
    'ชลบุรี', 'ชัยนาท', 'ชัยภูมิ', 'ชุมพร', 'เชียงราย', 'เชียงใหม่', 'ตรัง', 'ตราด', 'ตาก', 'นครนายก',
    'นครปฐม', 'นครพนม', 'นครราชสีมา', 'นครศรีธรรมราช', 'นครสวรรค์', 'นนทบุรี', 'นราธิวาส', 'น่าน',
    'บึงกาฬ', 'บุรีรัมย์', 'ปทุมธานี', 'ประจวบคีรีขันธ์', 'ปราจีนบุรี', 'ปัตตานี', 'พระนครศรีอยุธยา',
    'พังงา', 'พัทลุง', 'พิจิตร', 'พิษณุโลก', 'เพชรบุรี', 'เพชรบูรณ์', 'แพร่', 'พะเยา', 'ภูเก็ต',
    'มหาสารคาม', 'มุกดาหาร', 'แม่ฮ่องสอน', 'ยะลา', 'ยโสธร', 'ร้อยเอ็ด', 'ระนอง', 'ระยอง', 'ราชบุรี',
    'ลพบุรี', 'ลำปาง', 'ลำพูน', 'เลย', 'ศรีสะเกษ', 'สกลนคร', 'สงขลา', 'สตูล', 'สมุทรปราการ',
    'สมุทรสงคราม', 'สมุทรสาคร', 'สระแก้ว', 'สระบุรี', 'สิงห์บุรี', 'สุโขทัย', 'สุพรรณบุรี', 'สุราษฎร์ธานี',
    'สุรินทร์', 'หนองคาย', 'หนองบัวลำภู', 'อ่างทอง', 'อุดรธานี', 'อุทัยธานี', 'อุตรดิตถ์', 'อุบลราชธานี'
  ];

  const requirements = [
    'อายุ 18 ปีขึ้นไป',
    'มีประสบการณ์ในงานที่เกี่ยวข้อง',
    'สามารถเดินทางไปยังสถานที่ได้',
    'มีเวลาว่างตามที่กำหนด',
    'มีความรับผิดชอบและตรงต่อเวลา',
    'สามารถสื่อสารภาษาไทยได้',
    'มีสุขภาพร่างกายแข็งแรง',
    'ไม่มีประวัติอาชญากรรม'
  ];

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }
  }, [user, loading, router]);

  const handleInputChange = (field: keyof TaskForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRequirementToggle = (requirement: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.includes(requirement)
        ? prev.requirements.filter(r => r !== requirement)
        : [...prev.requirements, requirement]
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.title.trim() !== '' && 
               formData.description.trim() !== '' && 
               formData.category !== '';
      case 2:
        return formData.address.trim() !== '' && 
               formData.city.trim() !== '' && 
               formData.province.trim() !== '' && 
               formData.postalCode.trim() !== '';
      case 3:
        return formData.scheduledDate !== '' && 
               formData.scheduledTime !== '' && 
               formData.estimatedHours > 0;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success - redirect to my-tasks
      router.push('/my-tasks?created=true');
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepStatus = (step: number) => {
    if (step < currentStep) return 'completed';
    if (step === currentStep) return 'current';
    return 'upcoming';
  };

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
            
            <h1 className="text-lg font-semibold text-gray-900">สร้างงานใหม่</h1>
            
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                getStepStatus(step) === 'completed'
                  ? 'bg-green-500 text-white'
                  : getStepStatus(step) === 'current'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {getStepStatus(step) === 'completed' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  step
                )}
              </div>
              {step < 4 && (
                <div className={`w-8 h-1 mx-2 ${
                  getStepStatus(step) === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>ข้อมูลงาน</span>
          <span>ที่อยู่</span>
          <span>เวลา</span>
          <span>สรุป</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Basic Task Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลงาน</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ชื่องาน *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                      placeholder="เช่น ช่วยซื้อของที่ซุปเปอร์มาร์เก็ต"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">รายละเอียด *</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 resize-none"
                      placeholder="อธิบายรายละเอียดของงานที่ต้องการความช่วยเหลือ..."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">หมวดหมู่ *</label>
                    <div className="grid grid-cols-2 gap-3">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => handleInputChange('category', category.id)}
                          className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                            formData.category === category.id
                              ? 'border-indigo-500 bg-indigo-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center text-2xl mx-auto mb-2`}>
                            {category.emoji}
                          </div>
                          <div className="text-sm font-medium text-gray-900">{category.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">ที่อยู่</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ที่อยู่ *</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 resize-none"
                      placeholder="ที่อยู่ที่ต้องการให้มาช่วยเหลือ"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">เมือง *</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                        placeholder="เช่น กรุงเทพฯ"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">จังหวัด *</label>
                      <select
                        value={formData.province}
                        onChange={(e) => handleInputChange('province', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                        required
                      >
                        <option value="">เลือกจังหวัด</option>
                        {provinces.map((province) => (
                          <option key={province} value={province}>{province}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">รหัสไปรษณีย์ *</label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                      placeholder="เช่น 10110"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Schedule */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">เวลาและความต้องการ</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">วันที่ *</label>
                      <input
                        type="date"
                        value={formData.scheduledDate}
                        onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">เวลา *</label>
                      <input
                        type="time"
                        value={formData.scheduledTime}
                        onChange={(e) => handleInputChange('scheduledTime', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">เวลาที่คาดการณ์ (ชั่วโมง) *</label>
                    <input
                      type="number"
                      value={formData.estimatedHours}
                      onChange={(e) => handleInputChange('estimatedHours', parseInt(e.target.value))}
                      min="0.5"
                      step="0.5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ความต้องการของอาสาสมัคร</label>
                    <div className="space-y-2">
                      {requirements.map((requirement) => (
                        <label key={requirement} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={formData.requirements.includes(requirement)}
                            onChange={() => handleRequirementToggle(requirement)}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <span className="text-sm text-gray-700">{requirement}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Summary */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">สรุปข้อมูล</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-medium text-gray-900 mb-2">ข้อมูลงาน</h3>
                    <p className="text-gray-700 mb-2"><strong>ชื่อ:</strong> {formData.title}</p>
                    <p className="text-gray-700 mb-2"><strong>หมวดหมู่:</strong> {categories.find(c => c.id === formData.category)?.name}</p>
                    <p className="text-gray-700"><strong>รายละเอียด:</strong> {formData.description}</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-medium text-gray-900 mb-2">ที่อยู่</h3>
                    <p className="text-gray-700">{formData.address}, {formData.city}, {formData.province} {formData.postalCode}</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-medium text-gray-900 mb-2">เวลา</h3>
                    <p className="text-gray-700">{formData.scheduledDate} เวลา {formData.scheduledTime}</p>
                    <p className="text-gray-700">เวลาที่คาดการณ์: {formData.estimatedHours} ชั่วโมง</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-medium text-gray-900 mb-2">ความต้องการ</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {formData.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex space-x-3">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                ก่อนหน้า
              </button>
            )}
            
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!validateStep(currentStep)}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ถัดไป
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting || !validateStep(4)}
                className="flex-1 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    กำลังสร้าง...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Save className="w-5 h-5 mr-2" />
                    สร้างงาน
                  </div>
                )}
              </button>
            )}
          </div>
        </form>
      </main>

      {/* Mobile Safe Area */}
      <div className="h-6 bg-gray-50 md:hidden"></div>
    </div>
  );
}
