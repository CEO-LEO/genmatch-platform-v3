import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { testType } = body;
    
    console.log('🧪 Test registration system:', testType);
    
    if (testType === 'checkTable') {
      const db = await getDatabase();
      
      // Check if users table exists and has correct structure
      const tableInfo = await db.all("PRAGMA table_info(users)");
      console.log('📋 Users table structure:', tableInfo);
      
      // Check user count
      const userCount = await db.get('SELECT COUNT(*) as count FROM users');
      console.log('👥 Current user count:', userCount);
      
      // Check if we can insert a test record
      try {
        const testResult = await db.run(`
          INSERT INTO users (
            firstName, lastName, phone, userType, address, password
          ) VALUES (?, ?, ?, ?, ?, ?)
        `, ['Test', 'User', '0999999999', 'elderly', 'Test Address', 'testpassword']);
        
        console.log('✅ Test insert successful, ID:', testResult.lastID);
        
        // Clean up test record
        await db.run('DELETE FROM users WHERE id = ?', [testResult.lastID]);
        console.log('🧹 Test record cleaned up');
        
        return NextResponse.json({
          success: true,
          message: 'Registration system test passed',
          tableStructure: tableInfo,
          userCount: userCount.count,
          testInsert: 'successful'
        });
      } catch (insertError) {
        console.error('❌ Test insert failed:', insertError);
        return NextResponse.json({
          success: false,
          message: 'Registration system test failed',
          error: insertError instanceof Error ? insertError.message : 'Unknown error',
          tableStructure: tableInfo,
          userCount: userCount.count
        }, { status: 500 });
      }
    }
    
    return NextResponse.json({
      success: false,
      message: 'Invalid test type'
    }, { status: 400 });
    
  } catch (error) {
    console.error('❌ Test registration error:', error);
    return NextResponse.json({
      success: false,
      message: 'Test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
