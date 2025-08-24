# GenMatch Platform

แพลตฟอร์มจิตอาสาที่เชื่อมโยงผู้สูงอายุกับนักศึกษา สร้างสังคมที่มีน้ำใจและช่วยเหลือกัน

## 🚀 Features

- **User Management**: ระบบสมัครสมาชิกและเข้าสู่ระบบ
- **Task Management**: สร้าง ค้นหา ยอมรับ และเสร็จสิ้นงานจิตอาสา
- **Chat System**: ระบบแชทสำหรับประสานงาน
- **Responsive Design**: ใช้งานได้ทั้งบนมือถือและคอมพิวเตอร์

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT, bcryptjs
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- npm หรือ yarn
- Supabase account (free tier)

## 🔧 Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/CEO-LEO/genmatch-platform-v3.git
cd genmatch-platform-v3
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Supabase Database

#### A. สร้าง Supabase Project
1. ไปที่ [supabase.com](https://supabase.com)
2. สร้าง account และ project ใหม่
3. ไปที่ Settings > API
4. คัดลอก URL และ anon key

#### B. สร้าง Database Tables
```sql
-- Users table
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL UNIQUE,
  userType TEXT NOT NULL,
  studentId TEXT,
  university TEXT,
  address TEXT NOT NULL,
  password TEXT NOT NULL,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks table
CREATE TABLE tasks (
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
  creatorId BIGINT NOT NULL REFERENCES users(id),
  status TEXT DEFAULT 'PENDING',
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat messages table
CREATE TABLE chat_messages (
  id BIGSERIAL PRIMARY KEY,
  taskId BIGINT NOT NULL REFERENCES tasks(id),
  senderId BIGINT NOT NULL REFERENCES users(id),
  message TEXT NOT NULL,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. Environment Variables
สร้างไฟล์ `.env.local` ใน root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-2024

# Environment
NODE_ENV=development
```

### 5. Run Development Server
```bash
npm run dev
```

เปิดเบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

## 🌐 Production Deployment

### Vercel (Recommended)
1. Push code ไป GitHub
2. เชื่อมต่อ Vercel กับ GitHub repository
3. ตั้งค่า Environment Variables ใน Vercel
4. Deploy อัตโนมัติ

### Environment Variables ใน Vercel
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET`

## 📱 API Endpoints

### Authentication
- `POST /api/register` - สมัครสมาชิก
- `POST /api/login` - เข้าสู่ระบบ

### Tasks
- `GET /api/tasks` - ค้นหางาน
- `POST /api/tasks` - สร้างงานใหม่
- `POST /api/tasks/[id]/accept` - ยอมรับงาน
- `POST /api/tasks/[id]/complete` - เสร็จสิ้นงาน

### Chat
- `GET /api/chat` - ดึงข้อความแชท
- `POST /api/chat` - ส่งข้อความ

### Testing
- `POST /api/test-register` - ทดสอบระบบสมัครสมาชิก
- `POST /api/test-login` - ทดสอบระบบเข้าสู่ระบบ

## 🧪 Testing

### Test Database Connection
```bash
curl -X POST http://localhost:3000/api/test-register \
  -H "Content-Type: application/json" \
  -d '{"testType": "checkTable"}'
```

### Test Registration
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "phone": "0812345678",
    "userType": "elderly",
    "address": "Test Address",
    "password": "123456",
    "confirmPassword": "123456"
  }'
```

## 🔒 Security Features

- **Password Hashing**: ใช้ bcryptjs
- **JWT Authentication**: Token-based authentication
- **Input Validation**: Server-side validation
- **SQL Injection Protection**: Parameterized queries

## 📊 Database Schema

### Users Table
- `id`: Primary key (auto-increment)
- `firstName`: ชื่อ
- `lastName`: นามสกุล
- `email`: อีเมล (optional สำหรับผู้สูงอายุ)
- `phone`: เบอร์โทรศัพท์ (unique)
- `userType`: ประเภทผู้ใช้ (student/elderly)
- `studentId`: รหัสนักศึกษา (optional)
- `university`: มหาวิทยาลัย (optional)
- `address`: ที่อยู่
- `password`: รหัสผ่าน (hashed)
- `createdAt`: วันที่สร้าง

### Tasks Table
- `id`: Primary key
- `title`: ชื่องาน
- `description`: รายละเอียด
- `category`: หมวดหมู่
- `location`: สถานที่
- `date`: วันที่
- `startTime`: เวลาเริ่ม
- `endTime`: เวลาสิ้นสุด
- `maxVolunteers`: จำนวนอาสาสมัครสูงสุด
- `requirements`: ข้อกำหนด
- `tags`: แท็ก
- `contactName`: ชื่อผู้ติดต่อ
- `contactPhone`: เบอร์โทรผู้ติดต่อ
- `contactEmail`: อีเมลผู้ติดต่อ
- `creatorId`: ID ผู้สร้างงาน
- `status`: สถานะ (PENDING/ACCEPTED/COMPLETED)
- `createdAt`: วันที่สร้าง

## 🎨 UI/UX Design

- **Color Scheme**: สีม่วงและน้ำเงินเป็นหลัก
- **Typography**: ตัวอักษรที่อ่านง่าย
- **Responsive**: ปรับขนาดตามอุปกรณ์
- **Modern**: ดีไซน์ที่ทันสมัยและใช้งานง่าย

## 🚀 Performance

- **Server-Side Rendering**: Next.js SSR
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic code splitting
- **Caching**: Built-in caching mechanisms

## 🔧 Development

### Code Structure
```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   ├── login/          # Login page
│   ├── register/       # Registration page
│   ├── search/         # Task search page
│   ├── add-task/       # Add task page
│   └── test-system/    # System testing page
├── lib/                # Utility functions
│   └── database.ts     # Database configuration
└── components/         # Reusable components
```

### Available Scripts
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - ESLint checking

## 🤝 Contributing

1. Fork repository
2. สร้าง feature branch
3. Commit changes
4. Push to branch
5. สร้าง Pull Request

## 📄 License

MIT License - ดูรายละเอียดใน [LICENSE](LICENSE) file

## 📞 Support

- **Email**: support@genmatch.com
- **GitHub Issues**: [Create Issue](https://github.com/CEO-LEO/genmatch-platform-v3/issues)

## 🎯 Roadmap

- [ ] User profile management
- [ ] Task categories and filtering
- [ ] Rating and review system
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Advanced search algorithms
- [ ] Real-time notifications
- [ ] Payment integration

---

**GenMatch** - สร้างสังคมที่มีน้ำใจด้วยเทคโนโลยี 🚀❤️
