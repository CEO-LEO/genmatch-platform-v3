import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

// POST - Upload new photo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { taskId, photoUrl, description, uploadedBy } = body;

    // Validation
    if (!taskId || !photoUrl || !description || !uploadedBy) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    
    // Insert new photo
    const result = await db.run(`
      INSERT INTO photos (taskId, photoUrl, description, uploadedBy, status, uploadedAt)
      VALUES (?, ?, ?, ?, 'PENDING', CURRENT_TIMESTAMP)
    `, [taskId, photoUrl, description, uploadedBy]);
    
    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'เกิดข้อผิดพลาดในการบันทึกรูปถ่าย' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'อัปโหลดรูปถ่ายสำเร็จ',
      photoId: result.lastID
    });

  } catch (error) {
    console.error('Upload photo error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการอัปโหลดรูปถ่าย' },
      { status: 500 }
    );
  }
}

// GET - Get photos by task
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('taskId');
    const status = searchParams.get('status');

    if (!taskId) {
      return NextResponse.json(
        { error: 'กรุณาระบุ taskId' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    
    let query = `
      SELECT 
        p.*,
        u.firstName, u.lastName, u.phone as uploaderPhone,
        a.firstName as approverFirstName, a.lastName as approverLastName
      FROM photos p
      JOIN users u ON p.uploadedBy = u.id
      LEFT JOIN users a ON p.approvedBy = a.id
      WHERE p.taskId = ?
    `;
    
    const params = [taskId];
    
    if (status && status !== 'all') {
      query += ' AND p.status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY p.uploadedAt DESC';
    
    const photos = await db.all(query, params);
    
    return NextResponse.json({
      success: true,
      photos
    });
    
  } catch (error) {
    console.error('Get photos error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลรูปถ่าย' },
      { status: 500 }
    );
  }
}
