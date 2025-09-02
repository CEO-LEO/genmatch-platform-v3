import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

// POST - Create new rating
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { taskId, raterId, ratedUserId, rating, review, category } = body;

    // Validation
    if (!taskId || !raterId || !ratedUserId || !rating || !category) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'คะแนนต้องอยู่ระหว่าง 1-5' },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    // Prevent self-rating
    if (String(raterId) === String(ratedUserId)) {
      return NextResponse.json(
        { error: 'ไม่สามารถให้คะแนนตัวเองได้' },
        { status: 400 }
      );
    }

    // Verify task exists and at least one side is the task creator
    const task = await db.get(`SELECT id, creatorId FROM tasks WHERE id = ?`, [taskId]);
    if (!task) {
      return NextResponse.json(
        { error: 'ไม่พบนข้อมูลงานที่ต้องการให้คะแนน' },
        { status: 404 }
      );
    }
    if (String(task.creatorId) !== String(raterId) && String(task.creatorId) !== String(ratedUserId)) {
      return NextResponse.json(
        { error: 'การให้คะแนนต้องเกิดขึ้นระหว่างผู้สร้างงานกับผู้เข้าร่วมงานเท่านั้น' },
        { status: 400 }
      );
    }
    
    // Check if user already rated this task
    const existingRating = await db.get(`
      SELECT id FROM ratings 
      WHERE taskId = ? AND raterId = ? AND ratedUserId = ?
    `, [taskId, raterId, ratedUserId]);
    
    if (existingRating) {
      return NextResponse.json(
        { error: 'คุณได้ให้คะแนนงานนี้แล้ว' },
        { status: 400 }
      );
    }
    
    // Insert new rating
    const result = await db.run(`
      INSERT INTO ratings (taskId, raterId, ratedUserId, rating, review, category, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `, [taskId, raterId, ratedUserId, rating, review || '', category]);
    
    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'เกิดข้อผิดพลาดในการบันทึกคะแนน' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'ให้คะแนนสำเร็จ',
      ratingId: result.lastID
    });

  } catch (error) {
    console.error('Create rating error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการให้คะแนน' },
      { status: 500 }
    );
  }
}

// GET - Get ratings by user or task
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const taskId = searchParams.get('taskId');
    const category = searchParams.get('category');

    if (!userId && !taskId) {
      return NextResponse.json(
        { error: 'กรุณาระบุ userId หรือ taskId' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    
    let query = `
      SELECT 
        r.*,
        u1.firstName as raterFirstName, u1.lastName as raterLastName,
        u2.firstName as ratedFirstName, u2.lastName as ratedLastName,
        t.title as taskTitle
      FROM ratings r
      JOIN users u1 ON r.raterId = u1.id
      JOIN users u2 ON r.ratedUserId = u2.id
      JOIN tasks t ON r.taskId = t.id
    `;
    
    const params: any[] = [];
    
    if (userId) {
      query += ' WHERE r.ratedUserId = ?';
      params.push(userId);
    } else if (taskId) {
      query += ' WHERE r.taskId = ?';
      params.push(taskId);
    }
    
    if (category) {
      query += userId ? ' AND r.category = ?' : ' WHERE r.category = ?';
      params.push(category);
    }
    
    query += ' ORDER BY r.createdAt DESC';
    
    const ratings = await db.all(query, params);
    
    return NextResponse.json({
      success: true,
      ratings
    });
    
  } catch (error) {
    console.error('Get ratings error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลคะแนน' },
      { status: 500 }
    );
  }
}
