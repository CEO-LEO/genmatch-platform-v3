import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get token from header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'No token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    
    // For demo purposes, return mock user data
    // In production, verify token with JWT or database
    const mockUser = {
      id: '1',
      firstName: 'สมชาย',
      lastName: 'ใจดี',
      email: 'somchai@example.com',
      phone: '0812345678',
      userType: 'STUDENT',
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

    return NextResponse.json(mockUser);
  } catch (error) {
    console.error('Check user error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
