import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// JWT Secret configuration with validation
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-jwt-secret-for-development';

if (!process.env.JWT_SECRET) {
  console.warn('⚠️ JWT_SECRET environment variable is not set - using fallback');
  if (process.env.VERCEL === '1') {
    console.error('❌ Running in Vercel production - set JWT_SECRET in environment variables');
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check JWT secret first
    if (!JWT_SECRET) {
      console.error('❌ JWT_SECRET not configured');
      return NextResponse.json(
        { error: 'ระบบยังไม่ได้ตั้งค่า - กรุณาติดต่อผู้ดูแลระบบ' },
        { status: 500 }
      );
    }

    const body = await request.json();
    console.log('🔐 Login attempt for phone:', body.phone);
    
    const phoneRaw = (body.phone || '').toString().trim();
    // Normalize common phone formats
    const digitsOnly = phoneRaw.replace(/\D/g, '');
    const phone = phoneRaw.startsWith('+66')
      ? '0' + phoneRaw.replace(/\D/g, '').substring(2)
      : (digitsOnly.length === 9 ? '0' + digitsOnly : digitsOnly);
    const password = (body.password || '').toString();

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
    let user = await db.get(`SELECT id, firstName, lastName, email, phone, userType, 
             studentId, university, address, password
      FROM users WHERE phone = ?`, [phone]);

    // Fallback: try the raw input (in case DB stores with dashes/spaces)
    if (!user && phoneRaw && phoneRaw !== phone) {
      user = await db.get(`SELECT id, firstName, lastName, email, phone, userType, 
               studentId, university, address, password
        FROM users WHERE phone = ?`, [phoneRaw]);
    }

    if (!user) {
      console.log('❌ User not found for phone:', phone);
      return NextResponse.json(
        { error: 'เบอร์โทรศัพท์หรือรหัสผ่านไม่ถูกต้อง' },
        { status: 401 }
      );
    }

    console.log('✅ User found:', { id: user.id, firstName: user.firstName, userType: user.userType });

    // Check password: support both bcrypt-hashed and legacy plain-text passwords
    console.log('🔐 Verifying password...');
    let isValidPassword = false;
    const stored = String(user.password || '');
    if (stored.startsWith('$2a$') || stored.startsWith('$2b$') || stored.startsWith('$2y$')) {
      isValidPassword = await bcrypt.compare(password, stored);
    } else {
      isValidPassword = password === stored;
    }
    
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
    let suggestion = '';
    
    if (error instanceof Error) {
      if (error.message.includes('Supabase not configured')) {
        errorMessage = 'ระบบฐานข้อมูลยังไม่ได้ตั้งค่า';
        suggestion = 'กรุณาติดต่อผู้ดูแลระบบเพื่อตั้งค่า Supabase';
      } else if (error.message.includes('Database tables not created')) {
        errorMessage = 'ฐานข้อมูลยังไม่ได้สร้างตาราง';
        suggestion = 'กรุณารัน SQL setup script ใน Supabase';
      } else if (error.message.includes('Supabase connection failed')) {
        errorMessage = 'ไม่สามารถเชื่อมต่อฐานข้อมูลได้';
        suggestion = 'กรุณาตรวจสอบการตั้งค่า Supabase';
      } else if (error.message.includes('database')) {
        errorMessage = 'ไม่สามารถเชื่อมต่อฐานข้อมูลได้';
        suggestion = 'กรุณาตรวจสอบการเชื่อมต่อ';
      } else if (error.message.includes('jwt')) {
        errorMessage = 'เกิดข้อผิดพลาดในการสร้าง token';
        suggestion = 'กรุณาตรวจสอบ JWT_SECRET';
      }
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        suggestion: suggestion,
        details: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined
      },
      { status: 500 }
    );
  }
}
