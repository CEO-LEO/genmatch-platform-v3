'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft,
  Info,
  Heart,
  Users,
  Target,
  Award,
  Star,
  Globe,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight,
  CheckCircle,
  TrendingUp,
  Shield,
  BookOpen,
  Calendar,
  Clock,
  Download,
  Share2,
  MessageCircle
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  social: {
    linkedin?: string;
    github?: string;
    email?: string;
  };
}

interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: any;
  color: string;
}

export default function AboutPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'ดร. สมชาย ใจดี',
      role: 'ผู้ก่อตั้งและ CEO',
      avatar: '👨‍💼',
      bio: 'ผู้เชี่ยวชาญด้านเทคโนโลยีและนวัตกรรมสังคม มีประสบการณ์มากกว่า 15 ปี ในการพัฒนาแพลตฟอร์มเพื่อสังคม',
      social: {
        linkedin: 'https://linkedin.com/in/somchai',
        email: 'somchai@genmatch.com'
      }
    },
    {
      id: '2',
      name: 'คุณ สมหญิง รักดี',
      role: 'หัวหน้าฝ่ายพัฒนา',
      avatar: '👩‍💻',
      bio: 'นักพัฒนาซอฟต์แวร์ที่มีความเชี่ยวชาญในการออกแบบ UX/UI และการพัฒนาแอปพลิเคชันมือถือ',
      social: {
        github: 'https://github.com/somying',
        email: 'somying@genmatch.com'
      }
    },
    {
      id: '3',
      name: 'คุณ วิชัย สร้างสรรค์',
      role: 'หัวหน้าฝ่ายการตลาด',
      avatar: '👨‍💼',
      bio: 'ผู้เชี่ยวชาญด้านการตลาดดิจิทัลและการสร้างแบรนด์ มีประสบการณ์ในการขยายธุรกิจเพื่อสังคม',
      social: {
        linkedin: 'https://linkedin.com/in/wichai',
        email: 'wichai@genmatch.com'
      }
    }
  ];

  const milestones: Milestone[] = [
    {
      id: '1',
      year: '2022',
      title: 'เริ่มต้นโครงการ',
      description: 'เริ่มต้นการพัฒนาแพลตฟอร์ม GenMatch เพื่อเชื่อมต่อผู้สูงอายุกับนักศึกษาอาสาสมัคร',
      icon: Target,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      id: '2',
      year: '2023',
      title: 'เปิดตัวเบต้า',
      description: 'เปิดตัวเวอร์ชันเบต้าในกรุงเทพฯ และปริมณฑล ได้รับการตอบรับที่ดีจากผู้ใช้',
      icon: TrendingUp,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: '3',
      year: '2024',
      title: 'ขยายสู่ภูมิภาค',
      description: 'ขยายบริการสู่จังหวัดต่างๆ ทั่วประเทศ และเพิ่มฟีเจอร์ใหม่ๆ',
      icon: Globe,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: '4',
      year: '2025',
      title: 'เป้าหมายอนาคต',
      description: 'มุ่งสู่การเป็นแพลตฟอร์มชั้นนำในการเชื่อมต่อสังคมและสร้างชุมชนที่เข้มแข็ง',
      icon: Star,
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const stats = [
    { label: 'ผู้ใช้ทั้งหมด', value: '50,000+', icon: Users, color: 'from-blue-500 to-indigo-500' },
    { label: 'งานเสร็จสิ้น', value: '100,000+', icon: CheckCircle, color: 'from-green-500 to-teal-500' },
    { label: 'ชั่วโมงจิตอาสา', value: '500,000+', icon: Clock, color: 'from-purple-500 to-pink-500' },
    { label: 'คะแนนความพึงพอใจ', value: '4.8/5.0', icon: Star, color: 'from-yellow-500 to-orange-500' }
  ];

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }
    
    if (user) {
      loadAboutData();
    }
  }, [user, loading, router]);

  const loadAboutData = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
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
            
            <h1 className="text-lg font-semibold text-gray-900">เกี่ยวกับเรา</h1>
            
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 space-y-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold mb-2">GenMatch</h2>
          <p className="text-indigo-100 mb-4">
            แพลตฟอร์มที่เชื่อมต่อผู้สูงอายุกับนักศึกษาอาสาสมัคร 
            เพื่อสร้างสังคมที่เข้มแข็งและเอื้ออาทร
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-indigo-200">
            <Star className="w-4 h-4" />
            <span>สร้างสังคมที่ดีขึ้นด้วยเทคโนโลยี</span>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">พันธกิจและวิสัยทัศน์</h3>
                <p className="text-sm text-gray-600">เป้าหมายและความมุ่งมั่นของเรา</p>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-4">
            <div className="p-4 bg-green-50 rounded-xl border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">พันธกิจ</h4>
              <p className="text-sm text-green-800">
                สร้างแพลตฟอร์มที่เชื่อมต่อผู้สูงอายุกับนักศึกษาอาสาสมัคร 
                เพื่อให้ผู้สูงอายุได้รับความช่วยเหลือที่ต้องการ และนักศึกษาได้มีโอกาสทำประโยชน์ต่อสังคม
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">วิสัยทัศน์</h4>
              <p className="text-sm text-blue-800">
                เป็นแพลตฟอร์มชั้นนำในการเชื่อมต่อสังคมและสร้างชุมชนที่เข้มแข็ง 
                โดยใช้เทคโนโลยีเป็นเครื่องมือในการสร้างความสัมพันธ์ที่ดีระหว่างคนรุ่นต่างๆ
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">สถิติที่สำคัญ</h3>
                <p className="text-sm text-gray-600">ความสำเร็จของเราในตัวเลข</p>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">เส้นทางของเรา</h3>
                <p className="text-sm text-gray-600">ความก้าวหน้าและเป้าหมาย</p>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="space-y-4">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                return (
                  <div key={milestone.id} className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${milestone.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-lg font-bold text-gray-900">{milestone.year}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <h4 className="text-base font-semibold text-gray-900">{milestone.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">ทีมของเรา</h3>
                <p className="text-sm text-gray-600">ผู้ที่อยู่เบื้องหลังความสำเร็จ</p>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{member.avatar}</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h4>
                      <p className="text-sm text-indigo-600 font-medium mb-2">{member.role}</p>
                      <p className="text-sm text-gray-600 mb-3">{member.bio}</p>
                      
                      <div className="flex space-x-2">
                        {member.social.linkedin && (
                          <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        )}
                        {member.social.github && (
                          <button className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        )}
                        {member.social.email && (
                          <button className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                            <Mail className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">ค่านิยมของเรา</h3>
                <p className="text-sm text-gray-600">หลักการที่เรายึดถือ</p>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-700">ความไว้วางใจและความปลอดภัย</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-700">การเชื่อมต่อและสร้างชุมชน</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-700">นวัตกรรมและเทคโนโลยี</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-700">การให้บริการและความพึงพอใจ</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-700">ความยั่งยืนและความรับผิดชอบต่อสังคม</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Links */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">ติดต่อเรา</h3>
                <p className="text-sm text-gray-600">ช่องทางการติดต่อและข้อมูลเพิ่มเติม</p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            <button className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <h4 className="text-base font-medium text-gray-900">อีเมล</h4>
                    <p className="text-sm text-gray-600">info@genmatch.com</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            <button className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <h4 className="text-base font-medium text-gray-900">โทรศัพท์</h4>
                    <p className="text-sm text-gray-600">02-123-4567</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            <button className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <h4 className="text-base font-medium text-gray-900">ที่อยู่</h4>
                    <p className="text-sm text-gray-600">กรุงเทพฯ, ประเทศไทย</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            <button className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-gray-400" />
                  <div>
                    <h4 className="text-base font-medium text-gray-900">เอกสารเพิ่มเติม</h4>
                    <p className="text-sm text-gray-600">นโยบายความเป็นส่วนตัว และข้อกำหนดการใช้งาน</p>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Info className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">ข้อมูลแอปพลิเคชัน</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>เวอร์ชัน: 1.0.0</p>
              <p>อัปเดตล่าสุด: {new Date().toLocaleDateString('th-TH')}</p>
              <p>© 2024 GenMatch. สงวนลิขสิทธิ์</p>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Safe Area */}
      <div className="h-6 bg-gray-50 md:hidden"></div>
    </div>
  );
}
