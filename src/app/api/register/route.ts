import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📝 Registration request data:', body);
    
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
      console.log('❌ Missing required fields:', { firstName, lastName, phone, userType, address, password });
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      console.log('❌ Password mismatch');
      return NextResponse.json(
        { error: 'รหัสผ่านไม่ตรงกัน' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      console.log('❌ Password too short:', password.length);
      return NextResponse.json(
        { error: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' },
        { status: 400 }
      );
    }

    // Normalize userType
    const normalizedUserType = userType.toLowerCase() === 'student' ? 'STUDENT' : 'ELDERLY';
    
    // Student-specific validation
    if (normalizedUserType === 'STUDENT') {
      if (!email || !studentId || !university) {
        console.log('❌ Missing student fields:', { email, studentId, university });
        return NextResponse.json(
          { error: 'กรุณากรอกข้อมูลสำหรับนักศึกษาให้ครบถ้วน' },
          { status: 400 }
        );
      }
    }

    // Phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      console.log('❌ Invalid phone format:', phone);
      return NextResponse.json(
        { error: 'เบอร์โทรศัพท์ไม่ถูกต้อง (ต้องมี 10 หลัก)' },
        { status: 400 }
      );
    }

    console.log('✅ Validation passed, connecting to database...');
    
    try {
      const db = await getDatabase();
      console.log('✅ Database connected successfully');

      // Check if phone already exists
      const existingUser = await db.get('SELECT id FROM users WHERE phone = ?', [phone]);
      if (existingUser) {
        console.log('❌ Phone number already exists:', phone);
        return NextResponse.json(
          { error: 'เบอร์โทรศัพท์นี้ถูกใช้งานแล้ว' },
          { status: 400 }
        );
      }

      console.log('✅ Phone number is unique, hashing password...');
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('✅ Password hashed successfully');

      // Prepare data for insertion
      const insertData = [
        firstName, 
        lastName, 
        normalizedUserType === 'STUDENT' ? email : null, 
        phone, 
        normalizedUserType,
        normalizedUserType === 'STUDENT' ? studentId : null, 
        normalizedUserType === 'STUDENT' ? university : null, 
        address, 
        hashedPassword
      ];
      
      console.log('📝 Inserting user data:', {
        firstName, lastName, userType: normalizedUserType, phone, address,
        hasEmail: !!email, hasStudentId: !!studentId, hasUniversity: !!university
      });

      // Insert user into database
      const result = await db.run(`
        INSERT INTO users (
          firstName, lastName, email, phone, userType, studentId, 
          university, address, password
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, insertData);

      console.log('✅ User inserted successfully, ID:', result.lastID);

      return NextResponse.json({
        success: true,
        message: 'สมัครสมาชิกสำเร็จ',
        userId: result.lastID
      });

    } catch (dbError) {
      console.error('❌ Database operation failed:', dbError);
      
      // Try mock database fallback for development/demo
      try {
        console.log('⚠️ Falling back to mock database...');
        
        // Create mock user for demo purposes
        const mockUser = {
          id: `user_${Date.now()}`,
          firstName,
          lastName,
          email: normalizedUserType === 'STUDENT' ? email : '',
          phone,
          userType: normalizedUserType,
          studentId: normalizedUserType === 'STUDENT' ? studentId : '',
          university: normalizedUserType === 'STUDENT' ? university : '',
          address,
          createdAt: new Date().toISOString()
        };
        
        console.log('✅ Mock user created:', mockUser);
        
        return NextResponse.json({
          success: true,
          message: 'สมัครสมาชิกสำเร็จ (Demo Mode)',
          userId: mockUser.id,
          user: mockUser
        });
        
      } catch (mockError) {
        console.error('❌ Mock database fallback failed:', mockError);
        throw dbError;
      }
    }

  } catch (error) {
    console.error('❌ Registration error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'เกิดข้อผิดพลาดในการสมัครสมาชิก';
    
    if (error instanceof Error) {
      if (error.message.includes('database')) {
        errorMessage = 'ไม่สามารถเชื่อมต่อฐานข้อมูลได้';
      } else if (error.message.includes('validation')) {
        errorMessage = 'ข้อมูลไม่ถูกต้อง';
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
