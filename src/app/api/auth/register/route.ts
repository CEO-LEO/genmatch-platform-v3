import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, userType } = await request.json();

    if (!email || !password || !firstName || !lastName || !userType) {
      return NextResponse.json(
        { message: 'All fields are required' },
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

    // Simple demo registration - create demo user
    const user = {
      id: 'demo-user-' + Date.now(),
      email,
      firstName,
      lastName,
      userType,
      phone: '',
      address: '',
      city: '',
      province: '',
      postalCode: ''
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
