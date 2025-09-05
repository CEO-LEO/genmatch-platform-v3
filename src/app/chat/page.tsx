'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Send, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock,
  Users,
  MessageSquare,
  Search,
  Plus
} from 'lucide-react';

export default function ChatPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get('taskId');
  
  const [activeChat, setActiveChat] = useState<any>(null);
  const [chats, setChats] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }
    
    if (user) {
      loadChats();
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (taskId && chats.length > 0) {
      const chat = chats.find(c => c.taskId === parseInt(taskId));
      if (chat) {
        setActiveChat(chat);
        loadMessages(chat.taskId);
      }
    } else if (!taskId && chats.length > 0 && !activeChat) {
      setActiveChat(chats[0]);
      loadMessages(chats[0].taskId);
    }
  }, [taskId, chats]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Always load messages when activeChat changes
  useEffect(() => {
    if (activeChat?.taskId) {
      setMessages([]);
      loadMessages(activeChat.taskId);
    }
  }, [activeChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadChats = async () => {
    setIsLoading(true);
    try {
      // Build chat list from tasks the user created/joined
      const res = await fetch(`/api/tasks/my-tasks?userId=${user?.id}&userType=${user?.userType}`);
      const data = await res.json();
      const source = [
        ...(data.ongoing || []),
        ...(data.completed || [])
      ];
      const mapped = source.map((t: any, idx: number) => ({
        id: t.id || idx + 1,
        taskId: t.id,
        taskTitle: t.title,
        participant: {
          id: user?.userType === 'ELDERLY' ? (t.volunteers?.[0] || 0) : t.creatorId,
          name: user?.userType === 'ELDERLY' ? 'จิตอาสา' : 'ผู้สร้างงาน',
          phone: '',
          avatar: 'GM'
        },
        lastMessage: '',
        lastMessageTime: '',
        unreadCount: 0,
        task: {
          location: t.location,
          date: t.date,
          time: `${t.startTime || ''}${t.endTime ? ' - ' + t.endTime : ''}`.trim()
        }
      }));
      setChats(mapped);
    } catch (error) {
      console.error('Error loading chats:', error);
      setChats([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessages = async (taskIdForChat: number) => {
    try {
      const res = await fetch(`/api/chat?taskId=${taskIdForChat}`);
      const data = await res.json();
      if (res.ok) {
        const mapped = (data.messages || []).map((m: any) => ({
          id: m.id,
          senderId: m.senderId,
          content: m.message,
          timestamp: new Date(m.createdAt).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
          isOwn: m.senderId?.toString() === user?.id?.toString()
        }));
        setMessages(mapped);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      setMessages([]);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeChat) return;

    try {
      const pending = {
        id: `temp_${Date.now()}`,
        senderId: user?.id,
        content: newMessage,
        timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      setMessages(prev => [...prev, pending]);
      setNewMessage('');

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId: activeChat.taskId, senderId: user?.id, message: pending.content })
      });
      if (!res.ok) {
        throw new Error('send failed');
      }
      // Reload from server to get authoritative message ids/order
      await loadMessages(activeChat.taskId);

    } catch (error) {
      console.error('Error sending message:', error);
      // Optionally show a toast here
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.taskTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                  <p className="text-sm text-gray-600">ระบบแชท</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <Link 
                href="/task-management"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                จัดการงาน
              </Link>
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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 h-[600px]">
            {/* Chat List */}
            <div className="lg:col-span-1 border-r border-gray-200">
              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="ค้นหาการสนทนา..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Chat List */}
              <div className="overflow-y-auto h-[500px]">
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => {
                      setActiveChat(chat);
                    }}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      activeChat?.id === chat.id ? 'bg-purple-50 border-purple-200' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">
                          {chat.participant.avatar}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold text-gray-900 truncate">
                            {chat.participant.name}
                          </h3>
                          <span className="text-xs text-gray-500">{chat.lastMessageTime}</span>
                        </div>
                        <p className="text-xs text-gray-600 truncate mb-1">{chat.taskTitle}</p>
                        <p className="text-sm text-gray-700 truncate">{chat.lastMessage}</p>
                        {chat.unreadCount > 0 && (
                          <div className="mt-2">
                            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                              {chat.unreadCount}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-2 flex flex-col">
              {activeChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">
                            {activeChat.participant.avatar}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{activeChat.participant.name}</h3>
                          <p className="text-sm text-gray-600">{activeChat.taskTitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                          <Phone className="w-4 h-4" />
                        </button>
                        <Link
                          href={`/task-management?taskId=${activeChat.taskId}`}
                          className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        >
                          <MapPin className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                    
                    {/* Task Info */}
                    <div className="mt-3 grid grid-cols-3 gap-4 text-xs text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{activeChat.task.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{activeChat.task.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{activeChat.task.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.isOwn
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.isOwn ? 'text-purple-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="พิมพ์ข้อความ..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <button
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                /* No Chat Selected */
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">เลือกการสนทนา</h3>
                    <p className="text-gray-600">เลือกการสนทนาจากรายการด้านซ้ายเพื่อเริ่มแชท</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

