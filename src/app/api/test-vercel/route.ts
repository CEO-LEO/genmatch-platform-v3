import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Test environment variables
    const jwtSecret = process.env.JWT_SECRET;
    const nodeEnv = process.env.NODE_ENV;
    const vercel = process.env.VERCEL;
    
    // Test global variables
    let mockUsersSize = 0;
    let mockNextId = 0;
    
    try {
      // @ts-ignore
      if (global.mockUsers) {
        // @ts-ignore
        mockUsersSize = global.mockUsers.size;
        // @ts-ignore
        mockNextId = global.mockNextId;
      }
    } catch (error) {
      console.log('Global variables not accessible');
    }

    return NextResponse.json({
      message: 'Vercel Test API Working',
      status: 'success',
      environment: {
        nodeEnv,
        vercel,
        hasJwtSecret: !!jwtSecret,
        jwtSecretLength: jwtSecret ? jwtSecret.length : 0
      },
      globalVariables: {
        mockUsersSize,
        mockNextId,
        accessible: mockUsersSize > 0
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Test API failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
