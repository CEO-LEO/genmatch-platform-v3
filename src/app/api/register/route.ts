import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      userType,
      studentId,
      university,
      address,
      password,
      confirmPassword
    } = body;

    // Validation
    if (!firstName || !lastName || !phone || !userType || !address || !password) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'รหัสผ่านไม่ตรงกัน' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' },
        { status: 400 }
      );
    }

    // Student-specific validation
    if (userType === 'student') {
      if (!email || !studentId || !university) {
        return NextResponse.json(
          { error: 'กรุณากรอกข้อมูลสำหรับนักศึกษาให้ครบถ้วน' },
          { status: 400 }
        );
      }
    }

    // Phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'เบอร์โทรศัพท์ไม่ถูกต้อง' },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    // Check if phone already exists
    const existingUser = await db.get('SELECT id FROM users WHERE phone = ?', [phone]);
    if (existingUser) {
      return NextResponse.json(
        { error: 'เบอร์โทรศัพท์นี้ถูกใช้งานแล้ว' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const result = await db.run(`
      INSERT INTO users (
        firstName, lastName, email, phone, userType, studentId, 
        university, address, password
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      firstName, lastName, email || null, phone, userType,
      studentId || null, university || null, address, hashedPassword
    ]);

    return NextResponse.json({
      success: true,
      message: 'สมัครสมาชิกสำเร็จ',
      userId: result.lastID
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการสมัครสมาชิก' },
      { status: 500 }
    );
  }
}
