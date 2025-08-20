import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Simple auth check - return success for now
    return NextResponse.json({ 
      isAuthenticated: true, 
      user: { id: 'demo', type: 'STUDENT' }
    });

  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ isAuthenticated: false }, { status: 500 });
  }
}
