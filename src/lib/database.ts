// Database configuration and utilities for GenMatch Platform

// Global mock database storage for demo mode
declare global {
  var mockUsers: Map<string, any>;
  var mockPhotos: Map<number, any>;
  var mockRatings: Map<number, any>;
  var mockNotifications: Map<number, any>;
  var mockChatMessages: Array<any>;
  var mockTasks: Map<number, any>;
  var mockNextId: number;
  var mockNextPhotoId: number;
  var mockNextRatingId: number;
  var mockNextNotificationId: number;
  var mockNextChatMessageId: number;
  var mockNextTaskId: number;
}

// Initialize global variables if they don't exist
if (!global.mockUsers) {
  global.mockUsers = new Map();
  global.mockNextId = 2;
}
if (!global.mockPhotos) {
  global.mockPhotos = new Map();
  global.mockNextPhotoId = 1;
}
if (!global.mockRatings) {
  global.mockRatings = new Map();
  global.mockNextRatingId = 1;
}
if (!global.mockNotifications) {
  global.mockNotifications = new Map();
  global.mockNextNotificationId = 1;
}
if (!global.mockChatMessages) {
  global.mockChatMessages = [];
  global.mockNextChatMessageId = 1;
}
if (!global.mockTasks) {
  global.mockTasks = new Map();
  global.mockNextTaskId = 1;
}

// Check if we should use real database
const USE_REAL_DATABASE = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY;

