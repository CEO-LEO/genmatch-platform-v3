'use client';

import { useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ArrowLeft,
  Camera,
  Upload,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon
} from 'lucide-react';
import Link from 'next/link';

export default function TaskCompletionPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-400 mx-auto"></div>
          <p className="mt-4 text-lg text-white">กรุณารอสักครู่...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newPhotos = [...photos, ...files];
      setPhotos(newPhotos);
      
      // Create preview URLs
      const newUrls = files.map(file => URL.createObjectURL(file));
      setPhotoUrls([...photoUrls, ...newUrls]);
    }
  };

  const takePhoto = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (cameraRef.current) {
            cameraRef.current.srcObject = stream;
            setShowCamera(true);
          }
        })
        .catch(err => {
          console.error('Camera error:', err);
          alert('ไม่สามารถเปิดกล้องได้ กรุณาใช้การอัปโหลดรูปภาพแทน');
        });
    }
  };

  const capturePhoto = () => {
    if (cameraRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = cameraRef.current.videoWidth;
      canvas.height = cameraRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(cameraRef.current, 0, 0);
        canvas.toBlob(blob => {
          if (blob) {
            const file = new File([blob], `photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
            setPhotos([...photos, file]);
            setPhotoUrls([...photoUrls, URL.createObjectURL(blob)]);
            setShowCamera(false);
            
            // Stop camera stream
            const stream = cameraRef.current?.srcObject as MediaStream;
            if (stream) {
              stream.getTracks().forEach(track => track.stop());
            }
          }
        }, 'image/jpeg');
      }
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    const newUrls = photoUrls.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    setPhotoUrls(newUrls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (photos.length === 0) {
      setError('กรุณาถ่ายรูปหรืออัปโหลดรูปภาพอย่างน้อย 1 รูป');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
      setTimeout(() => {
        router.push('/my-tasks');
      }, 2000);
      
    } catch (error) {
      setError('เกิดข้อผิดพลาดในการปิดงาน กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 flex items-center justify-center">
        <div className="glass-card p-8 text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-white mb-4">ปิดงานสำเร็จ!</h1>
          <p className="text-white/70 mb-6">รูปภาพหลักฐานถูกบันทึกเรียบร้อยแล้ว</p>
          <div className="animate-pulse text-white">กำลังกลับไปหน้า My Tasks...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700">
      {/* Header */}
      <div className="glass-card mx-4 mt-4 p-6">
        <div className="flex items-center justify-between">
          <Link href={`/task/${params.id}`} className="text-white hover:text-pink-300 transition-colors">
            <ArrowLeft className="w-5 h-5 inline mr-2" />
            กลับไปรายละเอียดงาน
          </Link>
          <h1 className="text-3xl font-bold text-white">ปิดงาน</h1>
          <div className="w-32"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-6 px-4">
        {/* Task Completion Form */}
        <div className="glass-card p-8 mb-6">
          <h2 className="text-2xl font-bold text-white mb-6">ถ่ายรูปหลักฐานการทำงาน</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo Capture Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={takePhoto}
                  className="glass-button px-6 py-3 flex items-center"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  เปิดกล้อง
                </button>
                
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="glass-button-secondary px-6 py-3 flex items-center"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  อัปโหลดรูป
                </button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>

              {/* Camera View */}
              {showCamera && (
                <div className="bg-black rounded-lg p-4">
                  <video
                    ref={cameraRef}
                    autoPlay
                    playsInline
                    className="w-full max-w-md mx-auto rounded-lg"
                  />
                  <div className="flex justify-center mt-4 gap-4">
                    <button
                      type="button"
                      onClick={capturePhoto}
                      className="glass-button px-6 py-2"
                    >
                      ถ่ายรูป
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowCamera(false);
                        const stream = cameraRef.current?.srcObject as MediaStream;
                        if (stream) {
                          stream.getTracks().forEach(track => track.stop());
                        }
                      }}
                      className="glass-button-secondary px-6 py-2"
                    >
                      ปิดกล้อง
                    </button>
                  </div>
                </div>
              )}

              {/* Photo Preview */}
              {photoUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {photoUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Instructions */}
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">คำแนะนำการถ่ายรูป:</h3>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>• ถ่ายรูปสถานที่ที่ทำงานเสร็จแล้ว</li>
                  <li>• ถ่ายรูปผลงานที่เสร็จสิ้น</li>
                  <li>• ถ่ายรูปร่วมกับผู้สูงอายุ (ถ้าเป็นไปได้)</li>
                  <li>• อย่างน้อย 1 รูป เพื่อเป็นหลักฐาน</li>
                </ul>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
                  <p className="text-red-300">{error}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || photos.length === 0}
              className={`w-full font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 text-lg ${
                isLoading || photos.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 hover:shadow-xl hover:scale-105'
              } text-white`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  กำลังปิดงาน...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  ปิดงานและบันทึกหลักฐาน
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
