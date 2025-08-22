'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft,
  HelpCircle,
  Search,
  ChevronRight,
  ChevronDown,
  MessageCircle,
  Phone,
  Mail,
  ExternalLink,
  BookOpen,
  Video,
  FileText,
  Users,
  Settings,
  Shield,
  Star,
  Heart,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Plus,
  Minus,
  Download
} from 'lucide-react';

interface HelpCategory {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  articles: HelpArticle[];
}

interface HelpArticle {
  id: string;
  title: string;
  content: string;
  tags: string[];
  isExpanded?: boolean;
}

export default function HelpPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedArticles, setExpandedArticles] = useState<Set<string>>(new Set());

  const helpCategories: HelpCategory[] = [
    {
      id: 'getting-started',
      title: 'เริ่มต้นใช้งาน',
      description: 'พื้นฐานการใช้งานแอปพลิเคชัน',
      icon: BookOpen,
      color: 'from-blue-500 to-indigo-500',
      articles: [
        {
          id: 'how-to-register',
          title: 'วิธีการลงทะเบียน',
          content: '1. กดปุ่ม "ลงทะเบียน" ที่หน้าแรก\n2. กรอกข้อมูลส่วนตัว\n3. เลือกประเภทผู้ใช้ (นักศึกษาหรือผู้สูงอายุ)\n4. ยืนยันอีเมล\n5. เข้าสู่ระบบได้ทันที',
          tags: ['ลงทะเบียน', 'บัญชี', 'เริ่มต้น']
        },
        {
          id: 'how-to-login',
          title: 'วิธีการเข้าสู่ระบบ',
          content: '1. ไปที่หน้า "เข้าสู่ระบบ"\n2. กรอกอีเมลและรหัสผ่าน\n3. กดปุ่ม "เข้าสู่ระบบ"\n4. หากลืมรหัสผ่าน สามารถรีเซ็ตได้',
          tags: ['เข้าสู่ระบบ', 'ล็อกอิน', 'รหัสผ่าน']
        },
        {
          id: 'user-types',
          title: 'ประเภทผู้ใช้',
          content: 'แอปพลิเคชันมีผู้ใช้ 2 ประเภท:\n\n• นักศึกษา: สามารถรับงานอาสาสมัครและสะสมชั่วโมงจิตอาสา\n• ผู้สูงอายุ: สามารถโพสต์งานที่ต้องการความช่วยเหลือ',
          tags: ['ประเภทผู้ใช้', 'นักศึกษา', 'ผู้สูงอายุ']
        }
      ]
    },
    {
      id: 'tasks',
      title: 'การจัดการงาน',
      description: 'วิธีการสร้าง รับ และจัดการงาน',
      icon: Settings,
      color: 'from-green-500 to-teal-500',
      articles: [
        {
          id: 'create-task',
          title: 'วิธีการสร้างงานใหม่',
          content: '1. ไปที่หน้า "สร้างงานใหม่"\n2. กรอกข้อมูลงาน (ชื่อ, รายละเอียด, หมวดหมู่)\n3. ระบุที่อยู่และเวลา\n4. กำหนดความต้องการ\n5. กด "สร้างงาน"',
          tags: ['สร้างงาน', 'โพสต์งาน', 'งานใหม่']
        },
        {
          id: 'accept-task',
          title: 'วิธีการรับงาน',
          content: '1. ค้นหางานที่ต้องการในหน้า "ค้นหา"\n2. อ่านรายละเอียดงาน\n3. กดปุ่ม "รับงานนี้"\n4. ติดต่อผู้สร้างงานเพื่อยืนยัน\n5. เริ่มทำงานตามที่ตกลง',
          tags: ['รับงาน', 'อาสาสมัคร', 'งานจิตอาสา']
        },
        {
          id: 'complete-task',
          title: 'วิธีการเสร็จสิ้นงาน',
          content: '1. ไปที่หน้า "งานของฉัน"\n2. เลือกงานที่ต้องการเสร็จสิ้น\n3. กดปุ่ม "เสร็จสิ้นงาน"\n4. อัปโหลดรูปภาพและบันทึก\n5. ให้คะแนนและข้อเสนอแนะ',
          tags: ['เสร็จสิ้นงาน', 'อัปโหลด', 'คะแนน']
        }
      ]
    },
    {
      id: 'communication',
      title: 'การสื่อสาร',
      description: 'วิธีการติดต่อและแชทกับผู้ใช้อื่น',
      icon: MessageCircle,
      color: 'from-purple-500 to-pink-500',
      articles: [
        {
          id: 'chat-system',
          title: 'ระบบแชท',
          content: '• ใช้ระบบแชทเพื่อติดต่อกับผู้ใช้อื่น\n• ส่งข้อความ, รูปภาพ, และไฟล์\n• ดูสถานะการอ่านข้อความ\n• บล็อกผู้ใช้ที่ไม่ต้องการ',
          tags: ['แชท', 'ข้อความ', 'การสื่อสาร']
        },
        {
          id: 'contact-info',
          title: 'ข้อมูลการติดต่อ',
          content: '• แสดงข้อมูลการติดต่อในโปรไฟล์\n• ตั้งค่าการแสดงข้อมูลส่วนตัว\n• อนุญาตหรือไม่อนุญาตการติดต่อ\n• จัดการการแจ้งเตือน',
          tags: ['ติดต่อ', 'ข้อมูล', 'ความเป็นส่วนตัว']
        }
      ]
    },
    {
      id: 'safety',
      title: 'ความปลอดภัย',
      description: 'คำแนะนำเพื่อความปลอดภัยในการใช้งาน',
      icon: Shield,
      color: 'from-red-500 to-pink-500',
      articles: [
        {
          id: 'meeting-safety',
          title: 'ความปลอดภัยในการพบปะ',
          content: '• พบปะในที่สาธารณะ\n• แจ้งเพื่อนหรือครอบครัวก่อนไป\n• ใช้การเดินทางที่ปลอดภัย\n• หลีกเลี่ยงการให้ข้อมูลส่วนตัวมากเกินไป',
          tags: ['ความปลอดภัย', 'พบปะ', 'การเดินทาง']
        },
        {
          id: 'personal-info',
          title: 'การปกป้องข้อมูลส่วนตัว',
          content: '• ไม่แชร์รหัสผ่านกับใคร\n• ตั้งค่าความเป็นส่วนตัวอย่างเหมาะสม\n• ระวังการหลอกลวงออนไลน์\n• รายงานพฤติกรรมที่น่าสงสัย',
          tags: ['ข้อมูลส่วนตัว', 'รหัสผ่าน', 'การหลอกลวง']
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'แก้ไขปัญหา',
      description: 'วิธีแก้ไขปัญหาที่พบบ่อย',
      icon: AlertCircle,
      color: 'from-yellow-500 to-orange-500',
      articles: [
        {
          id: 'login-issues',
          title: 'ปัญหาในการเข้าสู่ระบบ',
          content: 'ปัญหาที่พบบ่อย:\n• ลืมรหัสผ่าน: ใช้ฟีเจอร์รีเซ็ตรหัสผ่าน\n• บัญชีถูกล็อค: ติดต่อฝ่ายสนับสนุน\n• อีเมลไม่ถูกต้อง: ตรวจสอบการสะกด\n• ปัญหาเครือข่าย: ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต',
          tags: ['เข้าสู่ระบบ', 'ปัญหา', 'แก้ไข']
        },
        {
          id: 'app-issues',
          title: 'ปัญหาแอปพลิเคชัน',
          content: 'วิธีแก้ไข:\n• รีสตาร์ทแอปพลิเคชัน\n• อัปเดตแอปเป็นเวอร์ชันล่าสุด\n• ล้างแคชและข้อมูล\n• ติดตั้งแอปใหม่\n• ติดต่อฝ่ายสนับสนุน',
          tags: ['แอปพลิเคชัน', 'ปัญหา', 'แก้ไข']
        }
      ]
    }
  ];

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }
    
    if (user) {
      loadHelpData();
    }
  }, [user, loading, router]);

  const loadHelpData = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
  };

  const toggleArticle = (articleId: string) => {
    const newExpanded = new Set(expandedArticles);
    if (newExpanded.has(articleId)) {
      newExpanded.delete(articleId);
    } else {
      newExpanded.add(articleId);
    }
    setExpandedArticles(newExpanded);
  };

  const getFilteredCategories = () => {
    if (!searchQuery) return helpCategories;
    
    return helpCategories.map(category => ({
      ...category,
      articles: category.articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    })).filter(category => category.articles.length > 0);
  };

  const filteredCategories = getFilteredCategories();

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
            
            <h1 className="text-lg font-semibold text-gray-900">ความช่วยเหลือ</h1>
            
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ค้นหาคำถามหรือปัญหาที่คุณต้องการ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 space-y-6">
        {/* Quick Help */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-4">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-indigo-900 mb-1">ต้องการความช่วยเหลือด่วน?</h3>
              <p className="text-xs text-indigo-700 mb-3">
                หากคุณไม่พบคำตอบที่ต้องการ สามารถติดต่อเราได้ทันที
              </p>
              <div className="flex space-x-3">
                <button className="flex items-center space-x-2 px-3 py-2 bg-indigo-600 text-white text-xs rounded-lg hover:bg-indigo-700 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>แชทสด</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 bg-white text-indigo-600 text-xs rounded-lg hover:bg-gray-50 transition-colors border border-indigo-200">
                  <Phone className="w-4 h-4" />
                  <span>โทรหา</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Help Categories */}
        {filteredCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Category Header */}
              <div className="px-4 py-4 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
              </div>

              {/* Articles */}
              <div className="divide-y divide-gray-100">
                {category.articles.map((article) => (
                  <div key={article.id} className="px-4 py-4">
                    <button
                      onClick={() => toggleArticle(article.id)}
                      className="w-full text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-medium text-gray-900 mb-1">{article.title}</h4>
                          <div className="flex flex-wrap gap-1">
                            {article.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="ml-4">
                          {expandedArticles.has(article.id) ? (
                            <Minus className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Article Content */}
                    {expandedArticles.has(article.id) && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="prose prose-sm max-w-none">
                          <div className="whitespace-pre-line text-sm text-gray-700 leading-relaxed">
                            {article.content}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Contact Support */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">ติดต่อฝ่ายสนับสนุน</h3>
                <p className="text-sm text-gray-600">เราพร้อมช่วยเหลือคุณตลอด 24 ชั่วโมง</p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            <button className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-5 h-5 text-gray-400" />
                  <div>
                    <h4 className="text-base font-medium text-gray-900">แชทสด</h4>
                    <p className="text-sm text-gray-600">พูดคุยกับเจ้าหน้าที่แบบเรียลไทม์</p>
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
                    <p className="text-sm text-gray-600">02-123-4567 (จันทร์-ศุกร์ 9:00-18:00)</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            <button className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <h4 className="text-base font-medium text-gray-900">อีเมล</h4>
                    <p className="text-sm text-gray-600">support@genmatch.com</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">แหล่งข้อมูลเพิ่มเติม</h3>
                <p className="text-sm text-gray-600">วิดีโอสอนการใช้งานและคู่มือ</p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            <button className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Video className="w-5 h-5 text-gray-400" />
                  <div>
                    <h4 className="text-base font-medium text-gray-900">วิดีโอสอนการใช้งาน</h4>
                    <p className="text-sm text-gray-600">ดูวิดีโอสั้นๆ เรียนรู้การใช้งาน</p>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            <button className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <h4 className="text-base font-medium text-gray-900">คู่มือการใช้งาน</h4>
                    <p className="text-sm text-gray-600">ดาวน์โหลดคู่มือฉบับเต็ม</p>
                  </div>
                </div>
                <Download className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            <button className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <div>
                    <h4 className="text-base font-medium text-gray-900">ชุมชนผู้ใช้</h4>
                    <p className="text-sm text-gray-600">ถามตอบกับผู้ใช้อื่นในชุมชน</p>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-4">
          <div className="text-center">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">ช่วยเราปรับปรุง</h3>
            <p className="text-sm text-yellow-700 mb-4">
              ความคิดเห็นของคุณช่วยให้เราปรับปรุงบริการได้ดีขึ้น
            </p>
            <button className="px-6 py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors">
              ส่งความคิดเห็น
            </button>
          </div>
        </div>
      </main>

      {/* Mobile Safe Area */}
      <div className="h-6 bg-gray-50 md:hidden"></div>
    </div>
  );
}
