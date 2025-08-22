import { NextRequest, NextResponse } from 'next/server';
import testUsers from '@/data/test-users.json';

// In-memory storage for registered users (in production, this would be a database)
let registeredUsers: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    let foundUser = null;
    let userType = '';

    // First, check if user exists in test users
    const student = testUsers.students.find(user => 
      user.email === email && user.password === password
    );
    if (student) {
      foundUser = student;
      userType = 'STUDENT';
    }

    if (!foundUser) {
      const elderly = testUsers.elderly.find(user => 
        user.email === email && user.password === password
      );
      if (elderly) {
        foundUser = elderly;
        userType = 'ELDERLY';
      }
    }

    // If not found in test users, check registered users
    if (!foundUser) {
      const registeredUser = registeredUsers.find(user => 
        user.email === email && user.password === password
      );
      if (registeredUser) {
        foundUser = registeredUser;
        userType = registeredUser.userType;
      }
    }

    if (!foundUser) {
      return NextResponse.json(
        { message: 'เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบข้อมูลอีกครั้ง' },
        { status: 401 }
      );
    }

    // Convert user data to match our User interface
    const userData = {
      id: foundUser.id || `user_${Date.now()}`,
      firstName: foundUser.firstName || foundUser.name?.split(' ')[0] || foundUser.name || '',
      lastName: foundUser.lastName || foundUser.name?.split(' ').slice(1).join(' ') || '',
      email: foundUser.email,
      phone: foundUser.phone,
      userType: userType as 'STUDENT' | 'ELDERLY',
      studentId: userType === 'STUDENT' ? (foundUser as any).studentId || `64000000${Math.floor(Math.random() * 1000)}` : undefined,
      university: userType === 'STUDENT' ? (foundUser as any).university : undefined,
      address: foundUser.address || 'กรุงเทพมหานคร',
      city: foundUser.city || 'กรุงเทพมหานคร',
      province: foundUser.province || 'กรุงเทพมหานคร',
      postalCode: foundUser.postalCode || '10110',
      avatar: foundUser.avatar || '',
      rating: foundUser.rating || 4.5,
      totalHours: userType === 'STUDENT' ? (foundUser as any).volunteerHours || (foundUser as any).totalHours || 0 : 0,
      completedTasks: foundUser.completedTasks || 0,
      createdAt: foundUser.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const token = 'jwt_token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    return NextResponse.json({
      user: userData,
      token: token,
      message: 'เข้าสู่ระบบสำเร็จ'
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดในระบบ กรุณาลองใหม่อีกครั้ง' },
      { status: 500 }
    );
  }
}

// Function to add newly registered users (called from registration API)
export function addRegisteredUser(userData: any) {
  const newUser = {
    ...userData,
    id: `user_${Date.now()}`,
    createdAt: new Date().toISOString(),
    rating: 4.5,
    completedTasks: 0,
    totalHours: 0
  };
  registeredUsers.push(newUser);
  return newUser;
}
