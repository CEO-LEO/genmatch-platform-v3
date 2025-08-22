'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  MoreVertical,
  User,
  MapPin,
  Clock,
  Star,
  Award,
  CheckCircle,
  TrendingUp,
  Filter,
  Search,
  ChevronRight,
  Eye,
  ThumbsUp,
  Bookmark
} from 'lucide-react';
import Link from 'next/link';

interface FeedItem {
  id: string;
  type: 'TASK_COMPLETED' | 'ACHIEVEMENT' | 'STORY' | 'UPDATE' | 'TIPS';
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    userType: string;
    rating: number;
  };
  location?: string;
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isBookmarked: boolean;
  images?: string[];
  tags: string[];
  category: string;
}

export default function FeedPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'tasks' | 'achievements' | 'stories'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }
    if (user) {
      loadFeed();
    }
  }, [user, loading, router]);

  const loadFeed = async () => {
    try {
      // Mock feed data
      const mockFeedItems: FeedItem[] = [
        {
          id: '1',
          type: 'TASK_COMPLETED',
          title: 'งานเสร็จสิ้น: ช่วยซื้อของที่ซุปเปอร์มาร์เก็ต',
          content: 'วันนี้ได้ช่วยคุณยายสมศรีไปซื้อของที่ซุปเปอร์มาร์เก็ต เซ็นทรัลเวิลด์ ใช้เวลาประมาณ 2 ชั่วโมง ได้ช่วยเลือกผักผลไม้และของใช้ในบ้านต่างๆ รู้สึกดีใจที่ได้ช่วยเหลือผู้สูงอายุ และได้รับประสบการณ์ที่ดีมาก',
          author: {
            id: 'student-1',
            name: 'น้องใหม่ จิตอาสา',
            avatar: '👨‍🎓',
            userType: 'STUDENT',
            rating: 4.9
          },
          location: 'เซ็นทรัลเวิลด์, กรุงเทพฯ',
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          likes: 24,
          comments: 8,
          shares: 3,
          isLiked: false,
          isBookmarked: false,
          images: ['https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=ซุปเปอร์มาร์เก็ต'],
          tags: ['จิตอาสา', 'ผู้สูงอายุ', 'ซื้อของ'],
          category: 'EXERCISE'
        },
        {
          id: '2',
          type: 'ACHIEVEMENT',
          title: '🎉 ยินดีด้วย! คุณสมศรี ได้รับรางวัล "จิตอาสาดีเด่น"',
          content: 'ขอแสดงความยินดีกับคุณสมศรี ใจดี ที่ได้รับรางวัลจิตอาสาดีเด่นประจำเดือน มกราคม 2024 จากผลงานการช่วยเหลือนักศึกษามากกว่า 20 คน และสร้างงานจิตอาสามากกว่า 50 งาน',
          author: {
            id: 'system',
            name: 'GenMatch Team',
            avatar: '🤖',
            userType: 'SYSTEM',
            rating: 5.0
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
          likes: 156,
          comments: 23,
          shares: 45,
          isLiked: true,
          isBookmarked: false,
          images: ['https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=รางวัล'],
          tags: ['รางวัล', 'ความสำเร็จ', 'จิตอาสา'],
          category: 'ACHIEVEMENT'
        },
        {
          id: '3',
          type: 'STORY',
          title: 'เรื่องราวดีๆ: การเดินทางของจิตอาสา',
          content: 'อยากแชร์ประสบการณ์การเป็นจิตอาสาตลอด 6 เดือนที่ผ่านมา เริ่มต้นจากความไม่รู้ว่าจะช่วยอะไรได้ จนตอนนี้ได้ช่วยเหลือผู้สูงอายุไปแล้วมากกว่า 30 คน ได้เรียนรู้ว่าการให้ไม่ใช่แค่การช่วยเหลือ แต่เป็นการเรียนรู้ชีวิตและสร้างมิตรภาพใหม่ๆ',
          author: {
            id: 'student-2',
            name: 'จิตอาสา ตัวจริง',
            avatar: '👩‍🎓',
            userType: 'STUDENT',
            rating: 4.8
          },
          location: 'กรุงเทพฯ',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          likes: 89,
          comments: 15,
          shares: 12,
          isLiked: false,
          isBookmarked: true,
          images: [
            'https://via.placeholder.com/400x300/10B981/FFFFFF?text=ประสบการณ์',
            'https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=มิตรภาพ'
          ],
          tags: ['ประสบการณ์', 'การเรียนรู้', 'มิตรภาพ'],
          category: 'STORY'
        },
        {
          id: '4',
          type: 'TIPS',
          title: '💡 เคล็ดลับการเป็นจิตอาสาที่ดี',
          content: '1. ตั้งใจฟังและเข้าใจความต้องการของผู้สูงอายุ\n2. มีความอดทนและใจเย็น\n3. ทำงานอย่างมีระบบและเป็นระเบียบ\n4. สื่อสารอย่างชัดเจนและสุภาพ\n5. เก็บหลักฐานการทำงานอย่างครบถ้วน',
          author: {
            id: 'expert',
            name: 'ผู้เชี่ยวชาญจิตอาสา',
            avatar: '👨‍🏫',
            userType: 'EXPERT',
            rating: 4.9
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
          likes: 234,
          comments: 31,
          shares: 67,
          isLiked: true,
          isBookmarked: false,
          tags: ['เคล็ดลับ', 'คำแนะนำ', 'จิตอาสา'],
          category: 'TIPS'
        }
      ];
      
      setFeedItems(mockFeedItems);
    } catch (error) {
      console.error('Error loading feed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = (itemId: string) => {
    setFeedItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { 
              ...item, 
              isLiked: !item.isLiked,
              likes: item.isLiked ? item.likes - 1 : item.likes + 1
            }
          : item
      )
    );
  };

  const handleBookmark = (itemId: string) => {
    setFeedItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, isBookmarked: !item.isBookmarked }
          : item
      )
    );
  };

  const getFilteredFeedItems = () => {
    let filtered = feedItems;
    
    // Apply filter
    if (filter === 'tasks') {
      filtered = filtered.filter(item => item.type === 'TASK_COMPLETED');
    } else if (filter === 'achievements') {
      filtered = filtered.filter(item => item.type === 'ACHIEVEMENT');
    } else if (filter === 'stories') {
      filtered = filtered.filter(item => item.type === 'STORY');
    }
    
    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'ตอนนี้';
    if (minutes < 60) return `${minutes} นาที`;
    if (hours < 24) return `${hours} ชั่วโมง`;
    if (days < 7) return `${days} วัน`;
    return date.toLocaleDateString('th-TH');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'TASK_COMPLETED':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'ACHIEVEMENT':
        return <Award className="w-5 h-5 text-yellow-600" />;
      case 'STORY':
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
      case 'TIPS':
        return <Star className="w-5 h-5 text-purple-600" />;
      default:
        return <Eye className="w-5 h-5 text-gray-600" />;
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  const filteredFeedItems = getFilteredFeedItems();

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
            
            <h1 className="text-lg font-semibold text-gray-900">ฟีด</h1>
            
            <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Search and Filter */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาในฟีด..."
              className="w-full pl-10 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ทั้งหมด
            </button>
            <button
              onClick={() => setFilter('tasks')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                filter === 'tasks'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              งานเสร็จ
            </button>
            <button
              onClick={() => setFilter('achievements')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                filter === 'achievements'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ความสำเร็จ
            </button>
            <button
              onClick={() => setFilter('stories')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                filter === 'stories'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              เรื่องราว
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {filteredFeedItems.length === 0 ? (
          <div className="text-center py-12 px-4">
            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchQuery ? 'ไม่พบเนื้อหาที่ค้นหา' : 'ไม่มีเนื้อหาในฟีด'}
            </h3>
            <p className="text-gray-600">
              {searchQuery 
                ? 'ลองเปลี่ยนคำค้นหาหรือล้างตัวกรอง'
                : 'เนื้อหาจะปรากฏเมื่อมีกิจกรรมใหม่ในชุมชน'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4 p-4">
            {filteredFeedItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                {/* Header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-xl text-white">
                      {item.author.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">
                          {item.author.name}
                        </h3>
                        {item.author.userType === 'SYSTEM' && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            ระบบ
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{formatTime(item.timestamp)}</span>
                        {item.location && (
                          <>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{item.location}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(item.type)}
                      <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h4>
                  <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
                    {item.content}
                  </p>

                  {/* Images */}
                  {item.images && item.images.length > 0 && (
                    <div className="mb-4">
                      {item.images.length === 1 ? (
                        <img
                          src={item.images[0]}
                          alt="Feed image"
                          className="w-full h-48 object-cover rounded-xl"
                        />
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          {item.images.slice(0, 4).map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Feed image ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="px-4 py-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={() => handleLike(item.id)}
                        className={`flex items-center space-x-2 transition-colors ${
                          item.isLiked 
                            ? 'text-red-500' 
                            : 'text-gray-500 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${item.isLiked ? 'fill-current' : ''}`} />
                        <span className="text-sm">{item.likes}</span>
                      </button>
                      
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">{item.comments}</span>
                      </button>
                      
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm">{item.shares}</span>
                      </button>
                    </div>
                    
                    <button
                      onClick={() => handleBookmark(item.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        item.isBookmarked 
                          ? 'text-indigo-600 bg-indigo-50' 
                          : 'text-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      <Bookmark className={`w-5 h-5 ${item.isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Mobile Safe Area */}
      <div className="h-6 bg-gray-50 md:hidden"></div>
    </div>
  );
}
