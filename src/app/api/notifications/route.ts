import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Simple notifications - return demo data for now
    const notifications = [
      {
        id: '1',
        title: 'Welcome to GenMatch!',
        message: 'Thank you for joining our platform.',
        type: 'SYSTEM',
        isRead: false,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Task Completed',
        message: 'Your task has been completed successfully.',
        type: 'TASK_UPDATE',
        isRead: false,
        createdAt: new Date().toISOString()
      }
    ];

    return NextResponse.json(notifications);
  } catch (error) {
    console.error('Get notifications error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
