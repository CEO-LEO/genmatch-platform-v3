'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Star, 
  MessageSquare, 
  CheckCircle, 
  Clock,
  User,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

export default function RatingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get('taskId');
  
  const [ratings, setRatings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [category, setCategory] = useState('QUALITY');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock task data
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
      loadRatings();
    }
  }, [user, loading, router]);

  const loadRatings = async () => {
    setIsLoading(true);
    
    try {
      // Mock ratings data
      const mockRatings = [
        {
          id: 1,
          taskId: task.id,
          raterId: 1,
          ratedUserId: 2,
          rating: 5,
          review: 'จิตอาสาทำงานได้ดีมาก ตรงเวลาและมีทักษะดี',
          category: 'QUALITY',
          createdAt: '2024-08-25T16:00:00Z',
          raterFirstName: 'สมชาย',
          raterLastName: 'ใจดี',
          ratedFirstName: 'สมหญิง',
          ratedLastName: 'รักดี',
          taskTitle: task.title
        },
        {
          id: 2,
          taskId: task.id,
          raterId: 2,
          ratedUserId: 1,
          rating: 4,
          review: 'งานเสร็จเรียบร้อยดี แต่ใช้เวลานานกว่าที่คาดไว้',
          category: 'TIMELINESS',
          createdAt: '2024-08-25T15:30:00Z',
          raterFirstName: 'สมหญิง',
          raterLastName: 'รักดี',
          ratedFirstName: 'สมชาย',
          ratedLastName: 'ใจดี',
          taskTitle: task.title
        }
      ];
      
      setRatings(mockRatings);
    } catch (error) {
      console.error('Error loading ratings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitRating = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!review.trim()) {
      alert('กรุณาเขียนรีวิว');
      return;
    }

    setIsSubmitting(true);

    try {
      // In production, this would call the API
      const newRating = {
        id: ratings.length + 1,
        taskId: task.id,
        raterId: user?.id,
        ratedUserId: 2, // Mock rated user
        rating,
        review,
        category,
        createdAt: new Date().toISOString(),
        raterFirstName: user?.firstName,
        raterLastName: user?.lastName,
        ratedFirstName: 'สมหญิง',
        ratedLastName: 'รักดี',
        taskTitle: task.title
      };

      setRatings(prev => [newRating, ...prev]);
      setShowRatingForm(false);
      setRating(5);
      setReview('');
      setCategory('QUALITY');

      // Show success message
      alert('ให้คะแนนสำเร็จ!');
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('เกิดข้อผิดพลาดในการให้คะแนน');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'QUALITY': return 'คุณภาพงาน';
      case 'TIMELINESS': return 'ความตรงเวลา';
      case 'COMMUNICATION': return 'การสื่อสาร';
      case 'ATTITUDE': return 'ทัศนคติ';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'QUALITY': return 'bg-blue-100 text-blue-800';
      case 'TIMELINESS': return 'bg-green-100 text-green-800';
      case 'COMMUNICATION': return 'bg-purple-100 text-purple-800';
      case 'ATTITUDE': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
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
                  <p className="text-sm text-gray-600">คะแนนและรีวิว</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowRatingForm(true)}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                <Star className="w-4 h-4 mr-2 inline" />
                ให้คะแนน
              </button>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">คะแนนและรีวิว</h2>
          <p className="text-gray-600">ให้คะแนนและรีวิวการทำงานของจิตอาสา</p>
        </div>

        {/* Task Info Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลงาน</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2 text-gray-600 p-3 bg-gray-50 rounded-lg">
              <CheckCircle className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">{task.title}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 p-3 bg-gray-50 rounded-lg">
              <Clock className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">{task.date}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 p-3 bg-gray-50 rounded-lg">
              <User className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">{task.category}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 p-3 bg-gray-50 rounded-lg">
              <MessageSquare className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">{ratings.length} รีวิว</span>
            </div>
          </div>
        </div>

        {/* Rating Form Modal */}
        {showRatingForm && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">ให้คะแนนจิตอาสา</h3>
                  <button
                    onClick={() => setShowRatingForm(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSubmitRating} className="space-y-6">
                  {/* Rating Stars */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      คะแนนรวม
                    </label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`p-2 rounded-lg transition-colors ${
                            star <= rating
                              ? 'text-yellow-500 hover:text-yellow-600'
                              : 'text-gray-300 hover:text-gray-400'
                          }`}
                        >
                          <Star className="w-8 h-8 fill-current" />
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      คะแนน: {rating}/5
                    </p>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      หมวดหมู่การประเมิน
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      required
                    >
                      <option value="QUALITY">คุณภาพงาน</option>
                      <option value="TIMELINESS">ความตรงเวลา</option>
                      <option value="COMMUNICATION">การสื่อสาร</option>
                      <option value="ATTITUDE">ทัศนคติ</option>
                    </select>
                  </div>

                  {/* Review */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      รีวิว
                    </label>
                    <textarea
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      placeholder="เขียนรีวิวการทำงานของจิตอาสา..."
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'กำลังส่ง...' : 'ส่งคะแนน'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowRatingForm(false)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      ยกเลิก
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Ratings List */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">กำลังโหลดคะแนน...</p>
            </div>
          ) : ratings.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-200">
              <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">ยังไม่มีคะแนนสำหรับงานนี้</p>
              <button
                onClick={() => setShowRatingForm(true)}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                ให้คะแนนแรก
              </button>
            </div>
          ) : (
            ratings.map((rating) => (
              <div key={rating.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {rating.raterFirstName.charAt(0)}{rating.raterLastName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {rating.raterFirstName} {rating.raterLastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        ให้คะแนน {rating.ratedFirstName} {rating.ratedLastName}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(rating.category)}`}>
                      {getCategoryText(rating.category)}
                    </span>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= rating.rating
                              ? 'text-yellow-500 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-700">{rating.review}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>งาน: {rating.taskTitle}</span>
                  <span>{formatDate(rating.createdAt)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
