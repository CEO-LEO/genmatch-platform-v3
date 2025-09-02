import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const userType = searchParams.get('userType');

    if (!userId || !userType) {
      return NextResponse.json({ error: 'missing userId or userType' }, { status: 400 });
    }

    const db = await getDatabase();

    let rows: any[] = [];
    if (userType === 'ELDERLY') {
      rows = await db.all(`
        SELECT t.*, u.firstName, u.lastName, u.phone as creatorPhone
        FROM tasks t
        JOIN users u ON t.creatorId = u.id
        WHERE t.creatorId = ?
        ORDER BY t.createdAt DESC
      `, [userId]);
    } else {
      rows = await db.all(`
        SELECT t.*, u.firstName, u.lastName, u.phone as creatorPhone
        FROM tasks t
        JOIN users u ON t.creatorId = u.id
        WHERE t.volunteerId = ?
        ORDER BY t.createdAt DESC
      `, [userId]);
    }

    const ongoing = rows.filter(r => r.status !== 'COMPLETED');
    const completed = rows.filter(r => r.status === 'COMPLETED');
    const created = userType === 'ELDERLY' ? rows : [];

    return NextResponse.json({ created, ongoing, completed });
  } catch (error) {
    console.error('Get my tasks error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
