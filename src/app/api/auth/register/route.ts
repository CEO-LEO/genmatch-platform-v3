import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for registered users (in production, this would be a database)
let registeredUsers: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      userType,
      studentId,
      university,
      address,
      city,
      province,
      postalCode
    } = await request.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !userType) {
      return NextResponse.json(
        { message: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน' },
        { status: 400 }
      );
    }

    // Validate student-specific fields
    if (userType === 'STUDENT' && (!studentId || !university)) {
      return NextResponse.json(
        { message: 'รหัสนักศึกษาและมหาวิทยาลัยจำเป็นสำหรับนักศึกษา' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = registeredUsers.find(user => user.email === email);
    if (existingUser) {
      return NextResponse.json(
        { message: 'อีเมลนี้ถูกใช้งานแล้ว กรุณาใช้อีเมลอื่น' },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = {
      id: 'user_' + Date.now(),
      firstName,
      lastName,
      email,
      phone: phone || '',
      password, // In production, this should be hashed
      userType,
      studentId: studentId || '',
      university: university || '',
      address: address || '',
      city: city || '',
      province: province || '',
      postalCode: postalCode || '',
      avatar: '',
      rating: 4.5,
      totalHours: 0,
      completedTasks: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save user to our storage
    registeredUsers.push(newUser);

    // Create response user object (without password)
    const responseUser = { ...newUser };
    delete responseUser.password;

    const token = 'jwt_token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    return NextResponse.json({
      user: responseUser,
      token: token,
      message: 'สร้างบัญชีสำเร็จ! ตอนนี้คุณสามารถเข้าสู่ระบบได้แล้ว'
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดในระบบ กรุณาลองใหม่อีกครั้ง' },
      { status: 500 }
    );
  }
}

// Function to get all registered users (for debugging)
export function getRegisteredUsers() {
  return registeredUsers;
}
