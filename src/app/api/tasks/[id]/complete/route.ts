import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const taskId = params.id;
    const { userId, actualHours, notes, feedback, rating, images } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 }
      );
    }

    // Simulate completing a task
    const completedTask = {
      id: taskId,
      status: 'COMPLETED',
      completedAt: new Date().toISOString(),
      actualHours: actualHours || 0,
      notes: notes || '',
      feedback: feedback || '',
      rating: rating || 5,
      images: images || [],
      volunteerHoursAwarded: actualHours || 0
    };

    return NextResponse.json({
      message: 'ส่งงานสำเร็จแล้ว',
      task: completedTask,
      volunteerHours: actualHours || 0
    });
  } catch (error) {
    console.error('Complete task error:', error);
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดในระบบ' },
      { status: 500 }
    );
  }
}
