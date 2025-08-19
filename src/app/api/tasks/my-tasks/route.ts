import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'No token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;

    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { creatorId: decoded.userId },
          { accepterId: decoded.userId }
        ]
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            userType: true
          }
        },
        accepter: {
          select: {
            id: true,
            name: true,
            userType: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Get my tasks error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
