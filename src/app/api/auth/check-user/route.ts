import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Simple user check - return demo user for now
    return NextResponse.json({
      id: 'demo-user-123',
      email: 'demo@example.com',
      userType: 'STUDENT',
      firstName: 'Demo',
      lastName: 'User'
    });

  } catch (error) {
    console.error('Check user error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
