import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const tasks = await prisma.task.findMany({
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
    console.error('Get tasks error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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

    const { title, description, location, budget } = await request.json();

    if (!title || !description) {
      return NextResponse.json(
        { message: 'Title and description are required' },
        { status: 400 }
      );
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        location: location || null,
        budget: budget ? parseFloat(budget) : null,
        creatorId: decoded.userId
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            userType: true
          }
        }
      }
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Create task error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
