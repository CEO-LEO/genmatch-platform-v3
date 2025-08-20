import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Simple my tasks - return demo data for now
    const tasks = [
      {
        id: '1',
        title: 'Help with grocery shopping',
        description: 'Need assistance with grocery shopping at local market',
        category: 'EXERCISE',
        status: 'PENDING',
        budget: 0,
        volunteerHours: 2,
        estimatedHours: 2,
        address: '123 Main St',
        city: 'Bangkok',
        province: 'Bangkok',
        postalCode: '10400',
        scheduledDate: new Date().toISOString(),
        scheduledTime: '09:00',
        createdAt: new Date().toISOString(),
        creator: {
          id: 'user-1',
          firstName: 'John',
          lastName: 'Doe',
          userType: 'ELDERLY'
        },
        accepter: null
      }
    ];

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Get my tasks error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
