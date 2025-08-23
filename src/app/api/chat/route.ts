import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('taskId');
    const userId = searchParams.get('userId');

    if (!taskId || !userId) {
      return NextResponse.json(
        { error: 'กรุณาระบุ taskId และ userId' },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    // Get chat messages for the task
    const messages = await db.all(`
      SELECT m.*, u.firstName, u.lastName, u.userType
      FROM chat_messages m
      JOIN users u ON m.senderId = u.id
      WHERE m.taskId = ?
      ORDER BY m.createdAt ASC
    `, [taskId]);

    return NextResponse.json({
      success: true,
      messages
    });

  } catch (error) {
    console.error('Get chat error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อความ' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { taskId, senderId, message } = body;

    if (!taskId || !senderId || !message) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    // Insert message into database
    const result = await db.run(`
      INSERT INTO chat_messages (taskId, senderId, message)
      VALUES (?, ?, ?)
    `, [taskId, senderId, message]);

    return NextResponse.json({
      success: true,
      message: 'ส่งข้อความสำเร็จ',
      messageId: result.lastID
    });

  } catch (error) {
    console.error('Send message error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการส่งข้อความ' },
      { status: 500 }
    );
  }
}
