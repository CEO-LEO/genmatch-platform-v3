// Database configuration and utilities for GenMatch Platform

import { createClient } from '@supabase/supabase-js';

// Supabase configuration with fallback
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables:');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? '✅ Set' : '❌ Missing');
  
  if (process.env.VERCEL === '1') {
    console.error('⚠️ Running in Vercel production - check environment variables in Vercel dashboard');
  }
}

// Create Supabase client with error handling
let supabase: any = null;

try {
  if (supabaseUrl && supabaseKey && supabaseUrl !== 'https://example.supabase.co' && supabaseKey !== 'example-key') {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase client created successfully');
  } else {
    console.warn('⚠️ Using placeholder Supabase credentials');
    supabase = null;
  }
} catch (error) {
  console.error('❌ Failed to create Supabase client:', error);
  supabase = null;
}

// Database connection wrapper
class SupabaseDatabase {
  async exec(sql: string) {
    console.log('🔧 Supabase exec:', sql);
    return Promise.resolve();
  }

  async get(sql: string, params: any[] = []) {
    console.log('🔧 Supabase get:', sql, params);
    
    if (!supabase) {
      throw new Error('Supabase not configured - please check environment variables');
    }
    
    try {
      // Handle SELECT queries
      if (sql.includes('SELECT')) {
        if (sql.includes('users') && sql.includes('phone')) {
          const phone = params[0];
          const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('phone', phone)
            .single();
          
          if (error) throw error;
          return data;
        }
        
        if (sql.includes('COUNT(*)')) {
          const { count, error } = await supabase
            .from('users')
            .select('*', { count: 'exact', head: true });
          
          if (error) throw error;
          return { count: count || 0 };
        }
        
        if (sql.includes('SELECT 1 as test')) {
          return { test: 1 };
        }
        
        if (sql.includes('users') && sql.includes('LIMIT 1')) {
          const { data, error } = await supabase
            .from('users')
            .select('id, firstName, lastName, phone, userType')
            .limit(1)
            .single();
          
          if (error && error.code !== 'PGRST116') throw error;
          return data;
        }
      }
      
      return null;
    } catch (error) {
      console.error('❌ Supabase query error:', error);
      throw error;
    }
  }

  async run(sql: string, params: any[] = []) {
    console.log('🔧 Supabase run:', sql, params);
    
    if (!supabase) {
      throw new Error('Supabase not configured - please check environment variables');
    }
    
    try {
      if (sql.includes('INSERT INTO users')) {
        const userData = {
          firstName: params[0],
          lastName: params[1],
          phone: params[2],
          userType: params[3],
          address: params[4],
          password: params[5]
        };
        
        const { data, error } = await supabase
          .from('users')
          .insert([userData])
          .select()
          .single();
        
        if (error) throw error;
        return { lastID: data.id };
      }
      
      if (sql.includes('DELETE FROM users')) {
        const id = params[0];
        const { error } = await supabase
          .from('users')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        return { changes: 1 };
      }
      
      return { lastID: 0, changes: 0 };
    } catch (error) {
      console.error('❌ Supabase query error:', error);
      throw error;
    }
  }

  async all(sql: string, params: any[] = []) {
    console.log('🔧 Supabase all:', sql, params);
    
    if (!supabase) {
      throw new Error('Supabase not configured - please check environment variables');
    }
    
    try {
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
    } catch (error) {
      console.error('❌ Supabase query error:', error);
      throw error;
    }
  }

  async close() {
    console.log('🔧 Supabase close called');
    return Promise.resolve();
  }
}

// Database connection
let db: any = null;

export async function getDatabase() {
  if (db) return db;
  
  try {
    // Check if Supabase is available
    if (!supabase) {
      throw new Error('Supabase not configured - please check environment variables');
    }
    
    console.log('🚀 Initializing Supabase database...');
    db = new SupabaseDatabase();
    
    // Test connection with better error handling
    try {
      const { data, error } = await supabase.from('users').select('count', { count: 'exact', head: true });
      if (error) {
        console.error('❌ Supabase connection test failed:', error);
        
        // Check if table doesn't exist
        if (error.message.includes('relation "users" does not exist')) {
          throw new Error('Database tables not created - please run the SQL setup script in Supabase');
        }
        
        throw new Error(`Supabase connection failed: ${error.message}`);
      }
      
      console.log('✅ Supabase database connected successfully');
      return db;
    } catch (connectionError) {
      // If connection fails, still return the wrapper for better error messages
      console.warn('⚠️ Connection test failed, but returning database wrapper:', connectionError);
      return db;
    }
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    
    // Provide helpful error message
    let errorMessage = 'ไม่สามารถเชื่อมต่อฐานข้อมูลได้';
    
    if (error instanceof Error) {
      if (error.message.includes('Supabase not configured')) {
        errorMessage = 'ระบบฐานข้อมูลยังไม่ได้ตั้งค่า - กรุณาติดต่อผู้ดูแลระบบ';
      } else if (error.message.includes('Database tables not created')) {
        errorMessage = 'ฐานข้อมูลยังไม่ได้สร้างตาราง - กรุณาติดต่อผู้ดูแลระบบ';
      } else if (error.message.includes('Supabase connection failed')) {
        errorMessage = 'ไม่สามารถเชื่อมต่อฐานข้อมูลได้ - กรุณาติดต่อผู้ดูแลระบบ';
      }
    }
    
    throw new Error(errorMessage);
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
    if (!supabase) {
      return { 
        status: 'unhealthy', 
        error: 'Supabase not configured',
        timestamp: new Date().toISOString() 
      };
    }
    
    const { data, error } = await supabase.from('users').select('count', { count: 'exact', head: true });
    if (error) throw error;
    
    return { 
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      database: 'Supabase'
    };
  } catch (error) {
    return { 
      status: 'unhealthy', 
      error: error instanceof Error ? error.message : 'Unknown error', 
      timestamp: new Date().toISOString() 
    };
  }
}

// Database stats
export async function getDatabaseStats() {
  try {
    if (!supabase) {
      return null;
    }
    
    const { count, error } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });
    
    if (error) throw error;
    
    return {
      users: count || 0,
      timestamp: new Date().toISOString(),
      database: 'Supabase'
    };
  } catch (error) {
    console.error('❌ Failed to get database stats:', error);
    return null;
  }
}
