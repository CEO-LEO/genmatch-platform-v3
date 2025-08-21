import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
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
    const updateData = await request.json();
    
    // In production, you would:
    // 1. Verify the token
    // 2. Update user data in database
    // 3. Return updated user data
    
    // For demo purposes, return mock updated user
    const mockUpdatedUser = {
      id: '1',
      firstName: updateData.firstName || 'สมชาย',
      lastName: updateData.lastName || 'ใจดี',
      email: updateData.email || 'somchai@example.com',
      phone: updateData.phone || '0812345678',
      userType: updateData.userType || 'STUDENT',
      studentId: updateData.studentId || '6400000001',
      university: updateData.university || 'มหาวิทยาลัยมหิดล',
      address: updateData.address || 'กรุงเทพมหานคร',
      city: updateData.city || 'กรุงเทพมหานคร',
      province: updateData.province || 'กรุงเทพมหานคร',
      postalCode: updateData.postalCode || '10100',
      avatar: updateData.avatar || '',
      rating: updateData.rating || 4.8,
      totalHours: updateData.totalHours || 25,
      completedTasks: updateData.completedTasks || 8,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(mockUpdatedUser);
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
