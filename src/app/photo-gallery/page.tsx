'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Image, 
  CheckCircle, 
  X, 
  Clock, 
  User,
  MapPin,
  Calendar,
  MessageSquare,
  Download,
  Eye,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

export default function PhotoGalleryPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get('taskId');
  
  const [photos, setPhotos] = useState<any[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected

  // Mock task data (in production, fetch from API)
  const task = {
    id: taskId || '1',
    title: 'ช่วยพาออกกำลังกาย',
    location: 'กรุงเทพมหานคร',
    date: '25 ส.ค. 2568',
    time: '15.00 - 17.00',
    category: 'ออกกำลังกาย'
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }
    
    if (user) {
      loadPhotos();
    }
  }, [user, loading, router]);

  const loadPhotos = async () => {
    setIsLoading(true);
    
    try {
      // Mock photo data (in production, fetch from API)
      const mockPhotos = [
        {
          id: 1,
          taskId: task.id,
          photoUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
          description: 'ช่วยพาออกกำลังกายที่สวนสุขภาพ กำลังเดินออกกำลังกาย',
          uploadedBy: {
            id: 1,
            name: 'สมชาย ใจดี',
            phone: '0812345678',
            avatar: 'SM'
          },
          uploadedAt: '2024-08-25T15:30:00Z',
          status: 'PENDING', // PENDING, APPROVED, REJECTED
          approvedAt: null,
          approvedBy: null,
          notes: ''
        },
        {
          id: 2,
          taskId: task.id,
          photoUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
          description: 'ช่วยพาออกกำลังกายที่สวนสุขภาพ กำลังทำท่ากายบริหาร',
          uploadedBy: {
            id: 2,
            name: 'สมหญิง รักดี',
            phone: '0823456789',
            avatar: 'SR'
          },
          uploadedAt: '2024-08-25T15:45:00Z',
          status: 'APPROVED',
          approvedAt: '2024-08-25T16:00:00Z',
          approvedBy: user?.id,
          notes: 'รูปภาพชัดเจน แสดงการทำงานจริง'
        },
        {
          id: 3,
          taskId: task.id,
          photoUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
          description: 'ช่วยพาออกกำลังกายที่สวนสุขภาพ กำลังยืดกล้ามเนื้อ',
          uploadedBy: {
            id: 1,
            name: 'สมชาย ใจดี',
            phone: '0812345678',
            avatar: 'SM'
          },
          uploadedAt: '2024-08-25T16:00:00Z',
          status: 'REJECTED',
          approvedAt: null,
          approvedBy: null,
          notes: 'รูปภาพไม่ชัดเจน ไม่เห็นการทำงานจริง'
        }
      ];
      
      setPhotos(mockPhotos);
    } catch (error) {
      console.error('Error loading photos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const approvePhoto = async (photoId: number) => {
    try {
      // In production, this would call the API
      setPhotos(prev => prev.map(photo => 
        photo.id === photoId 
          ? { 
              ...photo, 
              status: 'APPROVED', 
              approvedAt: new Date().toISOString(),
              approvedBy: user?.id
            }
          : photo
      ));
    } catch (error) {
      console.error('Error approving photo:', error);
    }
  };

  const rejectPhoto = async (photoId: number, notes: string) => {
    try {
      // In production, this would call the API
      setPhotos(prev => prev.map(photo => 
        photo.id === photoId 
          ? { 
              ...photo, 
              status: 'REJECTED', 
              notes 
            }
          : photo
      ));
    } catch (error) {
      console.error('Error rejecting photo:', error);
    }
  };

  const openPhotoModal = (photo: any) => {
    setSelectedPhoto(photo);
  };

  const closePhotoModal = () => {
    setSelectedPhoto(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING': return 'รอการยืนยัน';
      case 'APPROVED': return 'ยืนยันแล้ว';
      case 'REJECTED': return 'ไม่ยืนยัน';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredPhotos = photos.filter(photo => {
    if (filter === 'all') return true;
    return photo.status === filter;
  });

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
                  <p className="text-sm text-gray-600">แกลเลอรี่รูปถ่าย</p>
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
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">แกลเลอรี่รูปถ่าย</h2>
          <p className="text-gray-600">ดูและยืนยันรูปถ่ายการทำงานจากจิตอาสา</p>
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

        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                filter === 'all'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              ทั้งหมด ({photos.length})
            </button>
            <button
              onClick={() => setFilter('PENDING')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                filter === 'PENDING'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              รอการยืนยัน ({photos.filter(p => p.status === 'PENDING').length})
            </button>
            <button
              onClick={() => setFilter('APPROVED')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                filter === 'APPROVED'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              ยืนยันแล้ว ({photos.filter(p => p.status === 'APPROVED').length})
            </button>
            <button
              onClick={() => setFilter('REJECTED')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                filter === 'REJECTED'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              ไม่ยืนยัน ({photos.filter(p => p.status === 'REJECTED').length})
            </button>
          </div>
        </div>

        {/* Photo Grid */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">กำลังโหลดรูปถ่าย...</p>
            </div>
          ) : filteredPhotos.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-200">
              <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">ไม่พบรูปถ่ายในหมวดหมู่นี้</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhotos.map((photo) => (
                <div key={photo.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Photo */}
                  <div className="relative group">
                    <img
                      src={photo.photoUrl}
                      alt={photo.description}
                      className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => openPhotoModal(photo)}
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(photo.status)}`}>
                        {getStatusText(photo.status)}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                      <button
                        onClick={() => openPhotoModal(photo)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100"
                      >
                        <Eye className="w-5 h-5 text-gray-700" />
                      </button>
                    </div>
                  </div>

                  {/* Photo Info */}
                  <div className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {photo.uploadedBy.avatar}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{photo.uploadedBy.name}</div>
                        <div className="text-xs text-gray-500">{photo.uploadedBy.phone}</div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{photo.description}</p>
                    
                    <div className="text-xs text-gray-500 mb-4">
                      อัปโหลดเมื่อ: {formatDate(photo.uploadedAt)}
                    </div>

                    {/* Action Buttons */}
                    {photo.status === 'PENDING' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => approvePhoto(photo.id)}
                          className="flex-1 flex items-center justify-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          ยืนยัน
                        </button>
                        <button
                          onClick={() => rejectPhoto(photo.id, 'รูปภาพไม่เหมาะสม')}
                          className="flex-1 flex items-center justify-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                        >
                          <ThumbsDown className="w-4 h-4 mr-1" />
                          ไม่ยืนยัน
                        </button>
                      </div>
                    )}

                    {photo.status === 'REJECTED' && photo.notes && (
                      <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="text-xs font-medium text-red-800 mb-1">เหตุผลที่ไม่ยืนยัน:</div>
                        <div className="text-xs text-red-700">{photo.notes}</div>
                      </div>
                    )}

                    {photo.status === 'APPROVED' && (
                      <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-xs font-medium text-green-800 mb-1">ยืนยันเมื่อ:</div>
                        <div className="text-xs text-green-700">{formatDate(photo.approvedAt)}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">รายละเอียดรูปถ่าย</h3>
                <button
                  onClick={closePhotoModal}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Photo */}
                <div>
                  <img
                    src={selectedPhoto.photoUrl}
                    alt={selectedPhoto.description}
                    className="w-full h-80 object-cover rounded-lg border border-gray-200"
                  />
                </div>

                {/* Photo Details */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">คำอธิบาย:</h4>
                    <p className="text-gray-700">{selectedPhoto.description}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">จิตอาสา:</h4>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {selectedPhoto.uploadedBy.avatar}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{selectedPhoto.uploadedBy.name}</div>
                        <div className="text-sm text-gray-500">{selectedPhoto.uploadedBy.phone}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">ข้อมูล:</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>อัปโหลดเมื่อ: {formatDate(selectedPhoto.uploadedAt)}</div>
                      <div>สถานะ: <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedPhoto.status)}`}>
                        {getStatusText(selectedPhoto.status)}
                      </span></div>
                      {selectedPhoto.approvedAt && (
                        <div>ยืนยันเมื่อ: {formatDate(selectedPhoto.approvedAt)}</div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons for Pending Photos */}
                  {selectedPhoto.status === 'PENDING' && (
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          approvePhoto(selectedPhoto.id);
                          closePhotoModal();
                        }}
                        className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                      >
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        ยืนยันรูปถ่าย
                      </button>
                      <button
                        onClick={() => {
                          rejectPhoto(selectedPhoto.id, 'รูปภาพไม่เหมาะสม');
                          closePhotoModal();
                        }}
                        className="w-full flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                      >
                        <ThumbsDown className="w-4 h-4 mr-2" />
                        ไม่ยืนยันรูปถ่าย
                      </button>
                    </div>
                  )}

                  {/* Download Button */}
                  <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    <Download className="w-4 h-4 mr-2" />
                    ดาวน์โหลดรูปถ่าย
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
