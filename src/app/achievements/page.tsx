'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft,
  Trophy,
  Star,
  Award,
  Medal,
  Target,
  TrendingUp,
  Calendar,
  MapPin,
  Clock,
  Heart,
  Users,
  ChevronRight,
  Filter,
  Search,
  X,
  CheckCircle,
  Gift,
  Zap,
  Crown,
  Shield,
  Badge
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'volunteer' | 'social' | 'skill' | 'milestone';
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  points: number;
  unlockedAt: string;
  progress?: number;
  totalRequired?: number;
  isUnlocked: boolean;
  reward?: string;
}

interface UserStats {
  totalPoints: number;
  totalAchievements: number;
  currentStreak: number;
  longestStreak: number;
  volunteerHours: number;
  tasksCompleted: number;
  rank: string;
}

export default function AchievementsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'volunteer' | 'social' | 'skill' | 'milestone'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'ทั้งหมด', icon: Trophy, color: 'from-purple-500 to-purple-600' },
    { id: 'volunteer', name: 'จิตอาสา', icon: Users, color: 'from-red-500 to-pink-500' },
    { id: 'education', name: 'การศึกษา', icon: Award, color: 'from-blue-500 to-blue-600' },
    { id: 'community', name: 'ชุมชน', icon: Target, color: 'from-green-500 to-green-600' },
    { id: 'health', name: 'สุขภาพ', icon: TrendingUp, color: 'from-orange-500 to-orange-600' }
  ];

  const levelColors = {
    bronze: 'from-amber-600 to-amber-800',
    silver: 'from-gray-400 to-gray-600',
    gold: 'from-yellow-400 to-yellow-600',
    platinum: 'from-indigo-400 to-indigo-600'
  };

  const levelIcons = {
    bronze: Medal,
    silver: Award,
    gold: Star,
    platinum: Crown
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }
    
    if (user) {
      loadAchievements();
      loadUserStats();
    }
  }, [user, loading, router]);

  const loadAchievements = async () => {
    setIsLoading(true);
    
    // Mock data
    const mockAchievements: Achievement[] = [
      {
        id: '1',
        title: 'จิตอาสาครั้งแรก',
        description: 'ช่วยเหลือผู้อื่นเป็นครั้งแรก',
        icon: '🎯',
        category: 'volunteer',
        level: 'bronze',
        points: 10,
        unlockedAt: '2024-01-15',
        isUnlocked: true
      },
      {
        id: '2',
        title: 'อาสาสมัครมือใหม่',
        description: 'ทำงานจิตอาสา 5 ครั้ง',
        icon: '🌟',
        category: 'volunteer',
        level: 'silver',
        points: 25,
        unlockedAt: '2024-02-20',
        isUnlocked: true
      },
      {
        id: '3',
        title: 'ผู้ช่วยเหลือประจำ',
        description: 'ทำงานจิตอาสา 20 ครั้ง',
        icon: '🏆',
        category: 'volunteer',
        level: 'gold',
        points: 100,
        unlockedAt: '2024-03-10',
        isUnlocked: true
      },
      {
        id: '4',
        title: 'นักสังคมสงเคราะห์',
        description: 'ช่วยเหลือผู้สูงอายุ 10 คน',
        icon: '👴',
        category: 'social',
        level: 'silver',
        points: 50,
        unlockedAt: '2024-02-28',
        isUnlocked: true
      },
      {
        id: '5',
        title: 'ผู้เชี่ยวชาญการซ่อม',
        description: 'ซ่อมแซมสิ่งของ 15 ชิ้น',
        icon: '🔧',
        category: 'skill',
        level: 'gold',
        points: 75,
        unlockedAt: '2024-03-05',
        isUnlocked: true
      },
      {
        id: '6',
        title: 'ผู้เดินทางไกล',
        description: 'เดินทางไปช่วยเหลือในพื้นที่ห่างไกล',
        icon: '🚗',
        category: 'milestone',
        level: 'bronze',
        points: 15,
        unlockedAt: '2024-01-30',
        isUnlocked: true
      },
      {
        id: '7',
        title: 'อาสาสมัครแห่งปี',
        description: 'ทำงานจิตอาสา 100 ครั้ง',
        icon: '👑',
        category: 'volunteer',
        level: 'platinum',
        points: 500,
        unlockedAt: '',
        isUnlocked: false,
        progress: 45,
        totalRequired: 100
      },
      {
        id: '8',
        title: 'ผู้เชี่ยวชาญด้านสุขภาพ',
        description: 'ช่วยเหลือในโรงพยาบาล 50 ครั้ง',
        icon: '🏥',
        category: 'skill',
        level: 'gold',
        points: 200,
        unlockedAt: '',
        isUnlocked: false,
        progress: 32,
        totalRequired: 50
      }
    ];

    setAchievements(mockAchievements);
    setIsLoading(false);
  };

  const loadUserStats = async () => {
    // Mock user stats
    const mockStats: UserStats = {
      totalPoints: 275,
      totalAchievements: 6,
      currentStreak: 3,
      longestStreak: 7,
      volunteerHours: 45,
      tasksCompleted: 23,
      rank: 'Silver'
    };

    setUserStats(mockStats);
  };

  const getFilteredAchievements = () => {
    let filtered = achievements;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(achievement => achievement.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(achievement => 
        achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        achievement.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getLevelInfo = (level: string) => {
    const Icon = levelIcons[level as keyof typeof levelIcons];
    const color = levelColors[level as keyof typeof levelColors];
    
    return { Icon, color };
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

  const filteredAchievements = getFilteredAchievements();

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
            
            <h1 className="text-lg font-semibold text-gray-900">ความสำเร็จ</h1>
            
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      {/* User Stats */}
      {userStats && (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold mb-2">คะแนนรวม: {userStats.totalPoints}</h2>
            <p className="text-indigo-100">อันดับ: {userStats.rank}</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{userStats.totalAchievements}</div>
              <div className="text-sm text-indigo-100">ความสำเร็จ</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{userStats.volunteerHours}</div>
              <div className="text-sm text-indigo-100">ชั่วโมง</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{userStats.tasksCompleted}</div>
              <div className="text-sm text-indigo-100">งานเสร็จ</div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหาความสำเร็จ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
            />
          </div>
          
          {/* Category Filter */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">กำลังโหลดความสำเร็จ...</p>
          </div>
        ) : filteredAchievements.length === 0 ? (
          <div className="text-center py-8">
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบความสำเร็จ</h3>
            <p className="text-gray-500">ลองเปลี่ยนตัวกรองหรือค้นหาดูใหม่</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAchievements.map((achievement) => {
              const { Icon, color } = getLevelInfo(achievement.level);
              
              return (
                <div key={achievement.id} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start space-x-4">
                    {/* Achievement Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center text-2xl flex-shrink-0`}>
                      {achievement.isUnlocked ? achievement.icon : '🔒'}
                    </div>
                    
                    {/* Achievement Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{achievement.title}</h3>
                        <div className={`w-6 h-6 bg-gradient-to-r ${color} rounded-full flex items-center justify-center`}>
                          <Icon className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{achievement.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>{achievement.points} คะแนน</span>
                          </div>
                          
                          {achievement.isUnlocked && achievement.unlockedAt && (
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(achievement.unlockedAt)}</span>
                            </div>
                          )}
                        </div>
                        
                        {achievement.isUnlocked ? (
                          <div className="flex items-center space-x-2 text-green-600">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">ปลดล็อกแล้ว</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <div className="text-sm text-gray-500">
                              {achievement.progress}/{achievement.totalRequired}
                            </div>
                            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                                style={{ width: `${(achievement.progress || 0) / (achievement.totalRequired || 1) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Reward */}
                  {achievement.reward && (
                    <div className="mt-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl">
                      <div className="flex items-center space-x-2 text-yellow-800">
                        <Gift className="w-4 h-4" />
                        <span className="text-sm font-medium">การยกย่อง: {achievement.reward}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Mobile Safe Area */}
      <div className="h-6 bg-gray-50 md:hidden"></div>
    </div>
  );
}

