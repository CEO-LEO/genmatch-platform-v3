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

      // Update task status to ACCEPTED (compatible with mock/real DB handler)
      const result = await db.run(`
        UPDATE tasks 
        SET status = ?, progress = ?, notes = ?, updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?
      `, ['ACCEPTED', 0, 'accepted', id]);

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
