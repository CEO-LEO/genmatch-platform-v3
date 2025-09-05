import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

// PUT - Update task status
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status, progress, notes } = body;

    // Validation
    if (!status) {
      return NextResponse.json(
        { error: 'กรุณาระบุสถานะงาน' },
        { status: 400 }
      );
    }

    const validStatuses = ['PENDING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'สถานะงานไม่ถูกต้อง' },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    // Enforce photo proof:
    // - progress > 0 requires at least 1 photo (any status)
    // - progress >= 100 (COMPLETED) requires at least 1 APPROVED photo
    if (typeof progress === 'number' && progress > 0) {
      const photos: any[] = await db.all('SELECT status FROM photos WHERE taskId = ?', [id]);
      const hasAny = Array.isArray(photos) && photos.length > 0;
      const hasApproved = photos?.some((p: any) => p.status === 'APPROVED');
      if (!hasAny) {
        return NextResponse.json(
          { error: 'โปรดอัปโหลดรูปเพื่อยืนยันความคืบหน้าก่อน' },
          { status: 400 }
        );
      }
      if (progress >= 100 && !hasApproved) {
        return NextResponse.json(
          { error: 'ต้องมีรูปที่ได้รับการอนุมัติอย่างน้อย 1 รูปเพื่อปิดงาน' },
          { status: 400 }
        );
      }
    }
    
    // If progress reaches 100, force status to COMPLETED
    const computedStatus = (typeof progress === 'number' && progress >= 100) ? 'COMPLETED' : status;
    const computedProgress = typeof progress === 'number' ? Math.min(progress, 100) : 0;
    
    // Update task status
    const result = await db.run(`
      UPDATE tasks 
      SET status = ?, progress = ?, notes = ?, updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [computedStatus, computedProgress, notes || '', id]);
    
    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'ไม่พบงานที่ต้องการอัปเดต' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'อัปเดตสถานะงานสำเร็จ',
      taskId: id,
      status: computedStatus,
      progress: computedProgress
    });

  } catch (error) {
    console.error('Update task status error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการอัปเดตสถานะงาน' },
      { status: 500 }
    );
  }
}

// GET - Get task details with status
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const db = await getDatabase();
    
    // Get task with creator and volunteer information
    const task = await db.get(`
      SELECT 
        t.*,
        u.firstName, u.lastName, u.phone as creatorPhone,
        v.firstName as volunteerFirstName, v.lastName as volunteerLastName, v.phone as volunteerPhone
      FROM tasks t
      JOIN users u ON t.creatorId = u.id
      LEFT JOIN users v ON t.volunteerId = v.id
      WHERE t.id = ?
    `, [id]);
    
    if (!task) {
      return NextResponse.json(
        { error: 'ไม่พบงานที่ต้องการ' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      task
    });
    
  } catch (error) {
    console.error('Get task error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลงาน' },
      { status: 500 }
    );
  }
}
