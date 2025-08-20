import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Simple demo login - accept any email/password for now
    const token = 'demo-token-123';
    const user = {
      id: 'demo-user-123',
      email: email,
      userType: 'STUDENT',
      firstName: 'Demo',
      lastName: 'User'
    };

    return NextResponse.json({
      token,
      user
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
