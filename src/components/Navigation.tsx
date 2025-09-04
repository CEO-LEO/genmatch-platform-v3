'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import LogoIcon from './LogoIcon';
import { 
  Home, 
  Search, 
  Plus, 
  Bell, 
  User, 
  Menu, 
  X, 
  LogOut,
  Settings,
  MessageCircle,
  BarChart3,
  Award,
  BookOpen,
  HelpCircle,
  Sun,
  Moon
} from 'lucide-react';

export default function Navigation() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  }, [pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      // Close profile dropdown on any outside click
      if (isProfileDropdownOpen) setIsProfileDropdownOpen(false);
      // Close mobile menu when clicking outside menu and its toggle button
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        !(mobileMenuButtonRef.current && mobileMenuButtonRef.current.contains(target))
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileDropdownOpen, isMobileMenuOpen]);

  // Close menus with Esc key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
        if (isProfileDropdownOpen) setIsProfileDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen, isProfileDropdownOpen]);

  // Remove history pushState behavior to avoid trapping navigation
  useEffect(() => {
    // Intentionally left blank
  }, [isMobileMenuOpen, isProfileDropdownOpen]);

  const handleLogout = async () => {
    await logout();
    setIsProfileDropdownOpen(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // TODO: Implement actual dark mode toggle
  };

  const navigationItems = [
    { href: '/dashboard', icon: Home, label: 'หน้าแรก', exact: true },
    { href: '/search', icon: Search, label: 'ค้นหา' },
    { href: '/add-task', icon: Plus, label: 'เพิ่มงาน' },
    { href: '/feed', icon: BarChart3, label: 'ฟีดชุมชน' },
    { href: '/chat', icon: MessageCircle, label: 'แชท' },
    { href: '/my-tasks', icon: BookOpen, label: 'งานของฉัน' },
    { href: '/statistics', icon: BarChart3, label: 'สถิติ' },
    { href: '/achievements', icon: Award, label: 'ความสำเร็จ' },
    { href: '/notifications', icon: Bell, label: 'แจ้งเตือน' },
  ];

  const isActiveRoute = (href: string, exact: boolean = false) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const [notificationCount, setNotificationCount] = useState(0);
  const [unreadChatCount, setUnreadChatCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        if (!user) return;
        const notifRes = await fetch(`/api/notifications?userId=${user.id}&isRead=false&limit=1`);
        const notifData = await notifRes.json();
        if (notifRes.ok) setNotificationCount((notifData.notifications || []).length);

        // For chats, approximate unread as 0 for now or compute from server later
        setUnreadChatCount(0);
      } catch {}
    };
    fetchCounts();
  }, [user]);

  const getNotificationCount = () => notificationCount;

  const getUnreadChatCount = () => unreadChatCount;

  return (
    <>
      {/* Backdrop overlay to allow closing menus by clicking outside (mobile + desktop) */}
      {(isMobileMenuOpen || isProfileDropdownOpen) && (
        <div
          className="fixed inset-0 z-30 bg-black/0"
          onClick={() => { setIsMobileMenuOpen(false); setIsProfileDropdownOpen(false); }}
        />
      )}
      {/* Desktop Navigation */}
      <nav className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 z-40">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/20">
            <Link href="/dashboard" className="flex items-center space-x-3">
              <LogoIcon size="md" variant="white" />
              <span className="text-2xl font-bold text-white">GenMatch</span>
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 py-6">
            <nav className="space-y-2 px-4">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(item.href, item.exact);
                const hasBadge = (item.href === '/notifications' && getNotificationCount() > 0) ||
                               (item.href === '/chat' && getUnreadChatCount() > 0);

                const handleClick = () => {
                  setIsMobileMenuOpen(false);
                  setIsProfileDropdownOpen(false);
                };

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`sidebar-link group ${
                      isActive ? 'active' : ''
                    }`}
                    onClick={handleClick}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span className="flex-1">{item.label}</span>
                    
                    {/* Badge */}
                    {hasBadge && (
                      <span className="bg-pink-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {item.href === '/notifications' ? getNotificationCount() : getUnreadChatCount()}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* User Profile Section */}
          {user && (
            <div className="p-4 border-t border-white/20">
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-white font-medium text-sm">{user.name}</p>
                    <p className="text-white/60 text-xs">
                      {user.userType === 'STUDENT' ? 'นักศึกษา' : 'ผู้สูงอายุ'}
                    </p>
                  </div>
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 dropdown">
                    <Link
                      href="/profile"
                      className="dropdown-item flex items-center"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <User className="w-4 h-4 mr-3" />
                      โปรไฟล์
                    </Link>
                    <Link
                      href="/settings"
                      className="dropdown-item flex items-center"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      ตั้งค่า
                    </Link>
                    <button
                      onClick={toggleDarkMode}
                      className="dropdown-item flex items-center w-full"
                    >
                      {isDarkMode ? (
                        <>
                          <Sun className="w-4 h-4 mr-3" />
                          โหมดสว่าง
                        </>
                      ) : (
                        <>
                          <Moon className="w-4 h-4 mr-3" />
                          โหมดมืด
                        </>
                      )}
                    </button>
                    <div className="border-t border-white/20 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item flex items-center w-full text-red-400 hover:text-red-300"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      ออกจากระบบ
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50">
        {/* Top Bar */}
        <div className="glass-card mx-4 mt-4 p-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center space-x-3">
              <LogoIcon size="sm" variant="white" />
              <span className="text-xl font-bold text-white">GenMatch</span>
            </Link>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <Link href="/notifications" className="relative p-2 text-white/70 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                {getNotificationCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getNotificationCount()}
                  </span>
                )}
              </Link>

              {/* Chat */}
              <Link href="/chat" className="relative p-2 text-white/70 hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
                {getUnreadChatCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getUnreadChatCount()}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                ref={mobileMenuButtonRef}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-white/70 hover:text-white transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div ref={mobileMenuRef} className="glass-card mx-4 mt-2 p-4">
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(item.href, item.exact);
                const hasBadge = (item.href === '/notifications' && getNotificationCount() > 0) ||
                               (item.href === '/chat' && getUnreadChatCount() > 0);

                const handleClick = () => {
                  setIsMobileMenuOpen(false);
                  setIsProfileDropdownOpen(false);
                };

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center p-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={handleClick}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span className="flex-1">{item.label}</span>
                    
                    {/* Badge */}
                    {hasBadge && (
                      <span className="bg-pink-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {item.href === '/notifications' ? getNotificationCount() : getUnreadChatCount()}
                      </span>
                    )}
                  </Link>
                );
              })}

              {/* User Profile Section */}
              {user && (
                <>
                  <div className="border-t border-white/20 my-2"></div>
                  <div className="p-3">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.name}</p>
                        <p className="text-white/60 text-sm">
                          {user.userType === 'STUDENT' ? 'นักศึกษา' : 'ผู้สูงอายุ'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Link
                        href="/profile"
                        className="flex items-center p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        onClick={() => { setIsMobileMenuOpen(false); setIsProfileDropdownOpen(false); }}
                      >
                        <User className="w-4 h-4 mr-3" />
                        โปรไฟล์
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        onClick={() => { setIsMobileMenuOpen(false); setIsProfileDropdownOpen(false); }}
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        ตั้งค่า
                      </Link>
                      <button
                        onClick={toggleDarkMode}
                        className="flex items-center p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors w-full"
                      >
                        {isDarkMode ? (
                          <>
                            <Sun className="w-4 h-4 mr-3" />
                            โหมดสว่าง
                          </>
                        ) : (
                          <>
                            <Moon className="w-4 h-4 mr-3" />
                            โหมดมืด
                          </>
                        )}
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors w-full"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        ออกจากระบบ
                      </button>
                    </div>
                  </div>
                </>
              )}
            </nav>
          </div>
        )}
      </nav>

      {/* Bottom Navigation (Mobile) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
        <div className="glass-card mx-4 mb-4 p-2">
          <div className="flex items-center justify-around">
            {[
              { href: '/dashboard', icon: Home, label: 'หน้าแรก' },
              { href: '/search', icon: Search, label: 'ค้นหา' },
              { href: '/add-task', icon: Plus, label: 'เพิ่มงาน' },
              { href: '/chat', icon: MessageCircle, label: 'แชท' },
              { href: '/profile', icon: User, label: 'โปรไฟล์' }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item.href);
              const hasBadge = item.href === '/chat' && getUnreadChatCount() > 0;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                    isActive
                      ? 'text-white bg-white/20'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="relative">
                    <Icon className="w-5 h-5" />
                    {hasBadge && (
                      <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {getUnreadChatCount()}
                      </span>
                    )}
                  </div>
                  <span className="text-xs mt-1">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navigation */}
      <div className="lg:w-64"></div>
      <div className="lg:hidden h-20"></div>
      <div className="lg:hidden h-20"></div>
    </>
  );
}
