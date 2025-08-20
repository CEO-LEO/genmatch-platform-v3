import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      password, 
      userType, 
      phone, 
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
        { message: 'First name, last name, email, password, and user type are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    if (!['STUDENT', 'ELDERLY'].includes(userType)) {
      return NextResponse.json(
        { message: 'Invalid user type' },
        { status: 400 }
      );
    }

    // Validate student-specific fields
    if (userType === 'STUDENT' && (!studentId || !university)) {
      return NextResponse.json(
        { message: 'Student ID and university are required for students' },
        { status: 400 }
      );
    }

    // Create demo user with enhanced data
    const user = {
      id: 'demo-user-' + Date.now(),
      firstName,
      lastName,
      email,
      phone: phone || '',
      userType,
      studentId: studentId || '',
      university: university || '',
      address: address || '',
      city: city || '',
      province: province || '',
      postalCode: postalCode || '',
      avatar: '',
      rating: 0,
      totalHours: 0,
      completedTasks: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const token = 'demo-token-' + Date.now();

    return NextResponse.json({
      token,
      user
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
