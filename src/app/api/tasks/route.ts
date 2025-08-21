import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Simple tasks - return demo data for now
                    const tasks = [
                  {
                    id: '1',
                    title: 'ช่วยซื้อของที่ซุปเปอร์มาร์เก็ต',
                    description: 'ต้องการคนช่วยซื้อของที่ซุปเปอร์มาร์เก็ต เซ็นทรัลเวิลด์ ช่วยเลือกผักผลไม้และของใช้ในบ้าน เช่น ผักคะน้า ผักบุ้ง มะเขือเทศ แครอท แอปเปิ้ล ส้ม กล้วย และของใช้ในบ้าน เช่น น้ำยาล้างจาน แปรงสีฟัน สบู่ ผ้าขนหนู',
                    category: 'EXERCISE',
                    status: 'PENDING',
                    budget: 300,
                    volunteerHours: 2,
                    estimatedHours: 2,
                    address: 'เซ็นทรัลเวิลด์',
                    city: 'กรุงเทพฯ',
                    province: 'กรุงเทพฯ',
                    postalCode: '10330',
                    scheduledDate: new Date().toISOString(),
                    scheduledTime: '09:00',
                    createdAt: new Date().toISOString(),
                    creator: {
                      id: 'user-1',
                      firstName: 'สมศรี',
                      lastName: 'ใจดี',
                      userType: 'ELDERLY'
                    },
                    accepter: null
                  },
                  {
                    id: '2',
                    title: 'ช่วยติดตั้งคอมพิวเตอร์',
                    description: 'ซื้อคอมพิวเตอร์ใหม่มา ต้องการคนช่วยติดตั้งและลงโปรแกรมพื้นฐาน เช่น Office, Chrome, Photoshop และโปรแกรมอื่นๆ ที่จำเป็น',
                    category: 'REPAIR',
                    status: 'PENDING',
                    budget: 400,
                    volunteerHours: 3,
                    estimatedHours: 3,
                    address: 'บ้านผู้ใช้',
                    city: 'กรุงเทพฯ',
                    province: 'กรุงเทพฯ',
                    postalCode: '10400',
                    scheduledDate: new Date().toISOString(),
                    scheduledTime: '13:00',
                    createdAt: new Date().toISOString(),
                    creator: {
                      id: 'user-2',
                      firstName: 'สมชาย',
                      lastName: 'รักดี',
                      userType: 'ELDERLY'
                    },
                    accepter: null
                  },
                  {
                    id: '3',
                    title: 'พาไปตรวจสุขภาพที่โรงพยาบาล',
                    description: 'ต้องการคนพาไปตรวจสุขภาพที่โรงพยาบาลมหาราช ตรวจความดันและน้ำตาลในเลือด ตรวจตา และตรวจสุขภาพทั่วไป',
                    category: 'HOSPITAL',
                    status: 'PENDING',
                    budget: 500,
                    volunteerHours: 4,
                    estimatedHours: 4,
                    address: 'โรงพยาบาลมหาราช',
                    city: 'กรุงเทพฯ',
                    province: 'กรุงเทพฯ',
                    postalCode: '10400',
                    scheduledDate: new Date().toISOString(),
                    scheduledTime: '08:00',
                    createdAt: new Date().toISOString(),
                    creator: {
                      id: 'user-3',
                      firstName: 'สมศักดิ์',
                      lastName: 'ใจเย็น',
                      userType: 'ELDERLY'
                    },
                    accepter: null
                  },
                  {
                    id: '4',
                    title: 'พาไปทำบุญที่วัดพระแก้ว',
                    description: 'ต้องการคนพาไปทำบุญที่วัดพระแก้ว ไหว้พระ ทำบุญใส่บาตร และเดินชมความสวยงามของวัด',
                    category: 'TEMPLE',
                    status: 'PENDING',
                    budget: 200,
                    volunteerHours: 3,
                    estimatedHours: 3,
                    address: 'วัดพระแก้ว',
                    city: 'กรุงเทพฯ',
                    province: 'กรุงเทพฯ',
                    postalCode: '10200',
                    scheduledDate: new Date().toISOString(),
                    scheduledTime: '07:00',
                    createdAt: new Date().toISOString(),
                    creator: {
                      id: 'user-4',
                      firstName: 'สมหญิง',
                      lastName: 'ใจบุญ',
                      userType: 'ELDERLY'
                    },
                    accepter: null
                  },
                  {
                    id: '5',
                    title: 'ช่วยออกกำลังกายที่สวนสาธารณะ',
                    description: 'ต้องการคนช่วยออกกำลังกายที่สวนลุมพินี เดินเร็ว วิ่งเหยาะๆ และทำท่ากายบริหารเบาๆ',
                    category: 'EXERCISE',
                    status: 'PENDING',
                    budget: 150,
                    volunteerHours: 2,
                    estimatedHours: 2,
                    address: 'สวนลุมพินี',
                    city: 'กรุงเทพฯ',
                    province: 'กรุงเทพฯ',
                    postalCode: '10400',
                    scheduledDate: new Date().toISOString(),
                    scheduledTime: '06:00',
                    createdAt: new Date().toISOString(),
                    creator: {
                      id: 'user-5',
                      firstName: 'สมปอง',
                      lastName: 'รักสุขภาพ',
                      userType: 'ELDERLY'
                    },
                    accepter: null
                  },
                  {
                    id: '6',
                    title: 'ช่วยซ่อมเครื่องปรับอากาศ',
                    description: 'เครื่องปรับอากาศไม่เย็น ต้องการคนช่วยตรวจสอบและซ่อมแซมเบื้องต้น หรือแนะนำช่างที่เชื่อถือได้',
                    category: 'REPAIR',
                    status: 'PENDING',
                    budget: 600,
                    volunteerHours: 2,
                    estimatedHours: 2,
                    address: 'บ้านผู้ใช้',
                    city: 'กรุงเทพฯ',
                    province: 'กรุงเทพฯ',
                    postalCode: '10500',
                    scheduledDate: new Date().toISOString(),
                    scheduledTime: '10:00',
                    createdAt: new Date().toISOString(),
                    creator: {
                      id: 'user-6',
                      firstName: 'สมบัติ',
                      lastName: 'ใจดี',
                      userType: 'ELDERLY'
                    },
                    accepter: null
                  },
                  {
                    id: '7',
                    title: 'พาไปซื้อของที่ตลาด',
                    description: 'ต้องการคนพาไปซื้อของที่ตลาดคลองเตย ซื้อผัก ผลไม้ เนื้อสัตว์ และของใช้ในบ้าน',
                    category: 'EXERCISE',
                    status: 'PENDING',
                    budget: 250,
                    volunteerHours: 2,
                    estimatedHours: 2,
                    address: 'ตลาดคลองเตย',
                    city: 'กรุงเทพฯ',
                    province: 'กรุงเทพฯ',
                    postalCode: '10110',
                    scheduledDate: new Date().toISOString(),
                    scheduledTime: '07:30',
                    createdAt: new Date().toISOString(),
                    creator: {
                      id: 'user-7',
                      firstName: 'สมศรี',
                      lastName: 'รักตลาด',
                      userType: 'ELDERLY'
                    },
                    accepter: null
                  },
                  {
                    id: '8',
                    title: 'ช่วยจัดระเบียบห้องสมุด',
                    description: 'ต้องการคนช่วยจัดระเบียบหนังสือในห้องสมุด จัดหมวดหมู่ และทำความสะอาดพื้นที่',
                    category: 'REPAIR',
                    status: 'PENDING',
                    budget: 350,
                    volunteerHours: 4,
                    estimatedHours: 4,
                    address: 'ห้องสมุดประชาชน',
                    city: 'กรุงเทพฯ',
                    province: 'กรุงเทพฯ',
                    postalCode: '10300',
                    scheduledDate: new Date().toISOString(),
                    scheduledTime: '14:00',
                    createdAt: new Date().toISOString(),
                    creator: {
                      id: 'user-8',
                      firstName: 'สมชาย',
                      lastName: 'รักหนังสือ',
                      userType: 'ELDERLY'
                    },
                    accepter: null
                  }
                ];

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
    const { title, description, category, address, city, province, postalCode, budget, scheduledDate, scheduledTime, estimatedHours } = await request.json();

    if (!title || !description || !category) {
      return NextResponse.json(
        { message: 'Title, description, and category are required' },
        { status: 400 }
      );
    }

    // Simple task creation - return demo task
    const task = {
      id: 'task-' + Date.now(),
      title,
      description,
      category,
      address: address || '',
      city: city || '',
      province: province || '',
      postalCode: postalCode || '',
      scheduledDate: scheduledDate ? new Date(scheduledDate) : new Date(),
      scheduledTime: scheduledTime || '09:00',
      estimatedHours: estimatedHours ? parseInt(estimatedHours) : 2,
      budget: budget ? parseFloat(budget) : null,
      volunteerHours: estimatedHours ? parseInt(estimatedHours) : 2,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      creator: {
        id: 'demo-user',
        firstName: 'Demo',
        lastName: 'User',
        userType: 'STUDENT'
      }
    };

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Create task error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
