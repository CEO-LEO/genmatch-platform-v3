'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  User,
  MessageCircle,
  AlertCircle,
  Share2,
  Bookmark
} from 'lucide-react';
import Link from 'next/link';

interface TaskRecord {
  id: number | string;
  title: string;
  description: string;
  category: string;
  location?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  status: string;
  contactName?: string;
  contactPhone?: string;
  creatorId: number | string;
  firstName?: string;
  lastName?: string;
  creatorPhone?: string;
}

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [task, setTask] = useState<TaskRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);

  useEffect(() => {
    loadTask();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.id]);

  const loadTask = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/tasks/${params.id}/status`);
      const data = await res.json();
      if (res.ok && data?.task) {
        setTask(data.task);
      } else {
        setTask(null);
      }
    } catch (error) {
      console.error('Error loading task:', error);
      setTask(null);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  const handleAcceptTask = async () => {
    if (!task || !user || isAccepting) return;
    const ok = window.confirm(`คุณต้องการรับงาน "${task.title}" ใช่หรือไม่?`);
    if (!ok) return;
    setIsAccepting(true);
    try {
      const response = await fetch(`/api/tasks/${task.id}/accept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id })
      });
      if (response.ok) {
        alert('🎉 รับงานสำเร็จแล้ว!');
        router.push('/my-tasks');
      } else {
        const err = await response.json();
        alert(err.error || 'ไม่สามารถรับงานได้');
      }
    } catch (e) {
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
      setIsAccepting(false);
    }
  };

  const handleContactCreator = () => {
    if (!task) return;
    router.push(`/chat?taskId=${task.id}&userId=${task.creatorId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">ไม่พบงาน</h2>
          <p className="text-gray-600 mb-6">งานที่คุณค้นหาอาจถูกลบหรือไม่มีอยู่</p>
          <Link 
            href="/search"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            กลับไปค้นหา
          </Link>
        </div>
      </div>
    );
  }

  const statusBadge = (() => {
    const base = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium';
    if (task.status === 'PENDING') return <div className={`${base} bg-yellow-100 text-yellow-800`}>รอจิตอาสา</div>;
    if (task.status === 'ACCEPTED') return <div className={`${base} bg-blue-100 text-blue-800`}>มีจิตอาสารับแล้ว</div>;
    if (task.status === 'IN_PROGRESS') return <div className={`${base} bg-indigo-100 text-indigo-800`}>กำลังดำเนินการ</div>;
    if (task.status === 'COMPLETED') return <div className={`${base} bg-green-100 text-green-800`}>เสร็จสิ้น</div>;
    return <div className={`${base} bg-gray-100 text-gray-800`}>{task.status}</div>;
  })();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">รายละเอียดงาน</h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked ? 'text-red-500 hover:bg-red-50' : 'text-gray-400 hover:bg-gray-100'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-2">{task.title}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(task.date)} {task.startTime && `เวลา ${task.startTime}${task.endTime ? ` - ${task.endTime}` : ''}`}</span>
                </div>
                {task.location && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{task.location}</span>
                  </div>
                )}
              </div>
            </div>
            {statusBadge}
          </div>
          <p className="text-gray-700 leading-relaxed">{task.description}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ผู้สร้างงาน</h3>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {(task.firstName || 'U').charAt(0)}
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">{task.firstName} {task.lastName}</div>
              {task.creatorPhone && <div className="text-sm text-gray-600">เบอร์โทร: {task.creatorPhone}</div>}
            </div>
          </div>
        </div>

        <div className="space-y-3 pb-6">
          <button
            onClick={handleAcceptTask}
            disabled={isAccepting || task.status !== 'PENDING' || !user}
            className={`w-full py-4 rounded-xl font-semibold text-lg focus:ring-4 transition-all duration-200 active:scale-95 ${
              isAccepting || task.status !== 'PENDING' || !user
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-200'
            }`}
          >
            {task.status === 'PENDING' ? (isAccepting ? 'กำลังรับงาน...' : 'รับงานนี้') : 'ไม่พร้อมรับสมัคร'}
          </button>
          <button
            onClick={handleContactCreator}
            className="w-full py-4 border-2 border-purple-300 text-purple-700 rounded-xl font-semibold text-lg hover:border-purple-500 hover:text-purple-800 hover:bg-purple-50 transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
          >
            <MessageCircle className="w-5 h-5 inline mr-2" />
            💬 ติดต่อผู้สร้างงาน
          </button>
        </div>
      </main>

      <div className="h-6 bg-gray-50 md:hidden"></div>
    </div>
  );
}
