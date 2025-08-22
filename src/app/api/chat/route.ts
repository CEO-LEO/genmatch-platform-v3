import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    // Mock chat data
    const chats = [
      {
        id: 'chat_1',
        participants: [
          {
            id: 'user_1',
            firstName: 'สมศรี',
            lastName: 'ใจดี',
            userType: 'ELDERLY',
            avatar: '',
            isOnline: true
          },
          {
            id: 'user_2',
            firstName: 'นักศึกษา',
            lastName: 'จิตอาสา',
            userType: 'STUDENT',
            avatar: '',
            isOnline: false
          }
        ],
        lastMessage: {
          id: 'msg_1',
          text: 'ขอบคุณสำหรับความช่วยเหลือครับ',
          senderId: 'user_1',
          timestamp: new Date().toISOString(),
          isRead: false
        },
        taskId: 'task_1',
        taskTitle: 'พาไปตรวจสุขภาพที่โรงพยาบาล',
        unreadCount: 1
      },
      {
        id: 'chat_2',
        participants: [
          {
            id: 'user_3',
            firstName: 'สมชาย',
            lastName: 'รักดี',
            userType: 'ELDERLY',
            avatar: '',
            isOnline: true
          },
          {
            id: 'user_2',
            firstName: 'นักศึกษา',
            lastName: 'จิตอาสา',
            userType: 'STUDENT',
            avatar: '',
            isOnline: false
          }
        ],
        lastMessage: {
          id: 'msg_2',
          text: 'เจอกันพรุ่งนี้เวลา 9 โมงเช้านะครับ',
          senderId: 'user_2',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          isRead: true
        },
        taskId: 'task_2',
        taskTitle: 'ช่วยติดตั้งคอมพิวเตอร์',
        unreadCount: 0
      }
    ];

    return NextResponse.json(chats);
  } catch (error) {
    console.error('Get chats error:', error);
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดในระบบ' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { chatId, message, senderId } = await request.json();

    if (!chatId || !message || !senderId) {
      return NextResponse.json(
        { message: 'Chat ID, message, and sender ID are required' },
        { status: 400 }
      );
    }

    // Simulate sending message
    const newMessage = {
      id: 'msg_' + Date.now(),
      text: message,
      senderId: senderId,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    return NextResponse.json({
      message: 'ส่งข้อความสำเร็จ',
      data: newMessage
    });
  } catch (error) {
    console.error('Send message error:', error);
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดในระบบ' },
      { status: 500 }
    );
  }
}
