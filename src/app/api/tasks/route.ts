import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Simple tasks - return demo data for now
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
      },
      {
        id: '2',
        title: 'Computer setup assistance',
        description: 'Help setting up new computer and installing software',
        category: 'REPAIR',
        status: 'ACCEPTED',
        budget: 0,
        volunteerHours: 3,
        estimatedHours: 3,
        address: '456 Oak Ave',
        city: 'Bangkok',
        province: 'Bangkok',
        postalCode: '10400',
        scheduledDate: new Date().toISOString(),
        scheduledTime: '14:00',
        createdAt: new Date().toISOString(),
        creator: {
          id: 'user-2',
          firstName: 'Jane',
          lastName: 'Smith',
          userType: 'ELDERLY'
        },
        accepter: {
          id: 'user-3',
          firstName: 'Mike',
          lastName: 'Johnson',
          userType: 'STUDENT'
        }
      }
    ];

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, category, address, city, province, postalCode, budget, scheduledDate, scheduledTime, estimatedHours } = await request.json();

    if (!title || !description || !category) {
      return NextResponse.json(
        { message: 'Title, description, and category are required' },
        { status: 400 }
      );
    }

    // Simple task creation - return demo task
    const task = {
      id: 'task-' + Date.now(),
      title,
      description,
      category,
      address: address || '',
      city: city || '',
      province: province || '',
      postalCode: postalCode || '',
      scheduledDate: scheduledDate ? new Date(scheduledDate) : new Date(),
      scheduledTime: scheduledTime || '09:00',
      estimatedHours: estimatedHours ? parseInt(estimatedHours) : 2,
      budget: budget ? parseFloat(budget) : null,
      volunteerHours: estimatedHours ? parseInt(estimatedHours) : 2,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      creator: {
        id: 'demo-user',
        firstName: 'Demo',
        lastName: 'User',
        userType: 'STUDENT'
      }
    };

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Create task error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
