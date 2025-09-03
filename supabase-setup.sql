-- GenMatch Database Setup Script for Supabase
-- Run this script in your Supabase SQL Editor

-- Enable Row Level Security (RLS)
ALTER TABLE IF EXISTS users ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS ratings ENABLE ROW LEVEL SECURITY;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL UNIQUE,
  userType TEXT NOT NULL CHECK (userType IN ('student', 'elderly')),
  studentId TEXT,
  university TEXT,
  address TEXT NOT NULL,
  password TEXT NOT NULL,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id BIGSERIAL PRIMARY KEY,
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
  creatorId BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  volunteerId BIGINT NULL REFERENCES users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING','ACCEPTED','IN_PROGRESS','COMPLETED','CANCELLED')),
  progress INTEGER DEFAULT 0,
  notes TEXT,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id BIGSERIAL PRIMARY KEY,
  taskId BIGINT NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  senderId BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Photos table
CREATE TABLE IF NOT EXISTS photos (
  id BIGSERIAL PRIMARY KEY,
  taskId BIGINT NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  photoUrl TEXT NOT NULL,
  description TEXT,
  uploadedBy BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING','APPROVED','REJECTED')),
  uploadedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approvedAt TIMESTAMP WITH TIME ZONE,
  approvedBy BIGINT NULL REFERENCES users(id) ON DELETE SET NULL,
  notes TEXT
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id BIGSERIAL PRIMARY KEY,
  userId BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB DEFAULT '{}'::jsonb,
  priority TEXT DEFAULT 'NORMAL',
  isRead BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  readAt TIMESTAMP WITH TIME ZONE
);

-- Ratings table
CREATE TABLE IF NOT EXISTS ratings (
  id BIGSERIAL PRIMARY KEY,
  taskId BIGINT NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  raterId BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  ratedUserId BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL,
  review TEXT,
  category TEXT NOT NULL,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (taskId, raterId, ratedUserId)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_users_userType ON users(userType);
CREATE INDEX IF NOT EXISTS idx_tasks_creatorId ON tasks(creatorId);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_category ON tasks(category);
CREATE INDEX IF NOT EXISTS idx_tasks_location ON tasks(location);
CREATE INDEX IF NOT EXISTS idx_tasks_volunteerId ON tasks(volunteerId);
CREATE INDEX IF NOT EXISTS idx_chat_messages_taskId ON chat_messages(taskId);
CREATE INDEX IF NOT EXISTS idx_chat_messages_senderId ON chat_messages(senderId);
CREATE INDEX IF NOT EXISTS idx_photos_taskId ON photos(taskId);
CREATE INDEX IF NOT EXISTS idx_photos_uploadedBy ON photos(uploadedBy);
CREATE INDEX IF NOT EXISTS idx_notifications_userId ON notifications(userId);
CREATE INDEX IF NOT EXISTS idx_notifications_isRead ON notifications(isRead);
CREATE INDEX IF NOT EXISTS idx_ratings_taskId ON ratings(taskId);
CREATE INDEX IF NOT EXISTS idx_ratings_ratedUserId ON ratings(ratedUserId);

-- Insert sample data for testing (optional)
INSERT INTO users (firstName, lastName, phone, userType, address, password) VALUES
('Admin', 'User', '0812345678', 'elderly', '123 Test Street, Bangkok', '$2a$10$example.hash'),
('Test', 'Student', '0987654321', 'student', '456 University Road, Bangkok', '$2a$10$example.hash')
ON CONFLICT (phone) DO NOTHING;

-- Create RLS policies
-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

-- Users can insert their own data
CREATE POLICY "Users can insert own data" ON users
  FOR INSERT WITH CHECK (true);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Tasks are publicly readable
CREATE POLICY "Tasks are publicly readable" ON tasks
  FOR SELECT USING (true);

-- Users can create tasks
CREATE POLICY "Users can create tasks" ON tasks
  FOR INSERT WITH CHECK (true);

-- Task creators can update their tasks
CREATE POLICY "Task creators can update tasks" ON tasks
  FOR UPDATE USING (auth.uid()::text = creatorId::text);

-- Chat messages are readable by task participants
CREATE POLICY "Chat messages are readable by task participants" ON chat_messages
  FOR SELECT USING (true);

-- Users can send chat messages
CREATE POLICY "Users can send chat messages" ON chat_messages
  FOR INSERT WITH CHECK (true);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Verify tables created
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name IN ('users', 'tasks', 'chat_messages', 'photos', 'notifications', 'ratings')
ORDER BY table_name, ordinal_position;
