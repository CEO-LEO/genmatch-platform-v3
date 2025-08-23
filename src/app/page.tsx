'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-2">
                <span className="text-white font-bold text-lg">GM</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">GenMatch</h1>
                <p className="text-sm text-gray-500">Generation Matching</p>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-8">
              <Link href="#features" className="text-gray-700 hover:text-purple-600 transition-colors">
                คุณสมบัติ
              </Link>
              <Link href="#how-to-use" className="text-gray-700 hover:text-purple-600 transition-colors">
                วิธีใช้งาน
              </Link>
              <Link href="#about" className="text-gray-700 hover:text-purple-600 transition-colors">
                เกี่ยวกับเรา
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link 
                href="/login"
                className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
              >
                เข้าสู่ระบบ
              </Link>
              <Link 
                href="/register"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                สมัครสมาชิก
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        {/* Central Icon */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-purple-600 rounded-full flex items-center justify-center">
            <div className="text-white text-6xl">👥</div>
          </div>
        </div>

        {/* Main Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
          <span className="text-purple-600">เชื่อมโยงจิตอาสา</span>
          <br />
          <span className="text-purple-600">สร้างสังคมดี</span>
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-600 text-center max-w-2xl mb-12 leading-relaxed">
          แพลตฟอร์มเชื่อมโยงนักศึกษาและผู้สูงอายุ เพื่อการเป็นจิตอาสาที่มีประสิทธิภาพ
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/register"
            className="px-8 py-4 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition-colors text-center"
          >
            เริ่มต้นใช้งาน
          </Link>
          <Link 
            href="/login"
            className="px-8 py-4 border border-gray-300 text-purple-600 text-lg font-semibold rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            เข้าสู่ระบบ
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p>&copy; 2024 GenMatch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}