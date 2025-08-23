// Database configuration and utilities for GenMatch Platform

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Database connection
let db: any = null;

export async function getDatabase() {
  if (db) return db;
  
  db = await open({
    filename: './genmatch.db',
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

  return db;
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
