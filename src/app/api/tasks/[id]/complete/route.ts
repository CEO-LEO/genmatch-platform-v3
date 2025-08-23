import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { volunteerId, completionNotes } = body;

    if (!volunteerId) {
      return NextResponse.json(
        { error: 'กรุณาระบุ ID ของจิตอาสา' },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    // Check if task exists and is accepted
    const task = await db.get('SELECT * FROM tasks WHERE id = ? AND status = "ACCEPTED"', [id]);
    if (!task) {
      return NextResponse.json(
        { error: 'ไม่พบงานหรืองานไม่พร้อมเสร็จสิ้น' },
        { status: 404 }
      );
    }

    // Update task status to COMPLETED
    await db.run('UPDATE tasks SET status = "COMPLETED" WHERE id = ?', [id]);

    return NextResponse.json({
      success: true,
      message: 'งานจิตอาสาเสร็จสิ้นแล้ว'
    });

  } catch (error) {
    console.error('Complete task error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการเสร็จสิ้นงาน' },
      { status: 500 }
    );
  }
}
