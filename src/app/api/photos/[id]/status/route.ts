import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

// PUT - Update photo status
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status, notes, approvedBy } = body;

    // Validation
    if (!status) {
      return NextResponse.json(
        { error: 'กรุณาระบุสถานะรูปถ่าย' },
        { status: 400 }
      );
    }

    const validStatuses = ['PENDING', 'APPROVED', 'REJECTED'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'สถานะรูปถ่ายไม่ถูกต้อง' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    
    let query = '';
    let params: any[] = [];
    
    if (status === 'APPROVED') {
      // Approve photo
      query = `
        UPDATE photos 
        SET status = ?, approvedAt = CURRENT_TIMESTAMP, approvedBy = ?, notes = ?
        WHERE id = ?
      `;
      params = [status, approvedBy, notes || '', id];
    } else if (status === 'REJECTED') {
      // Reject photo
      query = `
        UPDATE photos 
        SET status = ?, notes = ?
        WHERE id = ?
      `;
      params = [status, notes || '', id];
    } else {
      // Reset to pending
      query = `
        UPDATE photos 
        SET status = ?, approvedAt = NULL, approvedBy = NULL, notes = ?
        WHERE id = ?
      `;
      params = [status, notes || '', id];
    }
    
    const result = await db.run(query, params);
    
    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'ไม่พบรูปถ่ายที่ต้องการอัปเดต' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'อัปเดตสถานะรูปถ่ายสำเร็จ',
      photoId: id
    });

  } catch (error) {
    console.error('Update photo status error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการอัปเดตสถานะรูปถ่าย' },
      { status: 500 }
    );
  }
}

// GET - Get photo details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const db = await getDatabase();
    
    // Get photo with uploader and approver information
    const photo = await db.get(`
      SELECT 
        p.*,
        u.firstName, u.lastName, u.phone as uploaderPhone,
        a.firstName as approverFirstName, a.lastName as approverLastName
      FROM photos p
      JOIN users u ON p.uploadedBy = u.id
      LEFT JOIN users a ON p.approvedBy = a.id
      WHERE p.id = ?
    `, [id]);
    
    if (!photo) {
      return NextResponse.json(
        { error: 'ไม่พบรูปถ่ายที่ต้องการ' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      photo
    });
    
  } catch (error) {
    console.error('Get photo error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลรูปถ่าย' },
      { status: 500 }
    );
  }
}
