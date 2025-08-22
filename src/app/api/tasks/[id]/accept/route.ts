import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const taskId = params.id;
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 }
      );
    }

    // Simulate accepting a task
    const acceptedTask = {
      id: taskId,
      status: 'ACCEPTED',
      acceptedAt: new Date().toISOString(),
      acceptedBy: {
        id: userId,
        firstName: 'นักศึกษา',
        lastName: 'จิตอาสา',
        userType: 'STUDENT'
      }
    };

    return NextResponse.json({
      message: 'รับงานสำเร็จแล้ว',
      task: acceptedTask
    });
  } catch (error) {
    console.error('Accept task error:', error);
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดในระบบ' },
      { status: 500 }
    );
  }
}
