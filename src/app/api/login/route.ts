import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'genmatch-super-secret-jwt-key-2024';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('🔐 Login attempt for phone:', body.phone);
    
    const { phone, password } = body;

    // Validation
    if (!phone || !password) {
      console.log('❌ Missing credentials:', { hasPhone: !!phone, hasPassword: !!password });
      return NextResponse.json(
        { error: 'กรุณากรอกเบอร์โทรศัพท์และรหัสผ่าน' },
        { status: 400 }
      );
    }

    console.log('✅ Validation passed, connecting to database...');
    const db = await getDatabase();
    console.log('✅ Database connected successfully');

    // Get user by phone
    console.log('🔍 Searching for user with phone:', phone);
    const user = await db.get(`SELECT id, firstName, lastName, email, phone, userType, 
             studentId, university, address, password
      FROM users WHERE phone = ?`, [phone]);

    if (!user) {
      console.log('❌ User not found for phone:', phone);
      return NextResponse.json(
        { error: 'เบอร์โทรศัพท์หรือรหัสผ่านไม่ถูกต้อง' },
        { status: 401 }
      );
    }

    console.log('✅ User found:', { id: user.id, firstName: user.firstName, userType: user.userType });

    // Check password
    console.log('🔐 Verifying password...');
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log('❌ Invalid password for user:', user.id);
      return NextResponse.json(
        { error: 'เบอร์โทรศัพท์หรือรหัสผ่านไม่ถูกต้อง' },
        { status: 401 }
      );
    }

    console.log('✅ Password verified successfully');

    // Generate JWT token
    console.log('🎫 Generating JWT token...');
    const token = jwt.sign(
      { 
        userId: user.id, 
        phone: user.phone,
        userType: user.userType 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('✅ JWT token generated successfully');

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;

    console.log('✅ Login successful for user:', user.id);

    return NextResponse.json({
      success: true,
      message: 'เข้าสู่ระบบสำเร็จ',
      user: userWithoutPassword,
      token
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    
    let errorMessage = 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ';
    
    if (error instanceof Error) {
      if (error.message.includes('database')) {
        errorMessage = 'ไม่สามารถเชื่อมต่อฐานข้อมูลได้';
      } else if (error.message.includes('jwt')) {
        errorMessage = 'เกิดข้อผิดพลาดในการสร้าง token';
      }
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined
      },
      { status: 500 }
    );
  }
}
