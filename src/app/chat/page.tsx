'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  Send, 
  Phone, 
  MapPin, 
  Clock, 
  User, 
  MessageCircle,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
  isOwn: boolean;
}

interface ChatTask {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  province: string;
  status: string;
  creator: {
    firstName: string;
    lastName: string;
    phone: string;
  };
}

export default function Chat() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedTask, setSelectedTask] = useState<ChatTask | null>(null);
  const [tasks, setTasks] = useState<ChatTask[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
      loadUserTasks();
    }
  }, [user, loading, router]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadUserTasks = async () => {
    try {
      const response = await fetch('/api/tasks/my-tasks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const userTasks = await response.json();
        setTasks(userTasks);
        if (userTasks.length > 0) {
          setSelectedTask(userTasks[0]);
          loadChatHistory(userTasks[0].id);
        }
      } else {
        // Mock data for demo
        const mockTasks: ChatTask[] = [
          {
            id: '1',
            title: 'พาไปตรวจสุขภาพที่โรงพยาบาล',
            description: 'ต้องการคนพาไปตรวจสุขภาพที่โรงพยาบาลมหาราช',
            address: 'โรงพยาบาลมหาราช',
            city: 'กรุงเทพฯ',
            province: 'กรุงเทพฯ',
            status: 'COMPLETED',
            creator: {
              firstName: 'สมศรี',
              lastName: 'ใจดี',
              phone: '081-234-5678'
            }
          },
          {
            id: '2',
            title: 'พาไปทำบุญที่วัดพระแก้ว',
            description: 'ต้องการคนพาไปทำบุญที่วัดพระแก้ว',
            address: 'วัดพระแก้ว',
            city: 'กรุงเทพฯ',
            province: 'กรุงเทพฯ',
            status: 'IN_PROGRESS',
            creator: {
              firstName: 'สมชาย',
              lastName: 'รักดี',
              phone: '082-345-6789'
            }
          }
        ];
        setTasks(mockTasks);
        if (mockTasks.length > 0) {
          setSelectedTask(mockTasks[0]);
          loadChatHistory(mockTasks[0].id);
        }
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  const loadChatHistory = async (taskId: string) => {
    // Mock chat history based on task
    const mockMessages: Message[] = [
      {
        id: '1',
        content: 'สวัสดีครับ ผมจะรับงานนี้ให้ครับ',
        senderId: user?.id || '',
        senderName: user?.firstName || '',
        timestamp: new Date(Date.now() - 3600000),
        isOwn: true
      },
      {
        id: '2',
        content: 'ขอบคุณมากครับ เมื่อไหร่จะมาได้ครับ?',
        senderId: 'other',
        senderName: 'ผู้สูงอายุ',
        timestamp: new Date(Date.now() - 1800000),
        isOwn: false
      },
      {
        id: '3',
        content: 'พรุ่งนี้ช่วงบ่าย 2 โมงครับ',
        senderId: user?.id || '',
        senderName: user?.firstName || '',
        timestamp: new Date(Date.now() - 900000),
        isOwn: true
      },
      {
        id: '4',
        content: 'ดีครับ แล้วจะเตรียมของให้พร้อมครับ',
        senderId: 'other',
        senderName: 'ผู้สูงอายุ',
        timestamp: new Date(Date.now() - 600000),
        isOwn: false
      },
      {
        id: '5',
        content: 'ขอบคุณครับ แล้วเจอกันพรุ่งนี้นะครับ',
        senderId: user?.id || '',
        senderName: user?.firstName || '',
        timestamp: new Date(Date.now() - 300000),
        isOwn: true
      }
    ];
    setMessages(mockMessages);
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedTask) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      senderId: user?.id || '',
             senderName: user?.firstName || '',
      timestamp: new Date(),
      isOwn: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate reply after 2 seconds
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        content: 'ได้รับข้อความแล้วครับ ขอบคุณมาก',
        senderId: 'other',
        senderName: 'ผู้สูงอายุ',
        timestamp: new Date(),
        isOwn: false
      };
      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700">
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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700">
      {/* Header */}
      <div className="glass-card mx-4 mt-4 p-4">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center text-white hover:text-pink-300 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            กลับไปหน้าแรก
          </Link>
          <h1 className="text-2xl font-bold text-white">แชท</h1>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Task List */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-white mb-4">งานของฉัน</h2>
              
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => {
                      setSelectedTask(task);
                      loadChatHistory(task.id);
                    }}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedTask?.id === task.id
                        ? 'bg-pink-500/20 border border-pink-400'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <h3 className="font-medium text-white mb-2">{task.title}</h3>
                    <p className="text-white/70 text-sm mb-2 line-clamp-2">
                      {task.description}
                    </p>
                                         <div className="flex items-center text-white/60 text-xs">
                       <MapPin className="w-3 h-3 mr-1" />
                       {task.address}, {task.city}
                     </div>
                    <div className={`inline-block px-2 py-1 rounded-full text-xs mt-2 ${
                      task.status === 'COMPLETED' ? 'bg-green-500/20 text-green-300' :
                      task.status === 'ACCEPTED' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {task.status === 'COMPLETED' ? 'เสร็จสิ้น' :
                       task.status === 'ACCEPTED' ? 'กำลังดำเนินการ' : 'รอการยืนยัน'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <div className="glass-card h-[600px] flex flex-col">
              {/* Chat Header */}
              {selectedTask && (
                <div className="p-4 border-b border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{selectedTask.title}</h3>
                      <p className="text-white/70 text-sm">{selectedTask.description}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="glass-button-secondary p-2 hover:scale-105 transition-transform">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="glass-button-secondary p-2 hover:scale-105 transition-transform">
                        <MapPin className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center space-x-4 text-sm text-white/60">
                                         <div className="flex items-center">
                       <User className="w-4 h-4 mr-1" />
                       {selectedTask.creator.firstName} {selectedTask.creator.lastName}
                     </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      {selectedTask.creator.phone}
                    </div>
                  </div>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                        message.isOwn
                          ? 'bg-pink-500 text-white'
                          : 'bg-white/20 text-white'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString('th-TH', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-white/20">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="พิมพ์ข้อความ..."
                    className="flex-1 bg-white/20 text-white placeholder-white/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="glass-button p-3 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

