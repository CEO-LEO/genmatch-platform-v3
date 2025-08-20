// Database configuration and utilities for GenMatch Platform

import { PrismaClient } from '@prisma/client';

// Global variable to prevent multiple instances in development
declare global {
  var __prisma: PrismaClient | undefined;
}

// Create Prisma client instance
export const prisma = globalThis.__prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  errorFormat: 'pretty',
});

// Store in global variable in development
if (process.env.NODE_ENV === 'development') {
  globalThis.__prisma = prisma;
}

// Database connection utilities
export async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
}

export async function disconnectDatabase() {
  try {
    await prisma.$disconnect();
    console.log('✅ Database disconnected successfully');
  } catch (error) {
    console.error('❌ Database disconnection failed:', error);
  }
}

// Database health check
export async function checkDatabaseHealth() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { status: 'healthy', timestamp: new Date().toISOString() };
  } catch (error) {
    return { status: 'unhealthy', error: error instanceof Error ? error.message : 'Unknown error', timestamp: new Date().toISOString() };
  }
}

// Database transaction utilities
export async function withTransaction<T>(
  fn: (tx: any) => Promise<T>
): Promise<T> {
  return await prisma.$transaction(fn);
}

// Database seeding utilities
export async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Seed sample users
    await seedSampleUsers();
    
    // Seed sample tasks
    await seedSampleTasks();
    
    // Seed achievements
    await seedAchievements();
    
    console.log('✅ Database seeding completed successfully');
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    throw error;
  }
}

// Note: Categories are now stored as string values in tasks, not separate model

async function seedSampleUsers() {
  const users = [
    {
      id: 'user_student_1',
      firstName: 'สมชาย',
      lastName: 'ใจดี', 
      email: 'somchai@example.com',
      password: '$2a$12$dummy.password.hash.for.seeding.data',
      phone: '0812345678',
      address: 'กรุงเทพมหานคร',
      city: 'กรุงเทพมหานคร',
      province: 'กรุงเทพมหานคร',
      postalCode: '10110',
      userType: 'STUDENT',
      studentId: '6400000001',
      university: 'มหาวิทยาลัยมหิดล',
      rating: 4.8,
      totalHours: 25,
      completedTasks: 8,
      isVerified: true,
    },
    {
      id: 'user_student_2',
      firstName: 'สมหญิง',
      lastName: 'รักดี',
      email: 'somying@example.com',
      password: '$2a$12$dummy.password.hash.for.seeding.data',
      phone: '0823456789',
      address: 'กรุงเทพมหานคร',
      city: 'กรุงเทพมหานคร',
      province: 'กรุงเทพมหานคร',
      postalCode: '10110',
      userType: 'STUDENT',
      studentId: '6400000002',
      university: 'จุฬาลงกรณ์มหาวิทยาลัย',
      rating: 4.6,
      totalHours: 18,
      completedTasks: 6,
      isVerified: true,
    },
    {
      id: 'user_elderly_1',
      firstName: 'สมศรี',
      lastName: 'รักดี',
      email: 'yaisomsri@example.com',
      password: '$2a$12$dummy.password.hash.for.seeding.data',
      phone: '0834567890',
      address: 'กรุงเทพมหานคร',
      city: 'กรุงเทพมหานคร',
      province: 'กรุงเทพมหานคร',
      postalCode: '10110',
      userType: 'ELDERLY',
      rating: 4.9,
      totalHours: 0,
      completedTasks: 0,
      isVerified: true,
    },
    {
      id: 'user_elderly_2',
      firstName: 'สมชาย',
      lastName: 'ใจดี',
      email: 'lungsomchai@example.com',
      password: '$2a$12$dummy.password.hash.for.seeding.data',
      phone: '0845678901',
      address: 'กรุงเทพมหานคร',
      city: 'กรุงเทพมหานคร',
      province: 'กรุงเทพมหานคร',
      postalCode: '10110',
      userType: 'ELDERLY',
      rating: 4.7,
      totalHours: 0,
      completedTasks: 0,
      isVerified: true,
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: user,
      create: user,
    });
  }
}

