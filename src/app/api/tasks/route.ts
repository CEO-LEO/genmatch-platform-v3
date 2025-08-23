import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

// GET - Get all tasks
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const location = searchParams.get('location');
    const search = searchParams.get('search');
    
    const db = await getDatabase();
    
    let query = `
      SELECT t.*, u.firstName, u.lastName, u.phone as creatorPhone
      FROM tasks t
      JOIN users u ON t.creatorId = u.id
      WHERE 1=1
    `;
    const params: any[] = [];
    
    if (category) {
      query += ' AND t.category = ?';
      params.push(category);
    }
    
    if (location) {
      query += ' AND t.location LIKE ?';
      params.push(`%${location}%`);
    }
    
    if (search) {
      query += ' AND (t.title LIKE ? OR t.description LIKE ? OR t.tags LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }
    
    query += ' ORDER BY t.createdAt DESC';
    
    const tasks = await db.all(query, params);
    
    return NextResponse.json({
      success: true,
      tasks,
      count: tasks.length
    });
    
  } catch (error) {
    console.error('Get tasks error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลงาน' },
      { status: 500 }
    );
  }
}

// POST - Create new task
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      category,
      location,
      date,
      startTime,
      endTime,
      maxVolunteers,
      requirements,
      tags,
      contactName,
      contactPhone,
      contactEmail,
      creatorId
    } = body;

    // Validation
    if (!title || !description || !category || !location || !date || 
        !startTime || !endTime || !maxVolunteers || !contactName || 
        !contactPhone || !creatorId) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    
    // Insert task into database
    const result = await db.run(`
      INSERT INTO tasks (
        title, description, category, location, date, startTime, endTime,
        maxVolunteers, requirements, tags, contactName, contactPhone,
        contactEmail, creatorId
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      title, description, category, location, date, startTime, endTime,
      maxVolunteers, requirements || '', tags || '', contactName,
      contactPhone, contactEmail || '', creatorId
    ]);

    return NextResponse.json({
      success: true,
      message: 'สร้างงานจิตอาสาสำเร็จ',
      taskId: result.lastID
    });

  } catch (error) {
    console.error('Create task error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการสร้างงาน' },
      { status: 500 }
    );
  }
}
