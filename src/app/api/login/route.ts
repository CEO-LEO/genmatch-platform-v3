import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, password } = body;

    // Validation
    if (!phone || !password) {
      return NextResponse.json(
        { error: 'กรุณากรอกเบอร์โทรศัพท์และรหัสผ่าน' },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    // Get user by phone
    const user = await db.get(`
      SELECT id, firstName, lastName, email, phone, userType, 
             studentId, university, address, password
      FROM users WHERE phone = ?
    `, [phone]);

    if (!user) {
      return NextResponse.json(
        { error: 'เบอร์โทรศัพท์หรือรหัสผ่านไม่ถูกต้อง' },
        { status: 401 }
      );
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'เบอร์โทรศัพท์หรือรหัสผ่านไม่ถูกต้อง' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        phone: user.phone,
        userType: user.userType 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      message: 'เข้าสู่ระบบสำเร็จ',
      user: userWithoutPassword,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' },
      { status: 500 }
    );
  }
}