// Mock database wrapper for demo mode
class MockDatabase {
  constructor() {
    // Initialize with all demo users if not already present
    this.initializeDemoUsers();
    this.initializeDemoChats();
    this.initializeDemoTasks();
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

  initializeDemoChats() {
    // Seed a few demo chat messages bound to taskId 1
    if (global.mockChatMessages.length === 0) {
      const now = new Date();
      const fmt = (d: Date) => d.toISOString();
      global.mockChatMessages.push(
        { id: global.mockNextChatMessageId++, taskId: 1, senderId: 1, message: 'สวัสดีครับ ผมพร้อมช่วยเหลือแล้ว', createdAt: fmt(new Date(now.getTime() - 1000 * 60 * 10)) },
        { id: global.mockNextChatMessageId++, taskId: 1, senderId: 4, message: 'ขอบคุณมากครับ ตอนนี้เราอยู่ที่ไหนกันครับ?', createdAt: fmt(new Date(now.getTime() - 1000 * 60 * 9)) },
        { id: global.mockNextChatMessageId++, taskId: 1, senderId: 1, message: 'เรานัดกันที่สวนสุขภาพลุมพินีครับ ตรงไหนดีครับ?', createdAt: fmt(new Date(now.getTime() - 1000 * 60 * 8)) }
      );
    }
  }

  initializeDemoTasks() {
    if (global.mockTasks.size === 0) {
      const seedTasks = [
        {
          id: global.mockNextTaskId++,
          title: 'ช่วยพาออกกำลังกาย',
          description: 'ต้องการจิตอาสาช่วยพาผู้สูงอายุออกกำลังกายที่สวนสุขภาพ',
          location: 'สวนสุขภาพ เขตบางนา',
          date: '2024-08-25',
          startTime: '15:00',
          endTime: '17:00',
          category: 'exercise',
          creatorId: 4,
          status: 'PENDING',
          volunteers: [1, 2],
          maxVolunteers: 2,
          requirements: 'มีความอดทนและใจเย็น',
          tags: 'ออกกำลังกาย,ผู้สูงอายุ',
          contactName: 'คุณยาย',
          contactPhone: '0845678901',
          contactEmail: 'grandma@demo.com',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          progress: 0,
          notes: ''
        },
        {
          id: global.mockNextTaskId++,
          title: 'ช่วยซ่อมแซมบ้าน',
          description: 'ต้องการจิตอาสาช่วยซ่อมแซมหลังคาบ้านที่รั่ว',
          location: 'บ้านเลขที่ 123 ถนนสุขุมวิท',
          date: '2024-08-26',
          startTime: '09:00',
          endTime: '12:00',
          category: 'repair',
          creatorId: 4,
          status: 'PENDING',
          volunteers: [],
          maxVolunteers: 3,
          requirements: 'มีประสบการณ์งานช่าง',
          tags: 'ซ่อมแซม,บ้าน',
          contactName: 'คุณยาย',
          contactPhone: '0845678901',
          contactEmail: 'grandma@demo.com',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          progress: 0,
          notes: ''
        }
      ];
      seedTasks.forEach(t => global.mockTasks.set(t.id, t));
    }
  }

  initializeDemoPhotos() {
    // Mock photos for demo
    const mockPhotos = [
      {
        id: 1,
        taskId: 1,
        photoUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        description: 'ช่วยพาออกกำลังกายที่สวนสุขภาพ กำลังเดินออกกำลังกาย',
        uploadedBy: 1,
        status: 'PENDING',
        uploadedAt: '2024-08-25T15:30:00Z',
        approvedAt: null,
        approvedBy: null,
        notes: ''
      },
      {
        id: 2,
        taskId: 1,
        photoUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        description: 'ช่วยพาออกกำลังกายที่สวนสุขภาพ กำลังทำท่ากายบริหาร',
        uploadedBy: 2,
        status: 'APPROVED',
        uploadedAt: '2024-08-25T15:45:00Z',
        approvedAt: '2024-08-25T16:00:00Z',
        approvedBy: 4,
        notes: 'รูปภาพชัดเจน แสดงการทำงานจริง'
      },
      {
        id: 3,
        taskId: 1,
        photoUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        description: 'ช่วยพาออกกำลังกายที่สวนสุขภาพ กำลังยืดกล้ามเนื้อ',
        uploadedBy: 1,
        status: 'REJECTED',
        uploadedAt: '2024-08-25T16:00:00Z',
        approvedAt: null,
        approvedBy: null,
        notes: 'รูปภาพไม่ชัดเจน ไม่เห็นการทำงานจริง'
      }
    ];

    mockPhotos.forEach(photo => {
      global.mockPhotos.set(photo.id, photo);
    });

    global.mockNextPhotoId = Math.max(...mockPhotos.map(p => p.id)) + 1;
    console.log('📸 Mock Database: Initialized', mockPhotos.length, 'photos');
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
    
    // Handle photos queries
    if (sql.includes('photos') && sql.includes('id')) {
      const photoId = params[0];
      const photo = global.mockPhotos.get(photoId);
      if (photo) {
        // Join with user information
        const photoWithUser = {
          ...photo,
          firstName: global.mockUsers.get(Array.from(global.mockUsers.values()).find(u => u.id === photo.uploadedBy)?.phone)?.firstName || 'Unknown',
          lastName: global.mockUsers.get(Array.from(global.mockUsers.values()).find(u => u.id === photo.uploadedBy)?.phone)?.lastName || 'User',
          uploaderPhone: global.mockUsers.get(Array.from(global.mockUsers.values()).find(u => u.id === photo.uploadedBy)?.phone)?.phone || 'Unknown',
          approverFirstName: photo.approvedBy ? global.mockUsers.get(Array.from(global.mockUsers.values()).find(u => u.id === photo.approvedBy)?.phone)?.firstName || 'Unknown' : null,
          approverLastName: photo.approvedBy ? global.mockUsers.get(Array.from(global.mockUsers.values()).find(u => u.id === photo.approvedBy)?.phone)?.lastName || 'User' : null
        };
        console.log('✅ Mock Database: Found photo:', photoId);
        return photoWithUser;
      }
      console.log('❌ Mock Database: Photo not found for ID:', photoId);
      return null;
    }
    
    return null;
  }

  async run(sql: string, params: any[] = []) {
    console.log('🔧 Mock Database run:', sql, params);
    
    // Handle UPDATE users
    if (sql.includes('UPDATE users')) {
      // We expect a set of fields and an id at the end
      const id = params[params.length - 1];
      const userId = typeof id === 'string' ? parseInt(id, 10) : id;
      const usersArray = Array.from(global.mockUsers.values());
      const entry = usersArray.find(u => u.id === userId);
      if (!entry) return { changes: 0 };
      const indexPhone = Array.from(global.mockUsers.keys()).find(phone => global.mockUsers.get(phone)?.id === userId);
      if (!indexPhone) return { changes: 0 };
      const updated = { ...entry } as any;
      // best-effort: map common fields from params order if used in route; also accept object case via sql builder not available here
      // We will rely on route building explicit params in fixed order
      const fieldsOrder = ['firstName','lastName','email','phone','address','userType'];
      for (let i = 0; i < Math.min(fieldsOrder.length, params.length - 1); i++) {
        const value = params[i];
        const key = fieldsOrder[i] as string;
        if (key && value !== undefined && value !== null) {
          (updated as any)[key] = value;
        }
      }
      const phoneKey: string = indexPhone as string;
      global.mockUsers.set(phoneKey, updated);
      return { changes: 1 };
    }

    // Handle INSERT INTO tasks
    if (sql.includes('INSERT INTO tasks')) {
      const [
        title, description, category, location, date, startTime, endTime,
        maxVolunteers, requirements, tags, contactName, contactPhone,
        contactEmail, creatorId
      ] = params;

      const newTask = {
        id: global.mockNextTaskId++,
        title: title?.toString() ?? '',
        description: description?.toString() ?? '',
        category: category?.toString() ?? '',
        location: location?.toString() ?? '',
        date: date?.toString() ?? '',
        startTime: startTime?.toString() ?? '',
        endTime: endTime?.toString() ?? '',
        maxVolunteers: Number(maxVolunteers) || 1,
        requirements: requirements?.toString() ?? '',
        tags: tags?.toString() ?? '',
        contactName: contactName?.toString() ?? '',
        contactPhone: contactPhone?.toString() ?? '',
        contactEmail: contactEmail?.toString() ?? '',
        creatorId: typeof creatorId === 'string' ? parseInt(creatorId, 10) : creatorId,
        status: 'PENDING',
        volunteers: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        progress: 0,
        notes: ''
      };
      global.mockTasks.set(newTask.id, newTask);
      console.log('📝 Mock Database: Task stored:', newTask.id, newTask.title);
      return { lastID: newTask.id };
    }

    // Handle UPDATE tasks
    if (sql.includes('UPDATE tasks') && sql.includes('SET status')) {
      const [status, progress, notes, id] = params;
      const taskId = typeof id === 'string' ? parseInt(id, 10) : id;
      if (global.mockTasks.has(taskId)) {
        const task = global.mockTasks.get(taskId);
        task.status = status;
        task.progress = Number(progress) || 0;
        task.notes = notes?.toString() ?? '';
        task.updatedAt = new Date().toISOString();
        global.mockTasks.set(taskId, task);
        return { changes: 1 };
      }
      return { changes: 0 };
    }

    // Handle INSERT INTO chat_messages
    if (sql.includes('INSERT INTO chat_messages')) {
      const [taskId, senderId, message] = params;
      const newMessage = {
        id: global.mockNextChatMessageId++,
        taskId: typeof taskId === 'string' ? parseInt(taskId, 10) : taskId,
        senderId: typeof senderId === 'string' ? parseInt(senderId, 10) : senderId,
        message: message?.toString() ?? '',
        createdAt: new Date().toISOString()
      };
      global.mockChatMessages.push(newMessage);
      console.log('💬 Mock Database: Chat message stored:', newMessage);
      return { lastID: newMessage.id };
    }

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
    
    // Handle INSERT INTO photos
    if (sql.includes('INSERT INTO photos')) {
      const [taskId, photoUrl, description, uploadedBy, status] = params;
      
      const newPhoto = {
        id: global.mockNextPhotoId++,
        taskId: typeof taskId === 'string' ? parseInt(taskId, 10) : taskId,
        photoUrl,
        description,
        uploadedBy: typeof uploadedBy === 'string' ? parseInt(uploadedBy, 10) : uploadedBy,
        status: status || 'PENDING',
        uploadedAt: new Date().toISOString(),
        approvedAt: null,
        approvedBy: null,
        notes: ''
      };
      
      global.mockPhotos.set(newPhoto.id, newPhoto);
      console.log('✅ Mock Database: Photo stored with ID:', newPhoto.id);
      console.log('📸 Total photos in database:', global.mockPhotos.size);
      
      return { lastID: newPhoto.id };
    }
    
    // Handle UPDATE photos
    if (sql.includes('UPDATE photos')) {
      const photoId = params[params.length - 1]; // Last parameter is usually the ID
      
      if (global.mockPhotos.has(photoId)) {
        const photo = global.mockPhotos.get(photoId);
        
        if (params[0] === 'APPROVED') {
          photo.status = 'APPROVED';
          photo.approvedAt = new Date().toISOString();
          photo.approvedBy = params[1];
          photo.notes = params[2] || '';
        } else if (params[0] === 'REJECTED') {
          photo.status = 'REJECTED';
          photo.notes = params[1] || '';
        } else if (params[0] === 'PENDING') {
          photo.status = 'PENDING';
          photo.approvedAt = null;
          photo.approvedBy = null;
          photo.notes = params[1] || '';
        }
        
        global.mockPhotos.set(photoId, photo);
        console.log('✅ Mock Database: Photo updated:', photoId, 'Status:', photo.status);
        return { changes: 1 };
      }
      
      return { changes: 0 };
    }
    
    return { lastID: 0, changes: 0 };
  }

  async all(sql: string, params: any[] = []) {
    console.log('🔧 Mock Database all:', sql, params);
    
    // Handle tasks list queries with optional filters
    if (sql.includes('FROM tasks t')) {
      let list = Array.from(global.mockTasks.values());
      // params correspond to filters built in route: category, location (LIKE), search (title/description/tags)
      // We can't rely on exact order; we'll infer by checking placeholders in sql string order used in route
      const conditions: any = {};
      if (sql.includes('t.category = ?')) {
        conditions.category = params.shift();
      }
      if (sql.includes('t.location LIKE ?')) {
        conditions.location = params.shift();
      }
      if (sql.includes('(t.title LIKE ? OR t.description LIKE ? OR t.tags LIKE ?)')) {
        const term = params.shift();
        // skip two more same terms if present due to push
        params.shift();
        params.shift();
        conditions.search = term;
      }
      if (conditions.category) {
        list = list.filter(t => t.category === conditions.category);
      }
      if (conditions.location) {
        const like = String(conditions.location).replace(/%/g, '').toLowerCase();
        list = list.filter(t => (t.location || '').toLowerCase().includes(like));
      }
      if (conditions.search) {
        const like = String(conditions.search).replace(/%/g, '').toLowerCase();
        list = list.filter(t => (t.title + ' ' + t.description + ' ' + (t.tags||'')).toLowerCase().includes(like));
      }
      // join with users minimal fields
      const rows = list
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map(t => {
          const user = Array.from(global.mockUsers.values()).find(u => u.id === t.creatorId);
          return { ...t, firstName: user?.firstName ?? '', lastName: user?.lastName ?? '', creatorPhone: user?.phone ?? '' };
        });
      return rows;
    }

    // Handle chat messages list by taskId
    if (sql.includes('FROM chat_messages')) {
      const taskId = params[0];
      const targetTaskId = typeof taskId === 'string' ? parseInt(taskId, 10) : taskId;
      const rows = global.mockChatMessages
        .filter(m => m.taskId == targetTaskId)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .map(m => {
          const user = Array.from(global.mockUsers.values()).find(u => u.id === m.senderId);
          return {
            id: m.id,
            taskId: m.taskId,
            senderId: m.senderId,
            message: m.message,
            createdAt: m.createdAt,
            firstName: user?.firstName ?? 'Unknown',
            lastName: user?.lastName ?? 'User',
            userType: user?.userType ?? 'STUDENT'
          };
        });
      return rows;
    }

    // Handle photos queries
    if (sql.includes('photos') && sql.includes('taskId')) {
      const taskId = params[0];
      const targetTaskId = typeof taskId === 'string' ? parseInt(taskId, 10) : taskId;
      const photos = Array.from(global.mockPhotos.values()).filter(p => p.taskId == targetTaskId);
      
      // Join with user information
      const photosWithUsers = photos.map(photo => ({
        ...photo,
        firstName: global.mockUsers.get(Array.from(global.mockUsers.values()).find(u => u.id === photo.uploadedBy)?.phone)?.firstName || 'Unknown',
        lastName: global.mockUsers.get(Array.from(global.mockUsers.values()).find(u => u.id === photo.uploadedBy)?.phone)?.lastName || 'User',
        uploaderPhone: global.mockUsers.get(Array.from(global.mockUsers.values()).find(u => u.id === photo.uploadedBy)?.phone)?.phone || 'Unknown',
        approverFirstName: photo.approvedBy ? global.mockUsers.get(Array.from(global.mockUsers.values()).find(u => u.id === photo.approvedBy)?.phone)?.firstName || 'Unknown' : null,
        approverLastName: photo.approvedBy ? global.mockUsers.get(Array.from(global.mockUsers.values()).find(u => u.id === photo.approvedBy)?.phone)?.lastName || 'User' : null
      }));
      
      return photosWithUsers;
    }
    
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
    photos: global.mockPhotos.size,
    timestamp: new Date().toISOString(),
    database: 'Mock Database (Demo Mode)',
    userList: Array.from(global.mockUsers.values()).map(u => ({ id: u.id, firstName: u.firstName, phone: u.phone })),
    photoList: Array.from(global.mockPhotos.values()).map(p => ({ id: p.id, taskId: p.taskId, status: p.status, uploadedBy: p.uploadedBy }))
  };
}

// Export mockDatabase for API routes
export const mockDatabase = {
  get: (key: string) => {
    switch (key) {
      case 'users':
        return Array.from(global.mockUsers.values());
      case 'tasks':
        return [
          {
            id: 1,
            title: 'ช่วยพาออกกำลังกาย',
            description: 'ต้องการจิตอาสาช่วยพาผู้สูงอายุออกกำลังกายที่สวนสุขภาพ',
            location: 'สวนสุขภาพ เขตบางนา',
            date: '2024-08-25',
            time: '15:00-17:00',
            category: 'exercise',
            creatorId: 4,
            status: 'active',
            volunteers: [1, 2],
            maxVolunteers: 2,
            requirements: 'มีความอดทนและใจเย็น',
            createdAt: '2024-08-20T10:00:00Z',
            updatedAt: '2024-08-25T14:00:00Z'
          },
          {
            id: 2,
            title: 'ช่วยซ่อมแซมบ้าน',
            description: 'ต้องการจิตอาสาช่วยซ่อมแซมหลังคาบ้านที่รั่ว',
            location: 'บ้านเลขที่ 123 ถนนสุขุมวิท',
            date: '2024-08-26',
            time: '09:00-12:00',
            category: 'repair',
            creatorId: 4,
            status: 'active',
            volunteers: [],
            maxVolunteers: 3,
            requirements: 'มีประสบการณ์งานช่าง',
            createdAt: '2024-08-21T08:00:00Z',
            updatedAt: '2024-08-21T08:00:00Z'
          },
          {
            id: 3,
            title: 'ช่วงงานบุญที่วัด',
            description: 'ต้องการจิตอาสาช่วยจัดงานบุญประจำปีที่วัด',
            location: 'วัดพระแก้ว',
            date: '2024-08-27',
            time: '06:00-18:00',
            category: 'temple',
            creatorId: 4,
            status: 'completed',
            volunteers: [1, 2, 3],
            maxVolunteers: 5,
            requirements: 'มีจิตอาสาและความเสียสละ',
            createdAt: '2024-08-15T06:00:00Z',
            updatedAt: '2024-08-27T18:00:00Z'
          }
        ];
      case 'photos':
        return Array.from(global.mockPhotos.values());
      case 'notifications':
        return [
          {
            id: 1,
            userId: 1,
            type: 'task_completed',
            title: 'งานเสร็จสิ้น',
            message: 'งาน "ช่วยพาออกกำลังกาย" เสร็จสิ้นแล้ว',
            read: false,
            createdAt: '2024-08-25T17:00:00Z'
          },
          {
            id: 2,
            userId: 2,
            type: 'photo_approved',
            title: 'รูปถ่ายได้รับการอนุมัติ',
            message: 'รูปถ่ายการทำงานได้รับการอนุมัติแล้ว',
            read: false,
            createdAt: '2024-08-25T16:30:00Z'
          },
          {
            id: 3,
            userId: 4,
            type: 'volunteer_joined',
            title: 'มีจิตอาสาเข้าร่วม',
            message: 'มีจิตอาสา 2 คนเข้าร่วมงาน "ช่วยพาออกกำลังกาย"',
            read: true,
            createdAt: '2024-08-25T14:00:00Z'
          }
        ];
      default:
        return [];
    }
  }
};

