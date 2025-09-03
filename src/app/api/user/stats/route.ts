import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getDatabase } from '@/lib/database';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'ไม่พบ token การยืนยันตัวตน' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ error: 'Token ไม่ถูกต้อง' }, { status: 401 });
    }

    const userId = decoded.userId;
    const db = await getDatabase();

    // Load user
    const user = await db.get('SELECT * FROM users WHERE id = ?', [userId]);
    if (!user) {
      return NextResponse.json({ error: 'ไม่พบข้อมูลผู้ใช้' }, { status: 404 });
    }

    let stats: any = {};

    if (user.userType === 'STUDENT') {
      const joined = await db.all(
        'SELECT * FROM tasks WHERE volunteerId = ? ORDER BY createdAt DESC',
        [userId]
      );
      const totalJoinedTasks = joined.length;
      const completedTasks = joined.filter((t: any) => t.status === 'COMPLETED').length;
      const inProgressTasks = joined.filter((t: any) => t.status === 'IN_PROGRESS' || t.status === 'ACCEPTED').length;
      const pendingTasks = joined.filter((t: any) => t.status === 'PENDING').length;

      // Unread notifications
      const unreadNotifs = await db.all('SELECT * FROM notifications WHERE userId = ? AND isRead = ?', [userId, 0]);

      stats = {
        totalJoinedTasks,
        completedTasks,
        inProgressTasks,
        pendingTasks,
        photoStats: { total: 0, pending: 0, approved: 0, rejected: 0, inProgress: 0 },
        recentActivities: [],
        unreadNotifications: (unreadNotifs || []).length
      };
    } else {
      // ELDERLY
      const created = await db.all(
        'SELECT * FROM tasks WHERE creatorId = ? ORDER BY createdAt DESC',
        [userId]
      );
      const totalCreatedTasks = created.length;
      const completedTasks = created.filter((t: any) => t.status === 'COMPLETED').length;
      const activeTasks = created.filter((t: any) => t.status !== 'COMPLETED' && t.status !== 'CANCELLED').length;

      const unreadNotifs = await db.all('SELECT * FROM notifications WHERE userId = ? AND isRead = ?', [userId, 0]);

      stats = {
        totalCreatedTasks,
        completedTasks,
        activeTasks,
        totalVolunteers: 0,
        photoStats: { total: 0, pending: 0, approved: 0, rejected: 0, inProgress: 0 },
        recentActivities: [],
        unreadNotifications: (unreadNotifs || []).length
      };
    }

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          userType: user.userType,
          createdAt: user.createdAt
        },
        stats,
        unreadNotifications: stats.unreadNotifications || 0
      }
    });

  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลสถิติ' },
      { status: 500 }
    );
  }
}
