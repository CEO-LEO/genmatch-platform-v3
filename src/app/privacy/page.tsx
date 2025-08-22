'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Shield, 
  Eye, 
  EyeOff, 
  Lock, 
  Users, 
  Star, 
  Award, 
  TrendingUp, 
  Target,
  Zap,
  Crown,
  Building,
  GraduationCap,
  Globe,
  Wrench,
  CheckCircle,
  AlertCircle,
  Info,
  HelpCircle,
  ExternalLink,
  Download,
  Share2,
  MessageCircle
} from 'lucide-react'

interface PrivacySection {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  items: PrivacyItem[];
}

interface PrivacyItem {
  id: string;
  title: string;
  description: string;
  type: 'toggle' | 'select' | 'info';
  value?: any;
  options?: { label: string; value: any }[];
  action?: () => void;
  required?: boolean;
}

export default function PrivacyPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [privacySettings, setPrivacySettings] = useState({
    profile: {
      visibility: 'public',
      showEmail: false,
      showPhone: false,
      showLocation: true,
      showActivity: true
    },
    data: {
      dataCollection: true,
      analytics: true,
      marketing: false,
      thirdParty: false,
      locationTracking: true
    },
    communication: {
      allowMessages: true,
      allowCalls: false,
      allowEmails: true,
      showOnlineStatus: true
    }
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }
    
    if (user) {
      loadPrivacySettings();
    }
  }, [user, loading, router]);

  const loadPrivacySettings = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
  };

  const handlePrivacyChange = (category: string, setting: string, value: any) => {
    setPrivacySettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  const privacySections: PrivacySection[] = [
    {
      id: 'profile',
      title: 'การแสดงโปรไฟล์',
      description: 'ควบคุมการแสดงข้อมูลส่วนตัวของคุณ',
      icon: Users,
      color: 'from-blue-500 to-indigo-500',
      items: [
        {
          id: 'visibility',
          title: 'การแสดงโปรไฟล์',
          description: 'ใครสามารถดูโปรไฟล์ของคุณได้',
          type: 'select',
          value: privacySettings.profile.visibility,
          options: [
            { label: 'สาธารณะ - ทุกคนสามารถดูได้', value: 'public' },
            { label: 'เพื่อนเท่านั้น - เฉพาะผู้ที่เชื่อมต่อ', value: 'friends' },
            { label: 'ส่วนตัว - เฉพาะคุณเท่านั้น', value: 'private' }
          ],
          action: () => {}
        },
        {
          id: 'showEmail',
          title: 'แสดงอีเมล',
          description: 'แสดงอีเมลในโปรไฟล์',
          type: 'toggle',
          value: privacySettings.profile.showEmail,
          action: () => handlePrivacyChange('profile', 'showEmail', !privacySettings.profile.showEmail)
        },
        {
          id: 'showPhone',
          title: 'แสดงเบอร์โทรศัพท์',
          description: 'แสดงเบอร์โทรศัพท์ในโปรไฟล์',
          type: 'toggle',
          value: privacySettings.profile.showPhone,
          action: () => handlePrivacyChange('profile', 'showPhone', !privacySettings.profile.showPhone)
        },
        {
          id: 'showLocation',
          title: 'แสดงตำแหน่ง',
          description: 'แสดงตำแหน่งที่อยู่ของคุณ',
          type: 'toggle',
          value: privacySettings.profile.showLocation,
          action: () => handlePrivacyChange('profile', 'showLocation', !privacySettings.profile.showLocation)
        },
        {
          id: 'showActivity',
          title: 'แสดงกิจกรรม',
          description: 'แสดงกิจกรรมในฟีดชุมชน',
          type: 'toggle',
          value: privacySettings.profile.showActivity,
          action: () => handlePrivacyChange('profile', 'showActivity', !privacySettings.profile.showActivity)
        }
      ]
    },
    {
      id: 'data',
      title: 'การเก็บข้อมูล',
      description: 'ควบคุมการเก็บและใช้ข้อมูลของคุณ',
      icon: Shield,
      color: 'from-green-500 to-teal-500',
      items: [
        {
          id: 'dataCollection',
          title: 'การเก็บข้อมูล',
          description: 'อนุญาตให้เก็บข้อมูลเพื่อการให้บริการ',
          type: 'toggle',
          value: privacySettings.data.dataCollection,
          action: () => handlePrivacyChange('data', 'dataCollection', !privacySettings.data.dataCollection),
          required: true
        },
        {
          id: 'analytics',
          title: 'การวิเคราะห์ข้อมูล',
          description: 'ใช้ข้อมูลเพื่อปรับปรุงบริการ',
          type: 'toggle',
          value: privacySettings.data.analytics,
          action: () => handlePrivacyChange('data', 'analytics', !privacySettings.data.analytics)
        },
        {
          id: 'marketing',
          title: 'การตลาด',
          description: 'ใช้ข้อมูลเพื่อส่งข้อมูลการตลาด',
          type: 'toggle',
          value: privacySettings.data.marketing,
          action: () => handlePrivacyChange('data', 'marketing', !privacySettings.data.marketing)
        },
        {
          id: 'thirdParty',
          title: 'แชร์กับบุคคลที่สาม',
          description: 'แชร์ข้อมูลกับพันธมิตรที่เชื่อถือได้',
          type: 'toggle',
          value: privacySettings.data.thirdParty,
          action: () => handlePrivacyChange('data', 'thirdParty', !privacySettings.data.thirdParty)
        },
        {
          id: 'locationTracking',
          title: 'ติดตามตำแหน่ง',
          description: 'ติดตามตำแหน่งเพื่อการให้บริการ',
          type: 'toggle',
          value: privacySettings.data.locationTracking,
          action: () => handlePrivacyChange('data', 'locationTracking', !privacySettings.data.locationTracking)
        }
      ]
    },
    {
      id: 'communication',
      title: 'การสื่อสาร',
      description: 'ควบคุมวิธีการที่ผู้อื่นสามารถติดต่อคุณได้',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      items: [
        {
          id: 'allowMessages',
          title: 'อนุญาตข้อความ',
          description: 'รับข้อความจากผู้ใช้อื่น',
          type: 'toggle',
          value: privacySettings.communication.allowMessages,
          action: () => handlePrivacyChange('communication', 'allowMessages', !privacySettings.communication.allowMessages)
        },
        {
          id: 'allowCalls',
          title: 'อนุญาตการโทร',
          description: 'รับการโทรจากผู้ใช้อื่น',
          type: 'toggle',
          value: privacySettings.communication.allowCalls,
          action: () => handlePrivacyChange('communication', 'allowCalls', !privacySettings.communication.allowCalls)
        },
        {
          id: 'allowEmails',
          title: 'อนุญาตอีเมล',
          description: 'รับอีเมลจากระบบ',
          type: 'toggle',
          value: privacySettings.communication.allowEmails,
          action: () => handlePrivacyChange('communication', 'allowEmails', !privacySettings.communication.allowEmails)
        },
        {
          id: 'showOnlineStatus',
          title: 'แสดงสถานะออนไลน์',
          description: 'แสดงสถานะออนไลน์ของคุณ',
          type: 'toggle',
          value: privacySettings.communication.showOnlineStatus,
          action: () => handlePrivacyChange('communication', 'showOnlineStatus', !privacySettings.communication.showOnlineStatus)
        }
      ]
    }
  ];

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
            
            <h1 className="text-lg font-semibold text-gray-900">ความเป็นส่วนตัว</h1>
            
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 space-y-6">
        {/* Privacy Notice */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-4">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-indigo-900 mb-1">นโยบายความเป็นส่วนตัว</h3>
              <p className="text-xs text-indigo-700">
                การตั้งค่าเหล่านี้ช่วยให้คุณควบคุมการใช้งานข้อมูลส่วนตัวของคุณ 
                เรามุ่งมั่นที่จะปกป้องความเป็นส่วนตัวของคุณและให้คุณควบคุมข้อมูลได้
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Sections */}
        {privacySections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Section Header */}
              <div className="px-4 py-4 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-r ${section.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                    <p className="text-sm text-gray-600">{section.description}</p>
                  </div>
                </div>
              </div>

              {/* Section Items */}
              <div className="divide-y divide-gray-100">
                {section.items.map((item) => (
                  <div key={item.id} className="px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-base font-medium text-gray-900">{item.title}</h4>
                          {item.required && (
                            <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">จำเป็น</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      
                      <div className="ml-4">
                        {item.type === 'toggle' && (
                          <button
                            onClick={item.action}
                            disabled={item.required}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              item.value ? 'bg-indigo-600' : 'bg-gray-200'
                            } ${item.required ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                item.value ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        )}
                        
                        {item.type === 'select' && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600 max-w-32 truncate">
                              {item.options?.find(opt => opt.value === item.value)?.label}
                            </span>
                            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          </div>
                        )}
                        
                        {item.type === 'info' && (
                          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            ข้อมูล
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Data Rights */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">สิทธิ์ข้อมูลของคุณ</h3>
                <p className="text-sm text-gray-600">คุณมีสิทธิ์ในการเข้าถึงและควบคุมข้อมูลของคุณ</p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            <button className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Download className="w-5 h-5 text-gray-400" />
                  <div>
                    <h4 className="text-base font-medium text-gray-900">ดาวน์โหลดข้อมูล</h4>
                    <p className="text-sm text-gray-600">ดาวน์โหลดข้อมูลส่วนตัวของคุณ</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            <button className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Trash2 className="w-5 h-5 text-gray-400" />
                  <div>
                    <h4 className="text-base font-medium text-gray-900">ลบข้อมูล</h4>
                    <p className="text-sm text-gray-600">ลบข้อมูลส่วนตัวของคุณออกจากระบบ</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          </div>
        </div>

        {/* Privacy Policy Links */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl flex items-center justify-center">
                <Info className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">ข้อมูลเพิ่มเติม</h3>
                <p className="text-sm text-gray-600">อ่านนโยบายและข้อกำหนดเพิ่มเติม</p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            <button className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <h4 className="text-base font-medium text-gray-900">นโยบายความเป็นส่วนตัว</h4>
                    <p className="text-sm text-gray-600">อ่านนโยบายความเป็นส่วนตัวฉบับเต็ม</p>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            <button className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <HelpCircle className="w-5 h-5 text-gray-400" />
                  <div>
                    <h4 className="text-base font-medium text-gray-900">คำถามที่พบบ่อย</h4>
                    <p className="text-sm text-gray-600">คำถามเกี่ยวกับความเป็นส่วนตัว</p>
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
                    <h4 className="text-base font-medium text-gray-900">ติดต่อเรา</h4>
                    <p className="text-sm text-gray-600">สอบถามเกี่ยวกับความเป็นส่วนตัว</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="sticky bottom-4">
          <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg">
            บันทึกการตั้งค่า
          </button>
        </div>
      </main>

      {/* Mobile Safe Area */}
      <div className="h-6 bg-gray-50 md:hidden"></div>
    </div>
  );
}
