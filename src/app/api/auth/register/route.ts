import { NextRequest, NextResponse } from 'next/server';

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
        { message: 'Missing required fields' },
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

    // For demo purposes, create mock user
    // In production, save to database and hash password
    const mockUser = {
      id: 'user_' + Date.now(),
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
      updatedAt: new Date().toISOString(),
    };

    const mockToken = 'mock_jwt_token_' + Date.now();

    return NextResponse.json({
      user: mockUser,
      token: mockToken,
      message: 'Registration successful'
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
