import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    let userId = searchParams.get('userId');
    let userType = searchParams.get('userType');

    const db = await getDatabase();

    // Support Authorization header (JWT) so clients don't have to pass params
    if (!userId || !userType) {
      const authHeader = request.headers.get('authorization') || '';
      const token = authHeader.startsWith('Bearer ')
        ? authHeader.substring(7)
        : '';
      if (token) {
        try {
          // Lazy import to avoid top-level dependency here
          const { default: jwt }: any = await import('jsonwebtoken');
          const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
          userId = userId || String(decoded.userId);
        } catch {}
      }
      if (userId && !userType) {
        const u = await db.get('SELECT userType FROM users WHERE id = ?', [userId]);
        userType = u?.userType || userType;
      }
    }

    if (!userId || !userType) {
      return NextResponse.json({ error: 'missing userId or userType' }, { status: 400 });
    }

    // Normalize userType to avoid casing mismatch
    const normalizedType = String(userType).toUpperCase();

    let rows: any[] = [];
    if (normalizedType === 'ELDERLY') {
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

    const ongoing = rows.filter(r => r.status === 'IN_PROGRESS' || r.status === 'ACCEPTED');
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
