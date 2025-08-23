import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { testType } = body;
    
    const db = await getDatabase();
    
    if (testType === 'checkAuth') {
      // Check if we can access users table for authentication
      const userCount = await db.get('SELECT COUNT(*) as count FROM users');
      
      // Try to get a sample user (if any exist)
      let sampleUser = null;
      if (userCount.count > 0) {
        sampleUser = await db.get(`
          SELECT id, firstName, lastName, phone, userType 
          FROM users LIMIT 1
        `);
      }
      
      return NextResponse.json({
        success: true,
        userCount: userCount.count,
        sampleUser,
        message: 'Authentication system is accessible'
      });
    }
    
    return NextResponse.json({
      success: false,
      error: 'Invalid test type'
    });
    
  } catch (error) {
    console.error('Test login error:', error);
    return NextResponse.json({
      success: false,
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
