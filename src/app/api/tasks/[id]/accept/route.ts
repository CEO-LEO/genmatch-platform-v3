import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { volunteerId, userId } = body;
    const actualUserId = userId || volunteerId; // Support both field names

    if (!actualUserId) {
      return NextResponse.json(
        { error: 'กรุณาระบุ ID ของจิตอาสา' },
        { status: 400 }
      );
    }

    const db = await getDatabase();

      // Check if task exists and is available
      const task = await db.get('SELECT * FROM tasks WHERE id = ? AND status = "PENDING"', [id]);
      if (!task) {
        return NextResponse.json(
          { error: 'ไม่พบงานหรืองานไม่พร้อมรับจิตอาสา' },
          { status: 404 }
        );
      }

      // Update task status to ACCEPTED
      await db.run('UPDATE tasks SET status = "ACCEPTED" WHERE id = ?', [id]);

      return NextResponse.json({
        success: true,
        message: 'รับงานจิตอาสาสำเร็จ'
      });

  } catch (error) {
    console.error('Accept task error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการรับงาน' },
      { status: 500 }
    );
  }
}
