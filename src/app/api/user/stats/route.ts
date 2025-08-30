import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { mockDatabase } from '@/lib/database';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'ไม่พบ token การยืนยันตัวตน' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    
    // Verify JWT token
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ error: 'Token ไม่ถูกต้อง' }, { status: 401 });
    }

    const userId = decoded.userId;

    // Get user data from mock database
    const users = mockDatabase.get('users') || [];
    const user = users.find((u: any) => u.id === userId);
    
    if (!user) {
      return NextResponse.json({ error: 'ไม่พบข้อมูลผู้ใช้' }, { status: 404 });
    }

    // Get tasks data
    const tasks = mockDatabase.get('tasks') || [];
    const photos = mockDatabase.get('photos') || [];
    const notifications = mockDatabase.get('notifications') || [];

    let stats = {};

    if (user.userType === 'STUDENT') {
      // Student stats - tasks they joined
      const joinedTasks = tasks.filter((task: any) => 
        task.volunteers && task.volunteers.includes(userId)
      );
      
      const completedTasks = joinedTasks.filter((task: any) => task.status === 'completed');
      const inProgressTasks = joinedTasks.filter((task: any) => task.status === 'in_progress');
      
      // Photo verification stats
      const userPhotos = photos.filter((photo: any) => photo.uploaderId === userId);
      const pendingPhotos = userPhotos.filter((photo: any) => photo.status === 'pending');
      const approvedPhotos = userPhotos.filter((photo: any) => photo.status === 'approved');
      const rejectedPhotos = userPhotos.filter((photo: any) => photo.status === 'rejected');

      stats = {
        totalJoinedTasks: joinedTasks.length,
        completedTasks: completedTasks.length,
        inProgressTasks: inProgressTasks.length,
        pendingTasks: joinedTasks.filter((task: any) => task.status === 'pending').length,
        photoStats: {
          total: userPhotos.length,
          pending: pendingPhotos.length,
          approved: approvedPhotos.length,
          rejected: rejectedPhotos.length,
          inProgress: userPhotos.filter((photo: any) => photo.status === 'in_progress').length
        },
        recentActivities: [
          ...completedTasks.slice(-3).map((task: any) => ({
            type: 'task_completed',
            title: 'งานเสร็จสิ้น',
            description: `งาน "${task.title}" เสร็จสิ้นแล้ว`,
            time: task.updatedAt || new Date().toISOString(),
            icon: 'CheckCircle',
            color: 'green'
          })),
          ...approvedPhotos.slice(-2).map((photo: any) => ({
            type: 'photo_approved',
            title: 'รูปถ่ายได้รับการอนุมัติ',
            description: `รูปถ่ายการทำงานได้รับการอนุมัติแล้ว`,
            time: photo.updatedAt || new Date().toISOString(),
            icon: 'CheckCircle',
            color: 'green'
          }))
        ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 5)
      };

    } else if (user.userType === 'ELDERLY') {
      // Elderly stats - tasks they created
      const createdTasks = tasks.filter((task: any) => task.creatorId === userId);
      const completedTasks = createdTasks.filter((task: any) => task.status === 'completed');
      const activeTasks = createdTasks.filter((task: any) => task.status === 'active');
      
      // Count total volunteers who joined their tasks
      const totalVolunteers = createdTasks.reduce((sum: number, task: any) => {
        return sum + (task.volunteers ? task.volunteers.length : 0);
      }, 0);

      // Photo verification stats for their tasks
      const taskPhotos = photos.filter((photo: any) => 
        createdTasks.some((task: any) => task.id === photo.taskId)
      );
      
      stats = {
        totalCreatedTasks: createdTasks.length,
        completedTasks: completedTasks.length,
        activeTasks: activeTasks.length,
        totalVolunteers: totalVolunteers,
        photoStats: {
          total: taskPhotos.length,
          pending: taskPhotos.filter((photo: any) => photo.status === 'pending').length,
          approved: taskPhotos.filter((photo: any) => photo.status === 'approved').length,
          rejected: taskPhotos.filter((photo: any) => photo.status === 'rejected').length,
          inProgress: taskPhotos.filter((photo: any) => photo.status === 'in_progress').length
        },
        recentActivities: [
          ...completedTasks.slice(-3).map((task: any) => ({
            type: 'task_completed',
            title: 'งานเสร็จสิ้น',
            description: `งาน "${task.title}" ที่คุณสร้างเสร็จสิ้นแล้ว`,
            time: task.updatedAt || new Date().toISOString(),
            icon: 'CheckCircle',
            color: 'green'
          })),
          ...createdTasks.filter((task: any) => task.volunteers && task.volunteers.length > 0).slice(-2).map((task: any) => ({
            type: 'volunteer_joined',
            title: 'มีจิตอาสาเข้าร่วม',
            description: `มีจิตอาสา ${task.volunteers.length} คนเข้าร่วมงาน "${task.title}"`,
            time: task.updatedAt || new Date().toISOString(),
            icon: 'Users',
            color: 'blue'
          }))
        ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 5)
      };
    }

    // Get unread notifications count
    const userNotifications = notifications.filter((notif: any) => 
      notif.userId === userId && !notif.read
    );

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
        unreadNotifications: userNotifications.length
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
