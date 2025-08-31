'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, RotateCcw, MapPin, Calendar, Clock, User } from 'lucide-react';

export default function TaskHelpPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header - Enhanced Design */}
      <header className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link 
                href="/dashboard" 
                className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300"
              >
                <ArrowLeft className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </Link>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">ช่วยพาออกกำลังกาย</h1>
                <p className="text-purple-100 text-sm sm:text-base font-medium">งานจิตอาสา</p>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300 disabled:opacity-50"
            >
              <RotateCcw className={`w-6 h-6 text-white ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl shadow-purple-100/50 border border-white/20 p-6 sm:p-8">
          
          {/* Task Info */}
          <div className="mb-8">
            {/* Location */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">ตำแหน่ง</p>
                <p className="text-lg font-bold text-gray-900">กรุงเทพมหานคร</p>
              </div>
            </div>

            {/* Progress Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-gray-800">ความคืบหน้า</p>
                <p className="text-sm font-medium text-purple-600">75%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: '75%' }}
                ></div>
              </div>
            </div>

            {/* Task Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-xs text-gray-500">วันที่</p>
                  <p className="text-sm font-semibold text-gray-800">15 มกราคม 2568</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-xs text-gray-500">เวลา</p>
                  <p className="text-sm font-semibold text-gray-800">06:00 - 08:00</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-xs text-gray-500">ผู้สูงอายุ</p>
                  <p className="text-sm font-semibold text-gray-800">คุณสมชาย</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 mb-8">
            <Link
              href="/task/1"
              className="block w-full bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 text-white py-4 px-6 rounded-2xl font-bold text-lg text-center hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-purple-200 hover:shadow-purple-300 hover:scale-[1.02] active:scale-[0.98] transform"
            >
              ดูรายละเอียด
            </Link>
            
            <button
              disabled
              className="w-full bg-white border-2 border-purple-300 text-purple-600 py-4 px-6 rounded-2xl font-bold text-lg hover:bg-purple-50 transition-all duration-300 opacity-50 cursor-not-allowed"
            >
              แก้ไข
            </button>
          </div>

          {/* Help Message */}
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-2xl p-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-orange-600 text-sm font-bold">!</span>
              </div>
              <div>
                <h3 className="font-bold text-orange-800 mb-2 text-lg">ปุ่มแก้ไข ไม่สามารถใช้งานได้</h3>
                <p className="text-orange-700 leading-relaxed">
                  เนื่องจากไม่รู้จุดประสงค์ของการแก้ไขนี้ จึงไม่สามารถบอกข้อผิดได้
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="font-bold text-gray-800 mb-4">ข้อมูลเพิ่มเติม</h4>
            <div className="space-y-3 text-sm text-gray-600">
              <p>• งานนี้อยู่ในระหว่างดำเนินการ</p>
              <p>• หากมีปัญหาสามารถติดต่อผู้ดูแลระบบได้</p>
              <p>• การแก้ไขข้อมูลจะเปิดใช้งานในอนาคต</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