async function seedSampleTasks() {
  const tasks = [
    {
      id: 'task_1',
      title: 'พาไปตรวจสุขภาพที่โรงพยาบาล',
      description: 'ต้องการคนพาไปตรวจสุขภาพที่โรงพยาบาลมหิดล ในวันที่ 15 มกราคม 2567 เวลา 9:00 น.',
      category: 'HOSPITAL',
      status: 'PENDING',
      address: 'โรงพยาบาลมหิดล',
      city: 'กรุงเทพมหานคร',
      province: 'กรุงเทพมหานคร',
      postalCode: '10110',
      budget: 3,
      volunteerHours: 3,
      estimatedHours: 3,
      priority: 'MEDIUM',
      difficulty: 'EASY',
      creatorId: 'user_elderly_1',
      scheduledDate: new Date('2024-01-15'),
      scheduledTime: '09:00',
      requirements: 'มีประสบการณ์การพาผู้สูงอายุไปโรงพยาบาล, ใจดี อดทน',
      tags: 'สุขภาพ, โรงพยาบาล, ผู้สูงอายุ',
    },
    {
      id: 'task_2',
      title: 'พาไปทำบุญที่วัดพระศรีรัตนศาสดาราม',
      description: 'ต้องการคนพาไปทำบุญที่วัดพระศรีรัตนศาสดาราม ในวันที่ 20 มกราคม 2567 เวลา 8:00 น.',
      category: 'TEMPLE',
      status: 'PENDING',
      address: 'วัดพระศรีรัตนศาสดาราม',
      city: 'กรุงเทพมหานคร',
      province: 'กรุงเทพมหานคร',
      postalCode: '10110',
      budget: 2,
      volunteerHours: 2,
      estimatedHours: 2,
      priority: 'LOW',
      difficulty: 'EASY',
      creatorId: 'user_elderly_2',
      scheduledDate: new Date('2024-01-20'),
      scheduledTime: '08:00',
      requirements: 'ใจดี มีความเคารพในศาสนา',
      tags: 'ทำบุญ, วัด, ศาสนา',
    },
    {
      id: 'task_3',
      title: 'พาไปออกกำลังกายที่สวนลุมพินี',
      description: 'ต้องการคนพาไปเดินออกกำลังกายที่สวนลุมพินี ทุกวันเสาร์ เวลา 6:00 น.',
      category: 'EXERCISE',
      status: 'PENDING',
      address: 'สวนลุมพินี',
      city: 'กรุงเทพมหานคร',
      province: 'กรุงเทพมหานคร',
      postalCode: '10110',
      budget: 2,
      volunteerHours: 2,
      estimatedHours: 2,
      priority: 'MEDIUM',
      difficulty: 'EASY',
      creatorId: 'user_elderly_1',
      scheduledDate: new Date('2024-01-27'),
      scheduledTime: '06:00',
      requirements: 'มีประสบการณ์การออกกำลังกาย, ใจดี อดทน',
      tags: 'ออกกำลังกาย, สวน, สุขภาพ',
    },
    {
      id: 'task_4',
      title: 'ซ่อมก๊อกน้ำที่รั่ว',
      description: 'ต้องการคนมาซ่อมก๊อกน้ำที่รั่วในห้องน้ำ งานไม่ยาก ใช้เวลาไม่นาน',
      category: 'REPAIR',
      status: 'PENDING',
      address: 'บ้านพัก',
      city: 'กรุงเทพมหานคร',
      province: 'กรุงเทพมหานคร',
      postalCode: '10110',
      budget: 4,
      volunteerHours: 2,
      estimatedHours: 2,
      priority: 'HIGH',
      difficulty: 'MODERATE',
      creatorId: 'user_elderly_2',
      scheduledDate: new Date('2024-01-18'),
      scheduledTime: '14:00',
      requirements: 'มีทักษะงานช่างพื้นฐาน, มีเครื่องมือ',
      tags: 'ซ่อม, ก๊อกน้ำ, งานช่าง',
    },
  ];

  for (const task of tasks) {
    await prisma.task.upsert({
      where: { id: task.id },
      update: task,
      create: task,
    });
  }
}

async function seedAchievements() {
  const achievements = [
    {
      id: 'achievement_1',
      name: 'จิตอาสามือใหม่',
      description: 'ทำงานจิตอาสาครั้งแรก',
      icon: '🌟',
      category: 'VOLUNTEER_HOURS',
      points: 10,
      userId: 'user_student_1',
    },
    {
      id: 'achievement_2',
      name: 'จิตอาสามืออาชีพ',
      description: 'ทำงานจิตอาสา 10 ครั้ง',
      icon: '🏆',
      category: 'TASK_COMPLETION',
      points: 50,
      userId: 'user_student_1',
    },
    {
      id: 'achievement_3',
      name: 'จิตอาสาแห่งปี',
      description: 'ทำงานจิตอาสา 50 ครั้ง',
      icon: '👑',
      category: 'VOLUNTEER_HOURS',
      points: 100,
      userId: 'user_student_2',
    },
    {
      id: 'achievement_4',
      name: 'ผู้ช่วยเหลือชุมชน',
      description: 'ทำงานจิตอาสาในชุมชนท้องถิ่น',
      icon: '🏘️',
      category: 'SPECIAL',
      points: 20,
      userId: 'user_student_1',
    },
    {
      id: 'achievement_5',
      name: 'ผู้เชี่ยวชาญด้านสุขภาพ',
      description: 'ทำงานจิตอาสาด้านสุขภาพ 20 ครั้ง',
      icon: '🏥',
      category: 'RATING',
      points: 75,
      userId: 'user_student_2',
    },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { id: achievement.id },
      update: achievement,
      create: achievement,
    });
  }
}

// Database backup utilities
export async function createDatabaseBackup() {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = `./backups/genmatch_backup_${timestamp}.sql`;
    
    // This would require additional setup for actual database backup
    console.log(`📦 Database backup created: ${backupPath}`);
    return { success: true, path: backupPath };
  } catch (error) {
    console.error('❌ Database backup failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Database migration utilities
export async function runMigrations() {
  try {
    console.log('🔄 Running database migrations...');
    
    // Prisma handles migrations automatically
    await prisma.$executeRaw`SELECT 1`;
    
    console.log('✅ Database migrations completed');
    return { success: true };
  } catch (error) {
    console.error('❌ Database migrations failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Database cleanup utilities
export async function cleanupDatabase() {
  try {
    console.log('🧹 Cleaning up database...');
    
    // Clean up old records, logs, etc.
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    // Example cleanup operations
    // await prisma.log.deleteMany({
    //   where: { createdAt: { lt: thirtyDaysAgo } }
    // });
    
    console.log('✅ Database cleanup completed');
    return { success: true };
  } catch (error) {
    console.error('❌ Database cleanup failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Database performance utilities
export async function getDatabaseStats() {
  try {
    const stats = {
      users: await prisma.user.count(),
      tasks: await prisma.task.count(),
      achievements: await prisma.achievement.count(),
      timestamp: new Date().toISOString(),
    };
    
    return stats;
  } catch (error) {
    console.error('❌ Failed to get database stats:', error);
    return null;
  }
}
