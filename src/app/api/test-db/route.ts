import { NextResponse } from 'next/server';
import { getDatabase, checkDatabaseHealth, getDatabaseStats } from '@/lib/database';

export async function GET() {
  try {
    const db = await getDatabase();
    
    // Test basic connection
    const basicTest = await db.get('SELECT 1 as test');
    
    // Test database health
    const healthTest = await checkDatabaseHealth();
    
    // Get database stats
    const stats = await getDatabaseStats();
    
    return NextResponse.json({
      success: true,
      tests: {
        basicConnection: {
          status: 'PASS',
          result: basicTest
        },
        healthCheck: {
          status: 'PASS',
          result: healthTest
        },
        stats: {
          status: 'PASS',
          result: stats
        }
      },
      summary: 'Database connection successful'
    });
    
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({
      success: false,
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
