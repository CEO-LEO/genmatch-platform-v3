// Database configuration and utilities for GenMatch Platform

// Global mock database storage for demo mode
declare global {
  var mockUsers: Map<string, any>;
  var mockNextId: number;
}

// Initialize global variables if they don't exist
if (!global.mockUsers) {
  global.mockUsers = new Map();
  global.mockNextId = 2;
}

// Check if we should use real database
const USE_REAL_DATABASE = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY;

// Mock database wrapper for demo mode
class MockDatabase {
  constructor() {
    // Initialize with all demo users if not already present
    this.initializeDemoUsers();
  }

  initializeDemoUsers() {
    // Leo user
    if (!global.mockUsers.has('0886412880')) {
      global.mockUsers.set('0886412880', {
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
      console.log('✅ Mock Database: Initialized Leo user');
    }

    // สมศรี ใจดี
    if (!global.mockUsers.has('0812345678')) {
      global.mockUsers.set('0812345678', {
        id: 2,
        firstName: 'สมศรี',
        lastName: 'ใจดี',
        email: 'somsri@demo.com',
        phone: '0812345678',
        userType: 'STUDENT',
        studentId: '123456789',
        university: 'มหาวิทยาลัยมหิดล',
        address: 'กรุงเทพฯ',
        password: '$2a$10$demo.hash.for.testing.purposes.only'
      });
      console.log('✅ Mock Database: Initialized สมศรี user');
    }

    // วิชัย มุ่งมั่น
    if (!global.mockUsers.has('0823456789')) {
      global.mockUsers.set('0823456789', {
        id: 3,
        firstName: 'วิชัย',
        lastName: 'มุ่งมั่น',
        email: 'wichai@demo.com',
        phone: '0823456789',
        userType: 'STUDENT',
        studentId: '987654321',
        university: 'จุฬาลงกรณ์มหาวิทยาลัย',
        address: 'กรุงเทพฯ',
        password: '$2a$10$demo.hash.for.testing.purposes.only'
      });
      console.log('✅ Mock Database: Initialized วิชัย user');
    }

    // คุณยายสมศรี
    if (!global.mockUsers.has('0845678901')) {
      global.mockUsers.set('0845678901', {
        id: 4,
        firstName: 'คุณยาย',
        lastName: 'สมศรี',
        email: 'grandma@demo.com',
        phone: '0845678901',
        userType: 'ELDERLY',
        studentId: '',
        university: '',
        address: '123 ถนนสุขุมวิท กรุงเทพฯ',
        password: '$2a$10$demo.hash.for.testing.purposes.only'
      });
      console.log('✅ Mock Database: Initialized คุณยาย user');
    }

    // Update global next ID
    global.mockNextId = Math.max(...Array.from(global.mockUsers.values()).map(u => u.id)) + 1;
    
    console.log('📊 Mock Database: Total users initialized:', global.mockUsers.size);
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
      return { count: global.mockUsers.size };
    }
    if (sql.includes('users') && sql.includes('phone')) {
      const phone = params[0];
      const user = global.mockUsers.get(phone);
      if (user) {
        console.log('✅ Mock Database: Found user:', user.firstName);
        return user;
      }
      console.log('❌ Mock Database: User not found for phone:', phone);
      return null;
    }
    if (sql.includes('users') && sql.includes('LIMIT 1')) {
      const usersArray = Array.from(global.mockUsers.values());
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
        id: global.mockNextId++,
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
      
      global.mockUsers.set(phone, newUser);
      console.log('✅ Mock Database: User stored:', newUser.firstName, 'with ID:', newUser.id);
      console.log('📊 Total users in database:', global.mockUsers.size);
      
      return { lastID: newUser.id };
    }
    
    if (sql.includes('DELETE FROM users')) {
      const id = params[0];
      // Find and remove user by ID
      const usersArray = Array.from(global.mockUsers.entries());
      for (const [phone, user] of usersArray) {
        if (user.id === id) {
          global.mockUsers.delete(phone);
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

// Real Supabase Database wrapper
class SupabaseDatabase {
  constructor(private supabase: any) {}

  async exec(sql: string) {
    console.log('🔧 Supabase Database exec:', sql);
    return Promise.resolve();
  }

  async get(sql: string, params: any[] = []) {
    console.log('🔧 Supabase Database get:', sql, params);
    
    // Handle user search by phone
    if (sql.includes('users') && sql.includes('phone')) {
      const phone = params[0];
      const { data, error } = await this.supabase
        .from('users')
        .select('*')
        .eq('phone', phone)
        .single();
      
      if (error) {
        console.error('❌ Supabase query error:', error);
        return null;
      }
      
      return data;
    }
    
    // Handle count queries
    if (sql.includes('COUNT(*)')) {
      const { count, error } = await this.supabase
        .from('users')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.error('❌ Supabase count error:', error);
        return { count: 0 };
      }
      
      return { count };
    }
    
    return null;
  }

  async run(sql: string, params: any[] = []) {
    console.log('🔧 Supabase Database run:', sql, params);
    
    // Handle INSERT INTO users
    if (sql.includes('INSERT INTO users')) {
      const [firstName, lastName, email, phone, userType, studentId, university, address, password] = params;
      
      const { data, error } = await this.supabase
        .from('users')
        .insert({
          firstName,
          lastName,
          email,
          phone,
          userType,
          studentId,
          university,
          address,
          password
        })
        .select()
        .single();
      
      if (error) {
        console.error('❌ Supabase insert error:', error);
        throw error;
      }
      
      return { lastID: data.id };
    }
    
    // Handle DELETE FROM users
    if (sql.includes('DELETE FROM users')) {
      const id = params[0];
      const { error } = await this.supabase
        .from('users')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('❌ Supabase delete error:', error);
        throw error;
      }
      
      return { changes: 1 };
    }
    
    return { lastID: 0, changes: 0 };
  }

  async all(sql: string, params: any[] = []) {
    console.log('🔧 Supabase Database all:', sql, params);
    
    // Handle table info queries
    if (sql.includes('PRAGMA table_info(users)')) {
      // Return mock table structure for compatibility
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
    console.log('🔧 Supabase Database close called');
    return Promise.resolve();
  }
}

// Database connection
let db: any = null;

export async function getDatabase() {
  if (db) return db;
  
  // Check if we should use real database
  if (USE_REAL_DATABASE) {
    try {
      console.log('🚀 Initializing Real Supabase Database...');
      const { createClient } = await import('@supabase/supabase-js');
      
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
      
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      // Test connection
      const { data, error } = await supabase.from('users').select('count').limit(1);
      if (error) {
        throw new Error(`Supabase connection failed: ${error.message}`);
      }
      
      console.log('✅ Real Supabase Database connected successfully');
      db = new SupabaseDatabase(supabase);
      return db;
      
    } catch (error) {
      console.error('❌ Failed to connect to real database:', error);
      console.log('⚠️ Falling back to mock database...');
    }
  }
  
  // Fallback to mock database
  console.log('🚀 Initializing Mock Database...');
  console.log('📊 Current users in database:', global.mockUsers.size);
  
  db = new MockDatabase();
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
    users: global.mockUsers.size,
    timestamp: new Date().toISOString() 
  };
}

// Database stats
export async function getDatabaseStats() {
  return {
    users: global.mockUsers.size,
    timestamp: new Date().toISOString(),
    database: 'Mock Database (Demo Mode)',
    userList: Array.from(global.mockUsers.values()).map(u => ({ id: u.id, firstName: u.firstName, phone: u.phone }))
  };
}

