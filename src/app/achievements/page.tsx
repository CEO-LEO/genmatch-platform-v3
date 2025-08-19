'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  Trophy, 
  Star, 
  Award, 
  Target, 
  TrendingUp, 
  Calendar,
  ArrowLeft,
  CheckCircle,
  Clock,
  Heart,
  Users,
  MapPin,
  Zap,
  BookOpen,
  Shield,
  Gift,
  Search
} from 'lucide-react';
import Link from 'next/link';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'VOLUNTEER' | 'COMMUNITY' | 'SKILL' | 'MILESTONE' | 'SPECIAL';
  level: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND';
  points: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  requirement: string;
  reward?: string;
}

interface UserStats {
  totalPoints: number;
  totalAchievements: number;
  unlockedAchievements: number;
  currentLevel: string;
  nextLevelPoints: number;
  progressToNextLevel: number;
}

export default function Achievements() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
      loadAchievements();
      loadUserStats();
    }
  }, [user, loading, router]);

  const loadAchievements = async () => {
    try {
      // Mock data for demo
      const mockAchievements: Achievement[] = [
        {
          id: '1',
          title: 'จิตอาสาเริ่มต้น',
          description: 'เริ่มต้นการเป็นจิตอาสาโดยการรับงานแรก',
          icon: '🌱',
          category: 'VOLUNTEER',
          level: 'BRONZE',
          points: 10,
          isUnlocked: true,
          unlockedAt: '2024-01-15T10:30:00Z',
          requirement: 'รับงานจิตอาสา 1 งาน',
          reward: '10 คะแนน'
        },
        {
          id: '2',
          title: 'จิตอาสา 5 ชั่วโมง',
          description: 'สะสมชั่วโมงจิตอาสาได้ 5 ชั่วโมง',
          icon: '⏰',
          category: 'MILESTONE',
          level: 'SILVER',
          points: 25,
          isUnlocked: true,
          unlockedAt: '2024-01-18T14:20:00Z',
          requirement: 'สะสมชั่วโมงจิตอาสา 5 ชั่วโมง',
          reward: '25 คะแนน'
        },
        {
          id: '3',
          title: 'จิตอาสา 10 ชั่วโมง',
          description: 'สะสมชั่วโมงจิตอาสาได้ 10 ชั่วโมง',
          icon: '🏆',
          category: 'MILESTONE',
          level: 'GOLD',
          points: 50,
          isUnlocked: true,
          unlockedAt: '2024-01-20T16:45:00Z',
          requirement: 'สะสมชั่วโมงจิตอาสา 10 ชั่วโมง',
          reward: '50 คะแนน + แบดจ์ทอง'
        },
        {
          id: '4',
          title: 'จิตอาสา 25 ชั่วโมง',
          description: 'สะสมชั่วโมงจิตอาสาได้ 25 ชั่วโมง',
          icon: '💎',
          category: 'MILESTONE',
          level: 'PLATINUM',
          points: 100,
          isUnlocked: false,
          progress: 60,
          requirement: 'สะสมชั่วโมงจิตอาสา 25 ชั่วโมง',
          reward: '100 คะแนน + แบดจ์แพลทินัม'
        },
        {
          id: '5',
          title: 'จิตอาสา 50 ชั่วโมง',
          description: 'สะสมชั่วโมงจิตอาสาได้ 50 ชั่วโมง',
          icon: '👑',
          category: 'MILESTONE',
          level: 'DIAMOND',
          points: 200,
          isUnlocked: false,
          progress: 20,
          requirement: 'สะสมชั่วโมงจิตอาสา 50 ชั่วโมง',
          reward: '200 คะแนน + แบดจ์ไดมอนด์'
        },
        {
          id: '6',
          title: 'ผู้ช่วยเหลือโรงพยาบาล',
          description: 'ช่วยเหลือในงานโรงพยาบาล 5 ครั้ง',
          icon: '🏥',
          category: 'VOLUNTEER',
          level: 'SILVER',
          points: 30,
          isUnlocked: true,
          unlockedAt: '2024-01-19T11:15:00Z',
          requirement: 'ช่วยเหลือในงานโรงพยาบาล 5 ครั้ง',
          reward: '30 คะแนน'
        },
        {
          id: '7',
          title: 'ผู้ช่วยเหลือวัด',
          description: 'ช่วยเหลือในงานวัด 3 ครั้ง',
          icon: '🕍',
          category: 'VOLUNTEER',
          level: 'BRONZE',
          points: 20,
          isUnlocked: true,
          unlockedAt: '2024-01-17T09:30:00Z',
          requirement: 'ช่วยเหลือในงานวัด 3 ครั้ง',
          reward: '20 คะแนน'
        },
        {
          id: '8',
          title: 'ผู้ช่วยเหลือออกกำลังกาย',
          description: 'ช่วยเหลือในงานออกกำลังกาย 4 ครั้ง',
          icon: '💪',
          category: 'VOLUNTEER',
          level: 'BRONZE',
          points: 20,
          isUnlocked: false,
          progress: 75,
          requirement: 'ช่วยเหลือในงานออกกำลังกาย 4 ครั้ง',
          reward: '20 คะแนน'
        },
        {
          id: '9',
          title: 'ผู้ช่วยเหลืองานซ่อม',
          description: 'ช่วยเหลือในงานซ่อม 3 ครั้ง',
          icon: '🔧',
          category: 'VOLUNTEER',
          level: 'BRONZE',
          points: 20,
          isUnlocked: true,
          unlockedAt: '2024-01-16T15:45:00Z',
          requirement: 'ช่วยเหลือในงานซ่อม 3 ครั้ง',
          reward: '20 คะแนน'
        },
        {
          id: '10',
          title: 'ผู้ให้คะแนนดี',
          description: 'ได้รับคะแนนความพึงพอใจ 5 ดาว 10 ครั้ง',
          icon: '⭐',
          category: 'COMMUNITY',
          level: 'GOLD',
          points: 75,
          isUnlocked: false,
          progress: 40,
          requirement: 'ได้รับคะแนนความพึงพอใจ 5 ดาว 10 ครั้ง',
          reward: '75 คะแนน + แบดจ์ทอง'
        },
        {
          id: '11',
          title: 'ผู้ช่วยเหลือชุมชน',
          description: 'ช่วยเหลือในงานชุมชน 5 ครั้ง',
          icon: '🏘️',
          category: 'COMMUNITY',
          level: 'SILVER',
          points: 40,
          isUnlocked: false,
          progress: 60,
          requirement: 'ช่วยเหลือในงานชุมชน 5 ครั้ง',
          reward: '40 คะแนน'
        },
        {
          id: '12',
          title: 'ผู้เรียนรู้ตลอดชีวิต',
          description: 'อ่านบทความและเคล็ดลับ 20 บทความ',
          icon: '📚',
          category: 'SKILL',
          level: 'BRONZE',
          points: 15,
          isUnlocked: false,
          progress: 85,
          requirement: 'อ่านบทความและเคล็ดลับ 20 บทความ',
          reward: '15 คะแนน'
        }
      ];
      
      setAchievements(mockAchievements);
    } catch (error) {
      console.error('Failed to load achievements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserStats = async () => {
    try {
      // Mock user stats
      const mockStats: UserStats = {
        totalPoints: 185,
        totalAchievements: 12,
        unlockedAchievements: 7,
        currentLevel: 'ระดับ 3',
        nextLevelPoints: 300,
        progressToNextLevel: 62
      };
      
      setUserStats(mockStats);
    } catch (error) {
      console.error('Failed to load user stats:', error);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'BRONZE': return 'from-amber-600 to-orange-600';
      case 'SILVER': return 'from-gray-400 to-gray-600';
      case 'GOLD': return 'from-yellow-500 to-amber-500';
      case 'PLATINUM': return 'from-cyan-400 to-blue-500';
      case 'DIAMOND': return 'from-purple-400 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'BRONZE': return '🥉';
      case 'SILVER': return '🥈';
      case 'GOLD': return '🥇';
      case 'PLATINUM': return '💎';
      case 'DIAMOND': return '👑';
      default: return '🏅';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'VOLUNTEER': return <Heart className="w-5 h-5" />;
      case 'COMMUNITY': return <Users className="w-5 h-5" />;
      case 'SKILL': return <BookOpen className="w-5 h-5" />;
      case 'MILESTONE': return <Target className="w-5 h-5" />;
      case 'SPECIAL': return <Gift className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'VOLUNTEER': return 'from-pink-500 to-red-500';
      case 'COMMUNITY': return 'from-blue-500 to-indigo-500';
      case 'SKILL': return 'from-green-500 to-emerald-500';
      case 'MILESTONE': return 'from-yellow-500 to-orange-500';
      case 'SPECIAL': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const filteredAchievements = achievements.filter(achievement => {
    if (selectedCategory === 'ALL') return true;
    return achievement.category === selectedCategory;
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
          <h1 className="text-3xl font-bold text-white">ความสำเร็จ</h1>
          <div className="flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <span className="text-white/70">รางวัลและความสำเร็จ</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-6 px-4">
        {/* User Stats */}
        {userStats && (
          <div className="glass-card p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">{userStats.totalPoints}</h3>
                <p className="text-white/70">คะแนนรวม</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">{userStats.unlockedAchievements}</h3>
                <p className="text-white/70">ความสำเร็จที่ได้</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">{userStats.currentLevel}</h3>
                <p className="text-white/70">ระดับปัจจุบัน</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">{userStats.progressToNextLevel}%</h3>
                <p className="text-white/70">ความคืบหน้า</p>
              </div>
            </div>
            
            {/* Level Progress */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-white/70 mb-2">
                <span>ระดับปัจจุบัน: {userStats.currentLevel}</span>
                <span>ระดับถัดไป: {userStats.nextLevelPoints} คะแนน</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${userStats.progressToNextLevel}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="glass-card p-4 mb-6">
          <div className="flex justify-center">
            <div className="flex flex-wrap bg-white/10 rounded-lg p-1 gap-2">
              {[
                { key: 'ALL', label: 'ทั้งหมด', count: achievements.length },
                { key: 'VOLUNTEER', label: 'จิตอาสา', count: achievements.filter(a => a.category === 'VOLUNTEER').length },
                { key: 'MILESTONE', label: 'เป้าหมาย', count: achievements.filter(a => a.category === 'MILESTONE').length },
                { key: 'COMMUNITY', label: 'ชุมชน', count: achievements.filter(a => a.category === 'COMMUNITY').length },
                { key: 'SKILL', label: 'ทักษะ', count: achievements.filter(a => a.category === 'SKILL').length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedCategory(tab.key)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    selectedCategory === tab.key
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

        {/* Achievements Grid */}
        {isLoading ? (
          <div className="glass-card p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-400 mx-auto mb-4"></div>
            <p className="text-white">กำลังโหลดความสำเร็จ...</p>
          </div>
        ) : filteredAchievements.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10 text-white/40" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">ไม่มีความสำเร็จ</h3>
            <p className="text-white/60">
              {selectedCategory === 'ALL' 
                ? 'ยังไม่มีความสำเร็จในระบบ' 
                : `ไม่มีความสำเร็จในหมวดหมู่ "${selectedCategory}"`
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`glass-card p-6 transition-all duration-300 ${
                  achievement.isUnlocked 
                    ? 'hover:scale-105' 
                    : 'opacity-70 hover:opacity-90'
                }`}
              >
                {/* Achievement Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${getLevelColor(achievement.level)} rounded-xl flex items-center justify-center text-3xl`}>
                    {achievement.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(achievement.category)} text-white`}>
                        {achievement.category}
                      </span>
                      <span className="text-white/60 text-xs">
                        {getLevelIcon(achievement.level)} {achievement.level}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-1">{achievement.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{achievement.description}</p>
                  </div>
                </div>

                {/* Progress Bar (if not unlocked) */}
                {!achievement.isUnlocked && achievement.progress !== undefined && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-white/60 mb-1">
                      <span>ความคืบหน้า</span>
                      <span>{achievement.progress}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Achievement Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">คะแนน:</span>
                    <span className="text-white font-medium">{achievement.points} คะแนน</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">ความต้องการ:</span>
                    <span className="text-white text-xs">{achievement.requirement}</span>
                  </div>
                  
                  {achievement.reward && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">รางวัล:</span>
                      <span className="text-white text-xs">{achievement.reward}</span>
                    </div>
                  )}
                </div>

                {/* Status */}
                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  {achievement.isUnlocked ? (
                    <div className="flex items-center text-green-400">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">ได้รับแล้ว</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-yellow-400">
                      <Clock className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">ยังไม่ได้รับ</span>
                    </div>
                  )}
                  
                  {achievement.unlockedAt && (
                    <div className="text-white/50 text-xs">
                      {new Date(achievement.unlockedAt).toLocaleDateString('th-TH')}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="glass-card p-6 mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">การดำเนินการด่วน</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/search" className="glass-button-secondary p-4 text-center hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">ค้นหางาน</h4>
              <p className="text-white/70 text-sm">หางานเพื่อเพิ่มความสำเร็จ</p>
            </Link>
            
            <Link href="/feed" className="glass-button-secondary p-4 text-center hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">ฟีดชุมชน</h4>
              <p className="text-white/70 text-sm">ดูเรื่องราวและความสำเร็จ</p>
            </Link>
            
            <Link href="/statistics" className="glass-button-secondary p-4 text-center hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">สถิติ</h4>
              <p className="text-white/70 text-sm">ดูสถิติและความคืบหน้า</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

