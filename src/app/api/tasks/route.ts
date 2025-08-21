import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Simple tasks - return demo data for now
    const tasks = [
      {
        id: '1',
        title: 'ช่วยซื้อของที่ซุปเปอร์มาร์เก็ต',
        description: 'ต้องการคนช่วยซื้อของที่ซุปเปอร์มาร์เก็ต เซ็นทรัลเวิลด์ ช่วยเลือกผักผลไม้และของใช้ในบ้าน',
        category: 'EXERCISE',
        status: 'PENDING',
        budget: 300,
        volunteerHours: 2,
        estimatedHours: 2,
        address: 'เซ็นทรัลเวิลด์',
        city: 'กรุงเทพฯ',
        province: 'กรุงเทพฯ',
        postalCode: '10330',
        scheduledDate: new Date().toISOString(),
        scheduledTime: '09:00',
        createdAt: new Date().toISOString(),
        creator: {
          id: 'user-1',
          firstName: 'สมศรี',
          lastName: 'ใจดี',
          userType: 'ELDERLY'
        },
        accepter: null
      },
      {
        id: '2',
        title: 'ช่วยติดตั้งคอมพิวเตอร์',
        description: 'ซื้อคอมพิวเตอร์ใหม่มา ต้องการคนช่วยติดตั้งและลงโปรแกรมพื้นฐาน เช่น Office, Chrome',
        category: 'REPAIR',
        status: 'PENDING',
        budget: 400,
        volunteerHours: 3,
        estimatedHours: 3,
        address: 'บ้านผู้ใช้',
        city: 'กรุงเทพฯ',
        province: 'กรุงเทพฯ',
        postalCode: '10400',
        scheduledDate: new Date().toISOString(),
        scheduledTime: '13:00',
        createdAt: new Date().toISOString(),
        creator: {
          id: 'user-2',
          firstName: 'สมชาย',
          lastName: 'รักดี',
          userType: 'ELDERLY'
        },
        accepter: null
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
