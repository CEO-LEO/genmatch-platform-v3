import { NextRequest, NextResponse } from 'next/server';

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

    // For demo purposes, accept any login
    // In production, verify credentials with database
    const mockUser = {
      id: '1',
      firstName: 'สมชาย',
      lastName: 'ใจดี',
      email: email,
      phone: '0812345678',
      userType: 'STUDENT' as const,
      studentId: '6400000001',
      university: 'มหาวิทยาลัยมหิดล',
      address: 'กรุงเทพมหานคร',
      city: 'กรุงเทพมหานคร',
      province: 'กรุงเทพมหานคร',
      postalCode: '10100',
      avatar: '',
      rating: 4.8,
      totalHours: 25,
      completedTasks: 8,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    };

    const mockToken = 'mock_jwt_token_' + Date.now();

    return NextResponse.json({
      user: mockUser,
      token: mockToken,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
