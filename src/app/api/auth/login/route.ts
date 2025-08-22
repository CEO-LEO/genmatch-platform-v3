import { NextRequest, NextResponse } from 'next/server';
import testUsers from '@/data/test-users.json';

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

    // Check if user exists in test users
    let foundUser = null;
    let userType = '';

    // Check students
    const student = testUsers.students.find(user => 
      user.email === email && user.password === password
    );
    if (student) {
      foundUser = student;
      userType = 'STUDENT';
    }

    // Check elderly if not found in students
    if (!foundUser) {
      const elderly = testUsers.elderly.find(user => 
        user.email === email && user.password === password
      );
      if (elderly) {
        foundUser = elderly;
        userType = 'ELDERLY';
      }
    }

    if (!foundUser) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Convert test user data to match our User interface
    const mockUser = {
      id: foundUser.id,
      firstName: foundUser.name.split(' ')[0] || foundUser.name,
      lastName: foundUser.name.split(' ').slice(1).join(' ') || '',
      email: foundUser.email,
      phone: foundUser.phone,
      userType: userType as 'STUDENT' | 'ELDERLY',
      studentId: userType === 'STUDENT' ? (foundUser as any).studentId || '6400000001' : undefined,
      university: userType === 'STUDENT' ? (foundUser as any).university : undefined,
      address: userType === 'ELDERLY' ? (foundUser as any).address : 'กรุงเทพมหานคร',
      city: userType === 'ELDERLY' ? 'กรุงเทพมหานคร' : 'กรุงเทพมหานคร',
      province: userType === 'ELDERLY' ? 'กรุงเทพมหานคร' : 'กรุงเทพมหานคร',
      postalCode: userType === 'ELDERLY' ? '10110' : '10100',
      avatar: '',
      rating: foundUser.rating || 4.5,
      totalHours: userType === 'STUDENT' ? (foundUser as any).volunteerHours || 0 : 0,
      completedTasks: foundUser.completedTasks || 0,
      createdAt: foundUser.createdAt || '2024-01-01T00:00:00Z',
      updatedAt: foundUser.createdAt || '2024-01-01T00:00:00Z',
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
