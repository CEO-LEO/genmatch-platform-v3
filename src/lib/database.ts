// Database configuration and utilities for GenMatch Platform

// Mock database wrapper for demo mode
class MockDatabase {
  private users: Map<string, any> = new Map();
  private nextId: number = 2; // Start from 2 since we have Leo user

  constructor() {
    // Initialize with Leo user
    this.users.set('0886412880', {
      id: 1,
      firstName: 'Leo',
      lastName: 'User',
      phone: '0886412880',
      userType: 'student',
      studentId: '123456789',
      university: 'Demo University',
      address: 'Demo Address',
      password: '$2a$10$demo.hash.for.testing.purposes.only'
    });
  }

  async exec(sql: string) {
    console.log('🔧 Mock Database exec:', sql);
    return Promise.resolve();
  }

  async get(sql: string, params: any[] = []) {
    console.log('🔧 Mock Database get:', sql, params);
    
    // Return mock data for demo mode
    if (sql.includes('SELECT 1 as test')) {
      return { test: 1 };
    }
    if (sql.includes('COUNT(*)')) {
      return { count: this.users.size }; // Return actual user count
    }
    if (sql.includes('users') && sql.includes('phone')) {
      const phone = params[0];
      const user = this.users.get(phone);
      if (user) {
        console.log('✅ Mock Database: Found user:', user.firstName);
        return user;
      }
      console.log('❌ Mock Database: User not found for phone:', phone);
      return null;
    }
    if (sql.includes('users') && sql.includes('LIMIT 1')) {
      const usersArray = Array.from(this.users.values());
      const firstUser = usersArray[0];
      return firstUser || null;
    }
    return null;
  }

  async run(sql: string, params: any[] = []) {
    console.log('🔧 Mock Database run:', sql, params);
    
    // Handle INSERT INTO users
    if (sql.includes('INSERT INTO users')) {
      const [firstName, lastName, email, phone, userType, studentId, university, address, password] = params;
      
      const newUser = {
        id: this.nextId++,
        firstName,
        lastName,
        email,
        phone,
        userType,
        studentId,
        university,
        address,
        password
      };
      
      this.users.set(phone, newUser);
      console.log('✅ Mock Database: User stored:', newUser.firstName, 'with ID:', newUser.id);
      
      return { lastID: newUser.id };
    }
    
    if (sql.includes('DELETE FROM users')) {
      const id = params[0];
      // Find and remove user by ID
      const usersArray = Array.from(this.users.entries());
      for (const [phone, user] of usersArray) {
        if (user.id === id) {
          this.users.delete(phone);
          console.log('✅ Mock Database: User deleted:', user.firstName);
          break;
        }
      }
      return { changes: 1 };
    }
    
    return { lastID: 0, changes: 0 };
  }

  async all(sql: string, params: any[] = []) {
    console.log('🔧 Mock Database all:', sql, params);
    
    // Return mock table structure for demo mode
    if (sql.includes('PRAGMA table_info(users)')) {
      return [
        { cid: 0, name: 'id', type: 'BIGSERIAL', notnull: 1, dflt_value: null, pk: 1 },
        { cid: 1, name: 'firstName', type: 'TEXT', notnull: 1, dflt_value: null, pk: 0 },
        { cid: 2, name: 'lastName', type: 'TEXT', notnull: 1, dflt_value: null, pk: 0 },
        { cid: 3, name: 'phone', type: 'TEXT', notnull: 1, dflt_value: null, pk: 0 },
        { cid: 4, name: 'userType', type: 'TEXT', notnull: 1, dflt_value: null, pk: 0 },
        { cid: 5, name: 'address', type: 'TEXT', notnull: 1, dflt_value: null, pk: 0 },
        { cid: 6, name: 'password', type: 'TEXT', notnull: 1, dflt_value: null, pk: 0 },
        { cid: 7, name: 'createdAt', type: 'TIMESTAMP', notnull: 0, dflt_value: 'NOW()', pk: 0 }
      ];
    }
    return [];
  }

  async close() {
    console.log('🔧 Mock Database close called');
    return Promise.resolve();
  }
}

// Database connection
let db: any = null;
let mockDatabase: MockDatabase | null = null;

export async function getDatabase() {
  if (db) return db;
  
  console.log('🚀 Initializing Mock Database...');
  
  // Create singleton MockDatabase instance
  if (!mockDatabase) {
    mockDatabase = new MockDatabase();
    console.log('✅ New Mock Database instance created');
  } else {
    console.log('✅ Using existing Mock Database instance');
  }
  
  db = mockDatabase;
  console.log('✅ Mock Database ready - Demo Mode');
  
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
  return { 
    status: 'demo', 
    message: 'Running in demo mode with mock database',
    timestamp: new Date().toISOString() 
  };
}

// Database stats
export async function getDatabaseStats() {
  return {
    users: 1,
    timestamp: new Date().toISOString(),
    database: 'Mock Database (Demo Mode)'
  };
}

