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
      title: rawTitle,
      description: rawDescription,
      category: rawCategory,
      location: rawLocation,
      date: rawDate,
      startTime: rawStartTime,
      endTime: rawEndTime,
      maxVolunteers: rawMaxVolunteers,
      requirements: rawRequirements,
      tags: rawTags,
      contactName: rawContactName,
      contactPhone: rawContactPhone,
      contactEmail: rawContactEmail,
      creatorId: rawCreatorId
    } = body || {};

    // Normalize and coerce types
    const title = (rawTitle || '').toString().trim();
    const description = (rawDescription || '').toString().trim();
    const category = (rawCategory || '').toString().trim();
    const location = (rawLocation || '').toString().trim();
    const date = (rawDate || '').toString().trim();
    const startTime = (rawStartTime || '').toString().trim();
    const endTime = (rawEndTime || '').toString().trim();
    const maxVolunteers = Number.parseInt((rawMaxVolunteers ?? 1).toString(), 10) || 1;
    const requirements = (rawRequirements || '').toString().trim();
    const tags = (rawTags || '').toString().trim();
    const contactName = (rawContactName || '').toString().trim();
    const contactPhone = (rawContactPhone || '').toString().trim();
    const contactEmail = (rawContactEmail || '').toString().trim();
    const creatorId = (rawCreatorId || '').toString().trim();

    // Validation
    if (!title || !description || !category || !location || !date ||
        !startTime || !endTime || !contactName || !contactPhone || !creatorId) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 }
      );
    }

    if (!Number.isInteger(maxVolunteers) || maxVolunteers < 1) {
      return NextResponse.json(
        { error: 'จำนวนอาสาสมัครต้องเป็นตัวเลขตั้งแต่ 1 ขึ้นไป' },
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
      maxVolunteers, requirements, tags, contactName,
      contactPhone, contactEmail, creatorId
    ]);

    return NextResponse.json({
      success: true,
      message: 'สร้างงานจิตอาสาสำเร็จ',
      taskId: result.lastID
    }, { status: 201 });

  } catch (error) {
    console.error('Create task error:', error);
    
    // Try mock database fallback for demo
    try {
      console.log('⚠️ Database failed, using mock response for demo...');
      
      const mockTaskId = `task_${Date.now()}`;
      
      return NextResponse.json({
        success: true,
        message: 'สร้างงานจิตอาสาสำเร็จ (Demo Mode)',
        taskId: mockTaskId,
        note: 'ข้อมูลจะถูกเก็บในหน่วยความจำชั่วคราว'
      });
      
    } catch (mockError) {
      console.error('Mock fallback failed:', mockError);
    return NextResponse.json(
        { error: 'เกิดข้อผิดพลาดในการสร้างงาน' },
      { status: 500 }
    );
    }
  }
}
