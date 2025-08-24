import { NextResponse } from 'next/server';
import { getDatabase, checkDatabaseHealth, getDatabaseStats } from '@/lib/database';

export async function GET() {
  try {
    // Test database health first
    const healthTest = await checkDatabaseHealth();
    
    if (healthTest.status === 'unhealthy') {
      return NextResponse.json({
        success: false,
        error: 'Database health check failed',
        details: healthTest.error,
        suggestion: 'Please check Supabase configuration and environment variables'
      }, { status: 500 });
    }
    
    const db = await getDatabase();
    
    // Test basic connection
    const basicTest = await db.get('SELECT 1 as test');
    
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
          status: healthTest.status === 'demo' ? 'DEMO' : 'PASS',
          result: healthTest
        },
        stats: {
          status: 'PASS',
          result: stats
        }
      },
      summary: healthTest.status === 'demo' ? 'Running in demo mode' : 'Database connection successful',
      mode: healthTest.status
    });
    
  } catch (error) {
    console.error('❌ Database test error:', error);
    
    let errorMessage = 'Database connection failed';
    let suggestion = 'Please check your configuration';
    
    if (error instanceof Error) {
      if (error.message.includes('Supabase not configured')) {
        errorMessage = 'Supabase not configured';
        suggestion = 'Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables';
      } else if (error.message.includes('Database tables not created')) {
        errorMessage = 'Database tables not created';
        suggestion = 'Please run the SQL setup script in Supabase';
      } else if (error.message.includes('Supabase connection failed')) {
        errorMessage = 'Supabase connection failed';
        suggestion = 'Please check your Supabase credentials and network connection';
      }
    }
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      details: error instanceof Error ? error.message : 'Unknown error',
      suggestion: suggestion
    }, { status: 500 });
  }
}
