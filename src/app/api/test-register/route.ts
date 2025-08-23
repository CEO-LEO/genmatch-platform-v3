import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { testType } = body;
    
    const db = await getDatabase();
    
    if (testType === 'checkTable') {
      // Check if users table exists and has data
      const tableCheck = await db.get(`
        SELECT name FROM sqlite_master 
        WHERE type='table' AND name='users'
      `);
      
      if (!tableCheck) {
        return NextResponse.json({
          success: false,
          error: 'Users table does not exist'
        });
      }
      
      // Get user count
      const userCount = await db.get('SELECT COUNT(*) as count FROM users');
      
      return NextResponse.json({
        success: true,
        tableExists: true,
        userCount: userCount.count,
        message: 'Users table is accessible'
      });
    }
    
    return NextResponse.json({
      success: false,
      error: 'Invalid test type'
    });
    
  } catch (error) {
    console.error('Test register error:', error);
    return NextResponse.json({
      success: false,
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
