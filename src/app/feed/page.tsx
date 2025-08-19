'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  Heart, 
  MessageCircle, 
  Share, 
  MapPin, 
  Clock, 
  User,
  ArrowLeft,
  Filter,
  Search,
  Calendar,
  Star
} from 'lucide-react';
import Link from 'next/link';

interface FeedPost {
  id: string;
  type: 'TASK_COMPLETED' | 'NEW_ACHIEVEMENT' | 'COMMUNITY_HIGHLIGHT' | 'TIPS';
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    userType: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
  shares: number;
  image?: string;
  tags: string[];
  location?: string;
  taskDetails?: {
    title: string;
    category: string;
    hours: number;
    rating: number;
  };
}

export default function Feed() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'TASK_COMPLETED' | 'ACHIEVEMENT' | 'COMMUNITY'>('ALL');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
      loadFeedPosts();
    }
  }, [user, loading, router]);

  const loadFeedPosts = async () => {
    try {
      // Mock data for demo
      const mockPosts: FeedPost[] = [
        {
          id: '1',
          type: 'TASK_COMPLETED',
          title: 'งานเสร็จสิ้น! พาไปตรวจสุขภาพที่โรงพยาบาล',
          content: 'วันนี้ได้ช่วยคุณยายไปตรวจสุขภาพที่โรงพยาบาลมหาราช ใช้เวลา 3 ชั่วโมง ได้รับประสบการณ์ที่ดีมาก และได้เรียนรู้การดูแลผู้สูงอายุมากขึ้น',
          author: {
            id: 'student-1',
            name: 'คุณสมชาย ใจดี',
            avatar: '👨‍🎓',
            userType: 'STUDENT'
          },
          createdAt: '2024-01-20T10:30:00Z',
          likes: 24,
          comments: 8,
          shares: 3,
          image: '🏥',
          tags: ['โรงพยาบาล', 'สุขภาพ', 'ผู้สูงอายุ'],
          location: 'โรงพยาบาลมหาราช, กรุงเทพฯ',
          taskDetails: {
            title: 'พาไปตรวจสุขภาพที่โรงพยาบาล',
            category: 'โรงพยาบาล',
            hours: 3,
            rating: 5
          }
        },
        {
          id: '2',
          type: 'NEW_ACHIEVEMENT',
          title: 'ได้รับความสำเร็จใหม่: จิตอาสา 10 ชั่วโมง! 🏆',
          content: 'ยินดีด้วย! คุณได้สะสมชั่วโมงจิตอาสาได้ 10 ชั่วโมงแล้ว นี่เป็นก้าวสำคัญในการเป็นจิตอาสาที่ดี',
          author: {
            id: 'system',
            name: 'GenMatch System',
            avatar: '🤖',
            userType: 'SYSTEM'
          },
          createdAt: '2024-01-19T16:45:00Z',
          likes: 45,
          comments: 12,
          shares: 7,
          tags: ['ความสำเร็จ', 'จิตอาสา', '10 ชั่วโมง']
        },
        {
          id: '3',
          type: 'COMMUNITY_HIGHLIGHT',
          title: 'เรื่องราวดีๆ จากชุมชน: การช่วยเหลือกันในยามวิกฤต',
          content: 'ในช่วงที่เกิดน้ำท่วมในพื้นที่บางนา ชุมชนของเราได้รวมตัวกันช่วยเหลือผู้ประสบภัย โดยมีจิตอาสาหลายคนเข้ามาช่วยเหลืออย่างไม่เห็นแก่ตัว',
          author: {
            id: 'community',
            name: 'ชุมชนบางนา',
            avatar: '🏘️',
            userType: 'COMMUNITY'
          },
          createdAt: '2024-01-18T14:20:00Z',
          likes: 89,
          comments: 23,
          shares: 15,
          image: '🌊',
          tags: ['ชุมชน', 'น้ำท่วม', 'ช่วยเหลือ', 'จิตอาสา'],
          location: 'บางนา, กรุงเทพฯ'
        },
        {
          id: '4',
          type: 'TIPS',
          title: 'เคล็ดลับการเป็นจิตอาสาที่ดี: การสื่อสารกับผู้สูงอายุ',
          content: 'การสื่อสารกับผู้สูงอายุต้องใช้ความอดทนและความเข้าใจ ควรพูดช้าๆ ชัดเจน และให้ความเคารพเสมอ',
          author: {
            id: 'expert-1',
            name: 'คุณหมอสมศรี ผู้เชี่ยวชาญ',
            avatar: '👩‍⚕️',
            userType: 'EXPERT'
          },
          createdAt: '2024-01-17T11:15:00Z',
          likes: 67,
          comments: 18,
          shares: 9,
          tags: ['เคล็ดลับ', 'การสื่อสาร', 'ผู้สูงอายุ', 'จิตอาสา']
        },
        {
          id: '5',
          type: 'TASK_COMPLETED',
          title: 'ช่วยซ่อมคอมพิวเตอร์ให้คุณลุงสำเร็จ! 💻',
          content: 'ได้ช่วยคุณลุงซ่อมคอมพิวเตอร์ที่เสีย ใช้เวลา 2 ชั่วโมง ได้รับความรู้ใหม่ๆ และได้เห็นรอยยิ้มของคุณลุง',
          author: {
            id: 'student-2',
            name: 'คุณสมหญิง รักดี',
            avatar: '👩‍🎓',
            userType: 'STUDENT'
          },
          createdAt: '2024-01-16T15:30:00Z',
          likes: 31,
          comments: 6,
          shares: 2,
          image: '💻',
          tags: ['งานซ่อม', 'คอมพิวเตอร์', 'ผู้สูงอายุ'],
          location: 'บ้านคุณลุง, กรุงเทพฯ',
          taskDetails: {
            title: 'ช่วยซ่อมคอมพิวเตอร์',
            category: 'งานซ่อม',
            hours: 2,
            rating: 5
          }
        }
      ];
      
      setPosts(mockPosts);
    } catch (error) {
      console.error('Failed to load feed posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'TASK_COMPLETED': return '✅';
      case 'NEW_ACHIEVEMENT': return '🏆';
      case 'COMMUNITY_HIGHLIGHT': return '🌟';
      case 'TIPS': return '💡';
      default: return '📝';
    }
  };

  const getPostColor = (type: string) => {
    switch (type) {
      case 'TASK_COMPLETED': return 'from-green-500 to-emerald-500';
      case 'NEW_ACHIEVEMENT': return 'from-yellow-500 to-orange-500';
      case 'COMMUNITY_HIGHLIGHT': return 'from-blue-500 to-indigo-500';
      case 'TIPS': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getPostTypeLabel = (type: string) => {
    switch (type) {
      case 'TASK_COMPLETED': return 'งานเสร็จสิ้น';
      case 'NEW_ACHIEVEMENT': return 'ความสำเร็จใหม่';
      case 'COMMUNITY_HIGHLIGHT': return 'ไฮไลท์ชุมชน';
      case 'TIPS': return 'เคล็ดลับ';
      default: return 'โพสต์';
    }
  };

  const filteredPosts = posts.filter(post => {
    if (filter === 'ALL') return true;
    if (filter === 'TASK_COMPLETED') return post.type === 'TASK_COMPLETED';
    if (filter === 'ACHIEVEMENT') return post.type === 'NEW_ACHIEVEMENT';
    if (filter === 'COMMUNITY') return post.type === 'COMMUNITY_HIGHLIGHT';
    return true;
  });

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
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900">
      {/* Header */}
      <div className="glass-card mx-4 mt-4 p-6">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="text-white hover:text-pink-300 transition-colors">
            <ArrowLeft className="w-5 h-5 inline mr-2" />
            กลับไปหน้าแรก
          </Link>
          <h1 className="text-3xl font-bold text-white">ฟีดชุมชน</h1>
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-pink-400" />
            <span className="text-white/70">เรื่องราวและข่าวสาร</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-6 px-4">
        {/* Filters */}
        <div className="glass-card p-4 mb-6">
          <div className="flex justify-center">
            <div className="flex bg-white/10 rounded-lg p-1">
              {[
                { key: 'ALL', label: 'ทั้งหมด', count: posts.length },
                { key: 'TASK_COMPLETED', label: 'งานเสร็จสิ้น', count: posts.filter(p => p.type === 'TASK_COMPLETED').length },
                { key: 'ACHIEVEMENT', label: 'ความสำเร็จ', count: posts.filter(p => p.type === 'NEW_ACHIEVEMENT').length },
                { key: 'COMMUNITY', label: 'ชุมชน', count: posts.filter(p => p.type === 'COMMUNITY_HIGHLIGHT').length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as any)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    filter === tab.key
                      ? 'bg-pink-500 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feed Posts */}
        {isLoading ? (
          <div className="glass-card p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-400 mx-auto mb-4"></div>
            <p className="text-white">กำลังโหลดฟีด...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-white/40" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">ไม่มีโพสต์</h3>
            <p className="text-white/60">
              {filter === 'ALL' 
                ? 'ยังไม่มีโพสต์ในชุมชน' 
                : `ไม่มีโพสต์ในหมวดหมู่ "${filter}"`
              }
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <div key={post.id} className="glass-card p-6 hover:scale-105 transition-transform">
                {/* Post Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${getPostColor(post.type)} rounded-xl flex items-center justify-center text-2xl`}>
                    {post.image || getPostIcon(post.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getPostColor(post.type)} text-white`}>
                        {getPostTypeLabel(post.type)}
                      </span>
                      {post.location && (
                        <div className="flex items-center text-white/60 text-xs">
                          <MapPin className="w-3 h-3 mr-1" />
                          {post.location}
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-2">{post.title}</h3>
                    
                    <div className="flex items-center text-white/60 text-sm">
                      <User className="w-4 h-4 mr-2" />
                      {post.author.name}
                      <span className="mx-2">•</span>
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.createdAt).toLocaleDateString('th-TH')}
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-white/80 mb-4 leading-relaxed">{post.content}</p>

                {/* Task Details (if applicable) */}
                {post.taskDetails && (
                  <div className="bg-white/10 rounded-lg p-4 mb-4">
                    <h4 className="text-white font-medium mb-2">รายละเอียดงาน</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-white/60">ชื่องาน:</span>
                        <span className="text-white ml-2">{post.taskDetails.title}</span>
                      </div>
                      <div>
                        <span className="text-white/60">หมวดหมู่:</span>
                        <span className="text-white ml-2">{post.taskDetails.category}</span>
                      </div>
                      <div>
                        <span className="text-white/60">เวลา:</span>
                        <span className="text-white ml-2">{post.taskDetails.hours} ชั่วโมง</span>
                      </div>
                      <div>
                        <span className="text-white/60">คะแนน:</span>
                        <div className="flex items-center ml-2">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-white">{post.taskDetails.rating}/5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/10 text-white/70 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center text-white/70 hover:text-pink-400 transition-colors">
                      <Heart className="w-5 h-5 mr-2" />
                      {post.likes}
                    </button>
                    
                    <button className="flex items-center text-white/70 hover:text-blue-400 transition-colors">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      {post.comments}
                    </button>
                    
                    <button className="flex items-center text-white/70 hover:text-green-400 transition-colors">
                      <Share className="w-5 h-5 mr-2" />
                      {post.shares}
                    </button>
                  </div>
                  
                  <div className="text-white/50 text-xs">
                    {new Date(post.createdAt).toLocaleTimeString('th-TH', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="glass-card p-6 mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">การดำเนินการด่วน</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/add-task" className="glass-button-secondary p-4 text-center hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">สร้างงานใหม่</h4>
              <p className="text-white/70 text-sm">โพสต์งานที่ต้องการความช่วยเหลือ</p>
            </Link>
            
            <Link href="/search" className="glass-button-secondary p-4 text-center hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">ค้นหางาน</h4>
              <p className="text-white/70 text-sm">หางานที่เหมาะสมกับคุณ</p>
            </Link>
            
            <Link href="/achievements" className="glass-button-secondary p-4 text-center hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">ความสำเร็จ</h4>
              <p className="text-white/70 text-sm">ดูความสำเร็จและรางวัล</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
