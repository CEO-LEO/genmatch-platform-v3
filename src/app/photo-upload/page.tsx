'use client';

import { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Camera, 
  Upload, 
  Image, 
  X, 
  CheckCircle,
  AlertCircle,
  MapPin,
  Calendar,
  Clock,
  MessageSquare
} from 'lucide-react';

export default function PhotoUploadPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get('taskId');
  
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Mock task data (in production, fetch from API)
  const task = {
    id: taskId || '1',
    title: 'ช่วยพาออกกำลังกาย',
    location: 'กรุงเทพมหานคร',
    date: '25 ส.ค. 2568',
    time: '15.00 - 17.00',
    category: 'ออกกำลังกาย'
  };

  const handlePhotoSelect = (files: FileList | null) => {
    if (!files) return;
    
    const newPhotos: File[] = [];
    const newPreviews: string[] = [];
    
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        newPhotos.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          newPreviews.push(e.target?.result as string);
          setPhotoPreviews([...photoPreviews, ...newPreviews]);
        };
        reader.readAsDataURL(file);
      }
    });
    
    setSelectedPhotos(prev => [...prev, ...newPhotos]);
  };

  const removePhoto = (index: number) => {
    setSelectedPhotos(prev => prev.filter((_, i) => i !== index));
    setPhotoPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const openCamera = () => {
    cameraInputRef.current?.click();
  };

  const openGallery = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedPhotos.length === 0) {
      setMessage({ type: 'error', text: 'กรุณาเลือกรูปถ่ายอย่างน้อย 1 รูป' });
      return;
    }

    if (!description.trim()) {
      setMessage({ type: 'error', text: 'กรุณาเขียนคำอธิบายรูปถ่าย' });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setUploadProgress(i);
      }

      // In production, this would upload to server/storage
      const uploadData = {
        taskId: task.id,
        photos: selectedPhotos,
        description,
        uploadedBy: user?.id,
        uploadedAt: new Date().toISOString()
      };

      console.log('Uploading photos:', uploadData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMessage({ 
        type: 'success', 
        text: 'อัปโหลดรูปถ่ายสำเร็จ! รอการยืนยันจากผู้สร้างงาน' 
      });

      // Reset form
      setSelectedPhotos([]);
      setPhotoPreviews([]);
      setDescription('');
      setUploadProgress(0);

    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'เกิดข้อผิดพลาดในการอัปโหลด กรุณาลองใหม่อีกครั้ง' 
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">GM</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">GenMatch</h1>
                  <p className="text-sm text-gray-600">อัปโหลดรูปถ่าย</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <Link 
                href={`/task-management?taskId=${task.id}`}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                จัดการงาน
              </Link>
              <Link 
                href="/dashboard"
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2 inline" />
                กลับแดชบอร์ด
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">อัปโหลดรูปถ่าย</h2>
          <p className="text-gray-600">แสดงรูปถ่ายการทำงานเพื่อยืนยันสถานะงาน</p>
        </div>

        {/* Task Info Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลงาน</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2 text-gray-600 p-3 bg-gray-50 rounded-lg">
              <MapPin className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">{task.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">{task.date}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 p-3 bg-gray-50 rounded-lg">
              <Clock className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">{task.time}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 p-3 bg-gray-50 rounded-lg">
              <CheckCircle className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">{task.category}</span>
            </div>
          </div>
          <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="font-medium text-purple-900 mb-2">ชื่องาน:</h4>
            <p className="text-purple-800">{task.title}</p>
          </div>
        </div>

        {/* Photo Upload Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {/* Photo Selection */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Camera className="w-6 h-6 text-purple-600 mr-3" />
              เลือกรูปถ่าย
            </h3>
            
            {/* Upload Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                type="button"
                onClick={openCamera}
                className="flex-1 flex items-center justify-center p-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl hover:from-green-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                <Camera className="w-5 h-5 mr-2" />
                ถ่ายรูปใหม่
              </button>
              <button
                type="button"
                onClick={openGallery}
                className="flex-1 flex items-center justify-center p-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                <Upload className="w-5 h-5 mr-2" />
                เลือกจากแกลเลอรี่
              </button>
            </div>

            {/* Hidden Inputs */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handlePhotoSelect(e.target.files)}
              className="hidden"
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(e) => handlePhotoSelect(e.target.files)}
              className="hidden"
            />

            {/* Photo Preview Grid */}
            {photoPreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photoPreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                      รูปที่ {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Progress */}
            {isUploading && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">กำลังอัปโหลด...</span>
                  <span className="text-sm font-medium text-purple-600">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <MessageSquare className="w-6 h-6 text-purple-600 mr-3" />
              คำอธิบายรูปถ่าย
            </h3>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              placeholder="อธิบายสิ่งที่คุณทำในรูปถ่าย เช่น 'ช่วยพาออกกำลังกายที่สวนสุขภาพ', 'ซ่อมแซมประตูบ้าน'"
              required
            />
            <p className="text-sm text-gray-500 mt-2">
              คำอธิบายจะช่วยให้ผู้สร้างงานเข้าใจการทำงานของคุณได้ดีขึ้น
            </p>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`mb-6 p-6 rounded-xl border-2 ${
              message.type === 'success' 
                ? 'bg-green-50 border-green-300 text-green-800' 
                : 'bg-red-50 border-red-300 text-red-800'
            }`}>
              <div className="flex items-center justify-center">
                <span className="text-2xl mr-3">
                  {message.type === 'success' ? '🎉' : '⚠️'}
                </span>
                <div className="text-center">
                  <div className="font-bold text-lg mb-1">
                    {message.type === 'success' ? 'อัปโหลดสำเร็จ!' : 'เกิดข้อผิดพลาด'}
                  </div>
                  <div className="text-base">{message.text}</div>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isUploading || selectedPhotos.length === 0}
              className={`px-12 py-4 text-white text-lg font-bold rounded-xl transition-all duration-200 transform hover:scale-105 ${
                isUploading || selectedPhotos.length === 0
                  ? 'bg-gray-400 cursor-not-allowed shadow-md' 
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {isUploading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  กำลังอัปโหลด...
                </div>
              ) : (
                'อัปโหลดรูปถ่าย'
              )}
            </button>
          </div>
        </form>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            เคล็ดลับการถ่ายรูปที่ดี
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <h4 className="font-medium mb-2">✅ ควรทำ:</h4>
              <ul className="space-y-1">
                <li>• ถ่ายรูปขณะทำงานจริง</li>
                <li>• แสดงสถานที่และกิจกรรม</li>
                <li>• รูปภาพชัดเจน สว่างเพียงพอ</li>
                <li>• ถ่ายหลายมุมเพื่อให้เห็นภาพรวม</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">❌ ไม่ควรทำ:</h4>
              <ul className="space-y-1">
                <li>• รูปภาพที่ไม่เกี่ยวข้องกับงาน</li>
                <li>• รูปภาพที่มืดหรือไม่ชัดเจน</li>
                <li>• รูปภาพส่วนตัวที่ไม่เหมาะสม</li>
                <li>• รูปภาพที่ถ่ายจากอินเทอร์เน็ต</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
