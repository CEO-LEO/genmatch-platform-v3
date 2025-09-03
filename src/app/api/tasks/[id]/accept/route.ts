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

      // Check current status to prevent accepting completed/cancelled
      const existing = await db.get('SELECT id, status FROM tasks WHERE id = ?', [id]);
      if (!existing) {
        return NextResponse.json(
          { error: 'ไม่พบนข้อมูลงาน' },
          { status: 404 }
        );
      }
      if (['COMPLETED','CANCELLED','IN_PROGRESS','ACCEPTED'].includes(existing.status)) {
        return NextResponse.json(
          { error: 'ไม่สามารถรับงานในสถานะปัจจุบันได้' },
          { status: 400 }
        );
      }

      // Update task status to ACCEPTED and set volunteerId if schema supports it
      const result = await db.run(`
        UPDATE tasks 
        SET status = ?, progress = ?, notes = ?, volunteerId = COALESCE(volunteerId, ?), updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?
      `, ['ACCEPTED', 0, 'accepted', actualUserId, id]);

      if (result && result.changes === 0) {
        return NextResponse.json(
          { error: 'ไม่พบงานที่ต้องการอัปเดต' },
          { status: 404 }
        );
      }

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
