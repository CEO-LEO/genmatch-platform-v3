import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    return NextResponse.json({ 
      isAuthenticated: true, 
      user: decoded 
    });

  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ isAuthenticated: false }, { status: 500 });
  }
}
