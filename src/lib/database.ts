// Database configuration and utilities for GenMatch Platform

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

// Mock database for production
class MockDatabase {
  private users: any[] = [];
  private tasks: any[] = [];
  private chatMessages: any[] = [];
  private userIdCounter = 1;
  private taskIdCounter = 1;
  private messageIdCounter = 1;

  async exec(sql: string) {
    console.log('🔧 Mock database exec:', sql);
    return Promise.resolve();
  }

  async get(sql: string, params: any[] = []) {
    console.log('🔧 Mock database get:', sql, params);
    
    if (sql.includes('users') && sql.includes('phone')) {
      const phone = params[0];
      return this.users.find(user => user.phone === phone) || null;
    }
    
    if (sql.includes('COUNT(*)')) {
      return { count: this.users.length };
    }
    
    return null;
  }

  async run(sql: string, params: any[] = []) {
    console.log('🔧 Mock database run:', sql, params);
    
    if (sql.includes('INSERT INTO users')) {
      const user = {
        id: this.userIdCounter++,
        firstName: params[0],
        lastName: params[1],
        email: params[2],
        phone: params[3],
        userType: params[4],
        studentId: params[5],
        university: params[6],
        address: params[7],
        password: params[8],
        createdAt: new Date().toISOString()
      };
      this.users.push(user);
      return { lastID: user.id };
    }
    
    if (sql.includes('INSERT INTO tasks')) {
      const task = {
        id: this.taskIdCounter++,
        title: params[0],
        description: params[1],
        category: params[2],
        location: params[3],
        date: params[4],
        startTime: params[5],
        endTime: params[6],
        maxVolunteers: params[7],
        requirements: params[8],
        tags: params[9],
        contactName: params[10],
        contactPhone: params[11],
        contactEmail: params[12],
        creatorId: params[13],
        status: 'PENDING',
        createdAt: new Date().toISOString()
      };
      this.tasks.push(task);
      return { lastID: task.id };
    }
    
    return { lastID: 1 };
  }

  async all(sql: string, params: any[] = []) {
    console.log('🔧 Mock database all:', sql, params);
    
    if (sql.includes('PRAGMA table_info')) {
      return [
        { cid: 0, name: 'id', type: 'INTEGER', notnull: 0, dflt_value: null, pk: 1 },
        { cid: 1, name: 'firstName', type: 'TEXT', notnull: 1, dflt_value: null, pk: 0 },
        { cid: 2, name: 'lastName', type: 'TEXT', notnull: 1, dflt_value: null, pk: 0 },
        { cid: 3, name: 'email', type: 'TEXT', notnull: 0, dflt_value: null, pk: 0 },
        { cid: 4, name: 'phone', type: 'TEXT', notnull: 1, dflt_value: null, pk: 0 },
        { cid: 5, name: 'userType', type: 'TEXT', notnull: 1, dflt_value: null, pk: 0 },
        { cid: 6, name: 'studentId', type: 'TEXT', notnull: 0, dflt_value: null, pk: 0 },
        { cid: 7, name: 'university', type: 'TEXT', notnull: 0, dflt_value: null, pk: 0 },
        { cid: 8, name: 'address', type: 'TEXT', notnull: 1, dflt_value: null, pk: 0 },
        { cid: 9, name: 'password', type: 'TEXT', notnull: 1, dflt_value: null, pk: 0 },
        { cid: 10, name: 'createdAt', type: 'DATETIME', notnull: 0, dflt_value: 'CURRENT_TIMESTAMP', pk: 0 }
      ];
    }
    
    return [];
  }

  async close() {
    console.log('🔧 Mock database closed');
    return Promise.resolve();
  }
}

// Database connection
let db: any = null;

export async function getDatabase() {
  if (db) return db;
  
  try {
    // Check if we're in production (Vercel)
    if (process.env.VERCEL === '1') {
      // In production, use mock database
      console.log('⚠️ Running in production environment - using mock database');
      db = new MockDatabase();
      return db;
    }
    
    // Use absolute path for database (local development only)
    const dbPath = path.join(process.cwd(), 'genmatch.db');
    
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    // Create users table if it doesn't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT,
        phone TEXT NOT NULL UNIQUE,
        userType TEXT NOT NULL,
        studentId TEXT,
        university TEXT,
        address TEXT NOT NULL,
        password TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create tasks table if it doesn't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        location TEXT NOT NULL,
        date TEXT NOT NULL,
        startTime TEXT NOT NULL,
        endTime TEXT NOT NULL,
        maxVolunteers INTEGER NOT NULL,
        requirements TEXT,
        tags TEXT,
        contactName TEXT NOT NULL,
        contactPhone TEXT NOT NULL,
        contactEmail TEXT,
        creatorId INTEGER NOT NULL,
        status TEXT DEFAULT 'PENDING',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (creatorId) REFERENCES users (id)
      )
    `);

    // Create chat_messages table if it doesn't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        taskId INTEGER NOT NULL,
        senderId INTEGER NOT NULL,
        message TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (taskId) REFERENCES tasks (id),
        FOREIGN KEY (senderId) REFERENCES users (id)
      )
    `);

    console.log('✅ Database initialized successfully at:', dbPath);
    return db;
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw new Error(`Failed to initialize database: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function closeDatabase() {
  if (db) {
    await db.close();
    db = null;
  }
}

// Database health check
export async function checkDatabaseHealth() {
  try {
    const db = await getDatabase();
    await db.get('SELECT 1');
    return { status: 'healthy', timestamp: new Date().toISOString() };
  } catch (error) {
    return { status: 'unhealthy', error: error instanceof Error ? error.message : 'Unknown error', timestamp: new Date().toISOString() };
  }
}

// Database stats
export async function getDatabaseStats() {
  try {
    const db = await getDatabase();
    const userCount = await db.get('SELECT COUNT(*) as count FROM users');
    return {
      users: userCount.count,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('❌ Failed to get database stats:', error);
    return null;
  }
}
