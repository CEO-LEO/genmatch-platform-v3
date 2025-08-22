'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Search, 
  Send, 
  MoreHorizontal, 
  Phone, 
  Video, 
  Image, 
  Paperclip,
  Users,
  Star,
  Award,
  TrendingUp,
  Target,
  Zap,
  Crown,
  Shield,
  Building,
  GraduationCap,
  Globe,
  Wrench,
  CheckCircle,
  AlertCircle,
  Info,
  HelpCircle,
  MessageCircle,
  User,
  Clock,
  MapPin,
  Calendar
} from 'lucide-react'
import Link from 'next/link';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: Date;
  isRead: boolean;
  type: 'text' | 'image' | 'file';
}

interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
  userType: string;
}

export default function ChatPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedChat, setSelectedChat] = useState<ChatContact | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock chat contacts
  const chatContacts: ChatContact[] = [
    {
      id: '1',
      name: 'สมศรี ใจดี',
      avatar: '👵',
      lastMessage: 'ขอบคุณมากที่ช่วยเหลือค่ะ',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      unreadCount: 2,
      isOnline: true,
      userType: 'ELDERLY'
    },
    {
      id: '2',
      name: 'ประยุทธ สมบูรณ์',
      avatar: '👴',
      lastMessage: 'งานเสร็จแล้วครับ',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      unreadCount: 0,
      isOnline: false,
      userType: 'ELDERLY'
    },
    {
      id: '3',
      name: 'น้องใหม่ จิตอาสา',
      avatar: '👨‍🎓',
      lastMessage: 'จะไปช่วยงานพรุ่งนี้ครับ',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      unreadCount: 1,
      isOnline: true,
      userType: 'STUDENT'
    }
  ];

  // Mock messages for selected chat
  const mockMessages: { [key: string]: ChatMessage[] } = {
    '1': [
      {
        id: '1',
        text: 'สวัสดีค่ะ ต้องการความช่วยเหลือในการซื้อของที่ซุปเปอร์มาร์เก็ต',
        sender: 'other',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        isRead: true,
        type: 'text'
      },
      {
        id: '2',
        text: 'สวัสดีครับ ยินดีช่วยเหลือครับ',
        sender: 'me',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5),
        isRead: true,
        type: 'text'
      },
      {
        id: '3',
        text: 'ขอบคุณมากที่ช่วยเหลือค่ะ',
        sender: 'other',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        isRead: false,
        type: 'text'
      }
    ]
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (selectedChat) {
      setMessages(mockMessages[selectedChat.id] || []);
      scrollToBottom();
    }
  }, [selectedChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'me',
      timestamp: new Date(),
      isRead: false,
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    
    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Simulate reply
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'ได้รับข้อความแล้วค่ะ ขอบคุณมาก',
        sender: 'other',
        timestamp: new Date(),
        isRead: false,
        type: 'text'
      };
      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Handle file upload logic here
      console.log('Files to upload:', files);
    }
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

      {!selectedChat ? (
        /* Chat List View */
        <>
          {/* Header */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="px-4 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold text-gray-900">แชท</h1>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
                    <Search className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Search Bar */}
          <div className="bg-white px-4 py-3 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาการสนทนา..."
                className="w-full pl-10 pr-4 py-3 bg-gray-100 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
              />
            </div>
          </div>

          {/* Chat List */}
          <main className="flex-1">
            <div className="space-y-1">
              {chatContacts
                .filter(contact => 
                  contact.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedChat(contact)}
                    className="bg-white px-4 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      {/* Avatar */}
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-xl text-white">
                          {contact.avatar}
                        </div>
                        {contact.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>

                      {/* Contact Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {contact.name}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {formatTime(contact.lastMessageTime)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 truncate">
                            {contact.lastMessage}
                          </p>
                          {contact.unreadCount > 0 && (
                            <span className="ml-2 px-2 py-1 bg-indigo-600 text-white text-xs rounded-full min-w-[20px] text-center">
                              {contact.unreadCount}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">
                            {contact.userType === 'ELDERLY' ? 'ผู้สูงอายุ' : 'นักศึกษา'}
                          </span>
                        </div>
                      </div>

                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                ))}
            </div>

            {/* Empty State */}
            {chatContacts.length === 0 && (
              <div className="text-center py-12 px-4">
                <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">ยังไม่มีแชท</h3>
                <p className="text-gray-600 mb-6">
                  เริ่มต้นการสนทนากับผู้ใช้คนอื่นเพื่อทำงานจิตอาสาร่วมกัน
                </p>
                <Link
                  href="/search"
                  className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                >
                  ค้นหางาน
                </Link>
              </div>
            )}
          </main>
        </>
      ) : (
        /* Chat Detail View */
        <>
          {/* Chat Header */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setSelectedChat(null)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-lg text-white">
                      {selectedChat.avatar}
                    </div>
                    {selectedChat.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  
                  <div>
                    <h2 className="font-semibold text-gray-900">{selectedChat.name}</h2>
                    <p className="text-sm text-gray-600">
                      {selectedChat.isOnline ? 'ออนไลน์' : 'ออฟไลน์'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Messages */}
          <main className="flex-1 overflow-y-auto bg-gray-100 px-4 py-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.sender === 'me'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-900'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <div className={`flex items-center justify-end space-x-1 mt-2 ${
                      message.sender === 'me' ? 'text-indigo-200' : 'text-gray-500'
                    }`}>
                      <span className="text-xs">
                        {message.timestamp.toLocaleTimeString('th-TH', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      {message.sender === 'me' && (
                        <span className="ml-1">
                          {message.isRead ? (
                            <CheckCheck className="w-3 h-3" />
                          ) : (
                            <Check className="w-3 h-3" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white px-4 py-3 rounded-2xl">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </main>

          {/* Message Input */}
          <div className="bg-white border-t border-gray-200 px-4 py-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Paperclip className="w-5 h-5" />
              </button>
              
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <ImageIcon className="w-5 h-5" />
              </button>
              
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="พิมพ์ข้อความ..."
                  className="w-full px-4 py-3 bg-gray-100 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors">
                  <Smile className="w-5 h-5" />
                </button>
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  newMessage.trim()
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </>
      )}

      {/* Mobile Safe Area */}
      <div className="h-6 bg-gray-50 md:hidden"></div>
    </div>
  );
}

