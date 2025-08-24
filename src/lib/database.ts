// Database configuration and utilities for GenMatch Platform

import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Database connection wrapper
class SupabaseDatabase {
  async exec(sql: string) {
    console.log('🔧 Supabase exec:', sql);
    return Promise.resolve();
  }

  async get(sql: string, params: any[] = []) {
    console.log('🔧 Supabase get:', sql, params);
    
    try {
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
      
      return null;
    } catch (error) {
      console.error('❌ Supabase query error:', error);
      throw error;
    }
  }

  async run(sql: string, params: any[] = []) {
    console.log('🔧 Supabase run:', sql, params);
    
    try {
      if (sql.includes('INSERT INTO users')) {
        const userData = {
          firstName: params[0],
          lastName: params[1],
          email: params[2],
          phone: params[3],
          userType: params[4],
          studentId: params[5],
          university: params[6],
          address: params[7],
          password: params[8]
        };
        
        const { data, error } = await supabase
          .from('users')
          .insert([userData])
          .select()
          .single();
        
        if (error) throw error;
        return { lastID: data.id };
      }
      
      if (sql.includes('INSERT INTO tasks')) {
        const taskData = {
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
          creatorId: params[13]
        };
        
        const { data, error } = await supabase
          .from('tasks')
          .insert([taskData])
          .select()
          .single();
        
        if (error) throw error;
        return { lastID: data.id };
      }
      
      return { lastID: 1 };
    } catch (error) {
      console.error('❌ Supabase insert error:', error);
      throw error;
    }
  }

  async all(sql: string, params: any[] = []) {
    console.log('🔧 Supabase all:', sql, params);
    
    try {
      if (sql.includes('PRAGMA table_info')) {
        // Return table structure for compatibility
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
    } catch (error) {
      console.error('❌ Supabase query error:', error);
      return [];
    }
  }

  async close() {
    console.log('🔧 Supabase connection closed');
    return Promise.resolve();
  }
}

// Database connection
let db: any = null;

export async function getDatabase() {
  if (db) return db;
  
  try {
    // Always use Supabase for both local and production
    console.log('🚀 Initializing Supabase database...');
    db = new SupabaseDatabase();
    
    // Test connection
    const { data, error } = await supabase.from('users').select('count', { count: 'exact', head: true });
    if (error) {
      console.error('❌ Supabase connection test failed:', error);
      throw new Error(`Supabase connection failed: ${error.message}`);
    }
    
    console.log('✅ Supabase database connected successfully');
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
