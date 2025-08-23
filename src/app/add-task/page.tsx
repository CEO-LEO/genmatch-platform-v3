'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Users,
  FileText,
  Plus,
  X
} from 'lucide-react';

export default function AddTaskPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    date: '',
    time: '',
    maxVolunteers: 1,
    requirements: '',
    contactPhone: '',
    contactEmail: ''
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const categories = [
    { id: 'hospital', name: 'โรงพยาบาล', color: 'bg-red-500' },
    { id: 'temple', name: 'วัด', color: 'bg-yellow-500' },
    { id: 'physical', name: 'งานใช้แรงกาย', color: 'bg-green-500' },
    { id: 'repair', name: 'งานซ่อมแซม', color: 'bg-blue-500' },
    { id: 'education', name: 'การศึกษา', color: 'bg-purple-500' },
    { id: 'elderly-care', name: 'การดูแลผู้สูงอายุ', color: 'bg-pink-500' }
  ];

  const tags = [
    'เร่งด่วน', 'ใช้รถ', 'กลางแจ้ง', 'ในร่ม', 'ใช้เครื่องมือ', 'สอนงาน', 'ดูแลเด็ก'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: ส่งข้อมูลไปยัง API
    console.log('Form submitted:', formData);
    router.push('/my-tasks');
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900">สร้างงานจิตอาสาใหม่</h1>
            <p className="text-sm text-gray-500">เพิ่มงานที่ต้องการความช่วยเหลือ</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 pb-24">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลพื้นฐาน</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ชื่องานจิตอาสา *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="เช่น พาไปตรวจสุขภาพที่โรงพยาบาล"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  รายละเอียดงาน *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="อธิบายรายละเอียดงานที่ต้องการความช่วยเหลือ..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  หมวดหมู่ *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setFormData({...formData, category: category.id})}
                      className={`p-3 rounded-lg border-2 text-left transition-colors ${
                        formData.category === category.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center mb-2`}>
                        <span className="text-white text-sm font-bold">
                          {category.name.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Location & Time */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">สถานที่และเวลา</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  สถานที่ *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="เช่น โรงพยาบาลมหิดล, สวนลุมพินี"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    วันที่ *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    เวลา *
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Requirements & Contact */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">ข้อกำหนดและติดต่อ</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-2" />
                  จำนวนจิตอาสาที่ต้องการ
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.maxVolunteers}
                  onChange={(e) => setFormData({...formData, maxVolunteers: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="w-4 h-4 inline mr-2" />
                  ข้อกำหนดพิเศษ
                </label>
                <textarea
                  rows={3}
                  value={formData.requirements}
                  onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="เช่น ต้องการจิตอาสาที่มีรถ, มีประสบการณ์ดูแลผู้สูงอายุ..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  แท็ก (Tags)
                </label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedTags.includes(tag)
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    เบอร์โทรติดต่อ
                  </label>
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="081-xxx-xxxx"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    อีเมล
                  </label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="example@email.com"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="sticky bottom-20 bg-white border-t border-gray-200 px-4 py-4 -mx-4">
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-purple-700 transition-colors shadow-lg"
            >
              สร้างงานจิตอาสา
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
