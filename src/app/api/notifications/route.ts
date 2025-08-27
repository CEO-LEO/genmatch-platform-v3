import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

// POST - Create new notification
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, type, title, message, data, priority } = body;

    // Validation
    if (!userId || !type || !title || !message) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    
    // Insert new notification
    const result = await db.run(`
      INSERT INTO notifications (userId, type, title, message, data, priority, isRead, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, 0, CURRENT_TIMESTAMP)
    `, [userId, type, title, message, JSON.stringify(data || {}), priority || 'NORMAL']);
    
    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'เกิดข้อผิดพลาดในการสร้างการแจ้งเตือน' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'สร้างการแจ้งเตือนสำเร็จ',
      notificationId: result.lastID
    });

  } catch (error) {
    console.error('Create notification error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการสร้างการแจ้งเตือน' },
      { status: 500 }
    );
  }
}

// GET - Get notifications by user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const type = searchParams.get('type');
    const isRead = searchParams.get('isRead');
    const limit = searchParams.get('limit') || '50';

    if (!userId) {
      return NextResponse.json(
        { error: 'กรุณาระบุ userId' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    
    let query = `
      SELECT * FROM notifications 
      WHERE userId = ?
    `;
    
    const params: any[] = [userId];
    
    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }
    
    if (isRead !== null) {
      query += ' AND isRead = ?';
      params.push(isRead === 'true' ? 1 : 0);
    }
    
    query += ' ORDER BY createdAt DESC LIMIT ?';
    params.push(parseInt(limit));
    
    const notifications = await db.all(query, params);
    
    return NextResponse.json({
      success: true,
      notifications
    });
    
  } catch (error) {
    console.error('Get notifications error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลการแจ้งเตือน' },
      { status: 500 }
    );
  }
}

// PUT - Mark notification as read
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { notificationId, isRead } = body;

    if (!notificationId || isRead === undefined) {
      return NextResponse.json(
        { error: 'กรุณาระบุ notificationId และ isRead' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    
    const result = await db.run(`
      UPDATE notifications 
      SET isRead = ?, readAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [isRead ? 1 : 0, notificationId]);
    
    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'ไม่พบการแจ้งเตือนที่ต้องการอัปเดต' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'อัปเดตสถานะการแจ้งเตือนสำเร็จ'
    });

  } catch (error) {
    console.error('Update notification error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการอัปเดตการแจ้งเตือน' },
      { status: 500 }
    );
  }
}
