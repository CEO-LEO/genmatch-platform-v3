import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clear existing data
  await prisma.$transaction([
    prisma.taskComment.deleteMany(),
    prisma.review.deleteMany(),
    prisma.achievement.deleteMany(),
    prisma.notification.deleteMany(),
    prisma.message.deleteMany(),
    prisma.task.deleteMany(),
    prisma.user.deleteMany(),
  ])

  console.log('🧹 Cleared existing data')

  // Create sample users
  const student1 = await prisma.user.create({
    data: {
      email: 'student1@example.com',
      password: '$2a$10$example.hash.student1', // In real app, use bcrypt
      userType: 'STUDENT',
      firstName: 'สมชาย',
      lastName: 'ใจดี',
      phone: '0812345678',
      address: '123 ถนนสุขุมวิท',
      city: 'กรุงเทพมหานคร',
      province: 'กรุงเทพมหานคร',
      postalCode: '10110',
      studentId: '65123456789',
      university: 'มหาวิทยาลัยมหิดล',
      major: 'วิศวกรรมศาสตร์',
      graduationYear: 2027,
      rating: 4.8,
      totalHours: 45,
      completedTasks: 12,
      isVerified: true,
    },
  })

  const student2 = await prisma.user.create({
    data: {
      email: 'student2@example.com',
      password: '$2a$10$example.hash.student2',
      userType: 'STUDENT',
      firstName: 'สมหญิง',
      lastName: 'รักดี',
      phone: '0823456789',
      address: '456 ถนนรัชดาภิเษก',
      city: 'กรุงเทพมหานคร',
      province: 'กรุงเทพมหานคร',
      postalCode: '10400',
      studentId: '65123456790',
      university: 'จุฬาลงกรณ์มหาวิทยาลัย',
      major: 'วิทยาศาสตร์',
      graduationYear: 2026,
      rating: 4.6,
      totalHours: 32,
      completedTasks: 8,
      isVerified: true,
    },
  })

  const elderly1 = await prisma.user.create({
    data: {
      email: 'elderly1@example.com',
      password: '$2a$10$example.hash.elderly1',
      userType: 'ELDERLY',
      firstName: 'คุณตา',
      lastName: 'ใจเย็น',
      phone: '0834567890',
      address: '789 ถนนลาดพร้าว',
      city: 'กรุงเทพมหานคร',
      province: 'กรุงเทพมหานคร',
      postalCode: '10230',
      emergencyContact: '0845678901',
      medicalConditions: 'เบาหวาน, ความดันสูง',
      preferences: 'ชอบคนใจดี, ใจเย็น',
      rating: 4.9,
      totalHours: 0,
      completedTasks: 0,
      isVerified: true,
    },
  })

  const elderly2 = await prisma.user.create({
    data: {
      email: 'elderly2@example.com',
      password: '$2a$10$example.hash.elderly2',
      userType: 'ELDERLY',
      firstName: 'คุณยาย',
      lastName: 'ใจดี',
      phone: '0845678901',
      address: '321 ถนนวิภาวดี',
      city: 'กรุงเทพมหานคร',
      province: 'กรุงเทพมหานคร',
      postalCode: '10900',
      emergencyContact: '0856789012',
      medicalConditions: 'ไม่มี',
      preferences: 'ชอบคนพูดช้าๆ, มีความอดทน',
      rating: 4.7,
      totalHours: 0,
      completedTasks: 0,
      isVerified: true,
    },
  })

  console.log('👥 Created sample users')

  // Create sample tasks
  const task1 = await prisma.task.create({
    data: {
      title: 'พาไปตรวจสุขภาพที่โรงพยาบาล',
      description: 'ต้องการคนพาไปตรวจสุขภาพประจำปีที่โรงพยาบาลมหิดล ต้องการคนใจดี มีความอดทน',
      category: 'HOSPITAL',
      status: 'PENDING',
      priority: 'MEDIUM',
      difficulty: 'EASY',
      address: 'โรงพยาบาลมหิดล',
      city: 'นครปฐม',
      province: 'นครปฐม',
      postalCode: '73170',
      scheduledDate: new Date('2024-02-15'),
      scheduledTime: '09:00',
      estimatedHours: 4,
      volunteerHours: 4,
      requirements: 'ใจดี, มีความอดทน, รู้จักโรงพยาบาลมหิดล',
      creatorId: elderly1.id,
    },
  })

  const task2 = await prisma.task.create({
    data: {
      title: 'พาไปทำบุญที่วัดพระแก้ว',
      description: 'ต้องการคนพาไปทำบุญที่วัดพระแก้วในวันพระ ต้องการคนที่รู้จักวัดและมีมารยาทดี',
      category: 'TEMPLE',
      status: 'ACCEPTED',
      priority: 'LOW',
      difficulty: 'EASY',
      address: 'วัดพระศรีรัตนศาสดาราม',
      city: 'กรุงเทพมหานคร',
      province: 'กรุงเทพมหานคร',
      postalCode: '10200',
      scheduledDate: new Date('2024-02-10'),
      scheduledTime: '08:00',
      estimatedHours: 3,
      volunteerHours: 3,
      requirements: 'รู้จักวัดพระแก้ว, มีมารยาทดี, แต่งกายสุภาพ',
      creatorId: elderly2.id,
      accepterId: student1.id,
      acceptedAt: new Date('2024-02-08'),
    },
  })

  const task3 = await prisma.task.create({
    data: {
      title: 'พาไปเดินเล่นที่สวนลุมพินี',
      description: 'ต้องการคนพาไปเดินเล่นที่สวนลุมพินีในตอนเย็น ต้องการคนที่ชอบออกกำลังกาย',
      category: 'EXERCISE',
      status: 'IN_PROGRESS',
      priority: 'MEDIUM',
      difficulty: 'EASY',
      address: 'สวนลุมพินี',
      city: 'กรุงเทพมหานคร',
      province: 'กรุงเทพมหานคร',
      postalCode: '10330',
      scheduledDate: new Date('2024-02-12'),
      scheduledTime: '17:00',
      estimatedHours: 2,
      volunteerHours: 2,
      requirements: 'ชอบออกกำลังกาย, รู้จักสวนลุมพินี, มีความอดทน',
      creatorId: elderly1.id,
      accepterId: student2.id,
      acceptedAt: new Date('2024-02-10'),
      startedAt: new Date('2024-02-12'),
    },
  })

  const task4 = await prisma.task.create({
    data: {
      title: 'ซ่อมก๊อกน้ำที่รั่ว',
      description: 'ก๊อกน้ำในห้องน้ำรั่ว ต้องการคนที่รู้จักซ่อมก๊อกน้ำหรือมีเครื่องมือ',
      category: 'REPAIR',
      status: 'COMPLETED',
      priority: 'HIGH',
      difficulty: 'MEDIUM',
      address: 'บ้านคุณตาใจเย็น',
      city: 'กรุงเทพมหานคร',
      province: 'กรุงเทพมหานคร',
      postalCode: '10230',
      scheduledDate: new Date('2024-02-05'),
      scheduledTime: '14:00',
      estimatedHours: 2,
      volunteerHours: 2,
      requirements: 'รู้จักซ่อมก๊อกน้ำ, มีเครื่องมือ, มีประสบการณ์',
      creatorId: elderly1.id,
      accepterId: student1.id,
      acceptedAt: new Date('2024-02-03'),
      startedAt: new Date('2024-02-05'),
      completedAt: new Date('2024-02-05'),
    },
  })

  console.log('📋 Created sample tasks')

  // Create sample achievements
  const achievements = await Promise.all([
    prisma.achievement.create({
      data: {
        name: 'จิตอาสามือใหม่',
        description: 'เสร็จสิ้นงานจิตอาสาเป็นครั้งแรก',
        icon: '🎯',
        category: 'TASK_COMPLETION',
        points: 10,
        isUnlocked: true,
        unlockedAt: new Date('2024-01-15'),
        userId: student1.id,
      },
    }),
    prisma.achievement.create({
      data: {
        name: 'จิตอาสาใจดี',
        description: 'ได้รับคะแนนความพึงพอใจ 5 ดาว',
        icon: '⭐',
        category: 'RATING',
        points: 20,
        isUnlocked: true,
        unlockedAt: new Date('2024-01-20'),
        userId: student1.id,
      },
    }),
    prisma.achievement.create({
      data: {
        name: 'จิตอาสามืออาชีพ',
        description: 'เสร็จสิ้นงานจิตอาสา 10 งาน',
        icon: '🏆',
        category: 'TASK_COMPLETION',
        points: 50,
        isUnlocked: true,
        unlockedAt: new Date('2024-02-01'),
        userId: student1.id,
      },
    }),
    prisma.achievement.create({
      data: {
        name: 'จิตอาสาใจดี',
        description: 'ได้รับคะแนนความพึงพอใจ 5 ดาว',
        icon: '⭐',
        category: 'RATING',
        points: 20,
        isUnlocked: true,
        unlockedAt: new Date('2024-01-25'),
        userId: student2.id,
      },
    }),
  ])

  console.log('🏆 Created sample achievements')

  // Create sample reviews
  const reviews = await Promise.all([
    prisma.review.create({
      data: {
        rating: 5,
        comment: 'เด็กๆ ใจดีมาก พาไปตรวจสุขภาพได้ดีมาก ขอบคุณมากๆ',
        authorId: elderly1.id,
        recipientId: student1.id,
        taskId: task4.id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        comment: 'พาไปทำบุญได้ดีมาก มีมารยาทดี แต่งกายสุภาพ',
        authorId: elderly2.id,
        recipientId: student1.id,
        taskId: task2.id,
      },
    }),
  ])

  console.log('⭐ Created sample reviews')

  // Create sample notifications
  const notifications = await Promise.all([
    prisma.notification.create({
      data: {
        title: 'งานใหม่',
        message: 'มีงานใหม่ที่ตรงกับความสามารถของคุณ',
        type: 'TASK_UPDATE',
        priority: 'NORMAL',
        userId: student1.id,
        taskId: task1.id,
      },
    }),
    prisma.notification.create({
      data: {
        title: 'งานเสร็จสิ้น',
        message: 'งานซ่อมก๊อกน้ำเสร็จสิ้นแล้ว ขอบคุณมากๆ',
        type: 'TASK_UPDATE',
        priority: 'NORMAL',
        userId: elderly1.id,
        taskId: task4.id,
      },
    }),
  ])

  console.log('🔔 Created sample notifications')

  // Create sample messages
  const messages = await Promise.all([
    prisma.message.create({
      data: {
        content: 'สวัสดีครับ ผมจะรับงานซ่อมก๊อกน้ำให้ครับ',
        messageType: 'TEXT',
        senderId: student1.id,
        receiverId: elderly1.id,
        taskId: task4.id,
      },
    }),
    prisma.message.create({
      data: {
        content: 'ขอบคุณมากครับ ต้องการให้มาซ่อมวันไหนครับ?',
        messageType: 'TEXT',
        senderId: elderly1.id,
        receiverId: student1.id,
        taskId: task4.id,
      },
    }),
  ])

  console.log('💬 Created sample messages')

  console.log('✅ Database seeding completed successfully!')
  console.log(`📊 Created ${achievements.length} achievements`)
  console.log(`📋 Created ${reviews.length} reviews`)
  console.log(`🔔 Created ${notifications.length} notifications`)
  console.log(`💬 Created ${messages.length} messages`)
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
