# 🚀 GenMatch Platform

**GenMatch** เป็นแพลตฟอร์มเชื่อมโยงระหว่าง **นักศึกษา** และ **ผู้สูงอายุ** เพื่อการเป็นจิตอาสา โดยนักศึกษาจะได้รับ **ชั่วโมงจิตอาสา** เพื่อนำไปใช้ในการกู้กยศ. และการสมัครงาน แพลตฟอร์มนี้ไม่มีการเก็บเงินหรือค่าธรรมเนียมใดๆ ทั้งสิ้น เป็นการให้บริการเพื่อสังคมอย่างแท้จริง

## ✨ Features

### 🎯 Core Features
- **Task Management**: Create, search, and manage volunteer tasks
- **User Authentication**: Secure login/register system for students and elderly
- **Real-time Chat**: Communication between users
- **Rating System**: Review and rating system for completed tasks
- **Achievement System**: Gamification with badges and points
- **Notifications**: Real-time updates and alerts

### 📱 Task Categories
1. **🏥 Hospital** - Health checkups, medication pickup
2. **🏛️ Temple** - Religious activities, temple visits
3. **⚡ Exercise** - Walking, physical activities
4. **🔧 Repair** - Home maintenance, repairs

### 👥 User Types
- **👨‍🎓 Students**: Accept tasks, earn volunteer hours
- **👴 Elderly**: Post tasks, receive assistance

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Glassmorphism effects
- **Icons**: Lucide React
- **Database**: Prisma ORM, SQLite
- **Authentication**: JWT, Firebase Auth
- **Real-time**: Firebase Firestore
- **Storage**: Firebase Storage
- **Notifications**: Firebase Cloud Messaging

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd genmatch
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp env.example .env.local
```
Edit `.env.local` with your configuration:
```env
# Database
DATABASE_URL="file:./dev.db"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-here"

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="your-firebase-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="123456789"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_FIREBASE_VAPID_KEY="your-vapid-key"
```

4. **Set up the database**
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed
```

5. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
genmatch/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── dashboard/         # Dashboard page
│   │   ├── search/           # Task search page
│   │   ├── my-tasks/         # User's tasks page
│   │   ├── chat/             # Chat interface
│   │   ├── profile/          # User profile page
│   │   ├── notifications/    # Notifications page
│   │   ├── statistics/       # Statistics page
│   │   ├── feed/             # Community feed
│   │   ├── achievements/     # Achievements page
│   │   ├── add-task/         # Create task page
│   │   ├── login/            # Login page
│   │   ├── register/         # Registration page
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Landing page
│   │   ├── globals.css       # Global styles
│   │   └── error.tsx         # Error page
│   ├── components/            # Reusable components
│   │   ├── Navigation.tsx    # Navigation component
│   │   ├── TaskCard.tsx      # Task display component
│   │   ├── LoadingSpinner.tsx # Loading components
│   │   └── UserTypeLayout.tsx # Layout wrapper
│   ├── contexts/              # React contexts
│   │   └── AuthContext.tsx   # Authentication context
│   ├── lib/                   # Utility libraries
│   │   └── firebase.ts       # Firebase configuration
│   └── types/                 # TypeScript type definitions
│       ├── index.ts          # Main types
│       └── task.ts           # Task-related types
├── prisma/                    # Database schema and migrations
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Database seeding
├── public/                    # Static assets
├── tailwind.config.ts         # Tailwind CSS configuration
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## 🎨 Design System

### Color Palette
- **Primary**: Purple (#a855f7)
- **Secondary**: Pink (#ec4899)
- **Accent**: Blue (#0ea5e9)
- **Success**: Green (#22c55e)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)

### Design Principles
- **Glassmorphism**: Backdrop blur effects
- **Gradients**: Purple-pink color schemes
- **Modern UI**: Clean, minimalist design
- **Responsive**: Mobile-first approach
- **Accessibility**: WCAG compliant

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio
```

## 📊 Database Schema

### Core Models
- **User**: Student and elderly user profiles
- **Task**: Volunteer task details and status
- **Message**: Chat messages between users
- **Notification**: System and task notifications
- **Achievement**: User achievements and badges
- **Review**: Task completion reviews

### Task Status Flow
```
PENDING → ACCEPTED → IN_PROGRESS → COMPLETED
    ↓
CANCELLED
```

## 🔐 Authentication

### User Types
- **STUDENT**: Can accept tasks, earn volunteer hours
- **ELDERLY**: Can post tasks, receive assistance

### Security Features
- JWT token-based authentication
- Password hashing with bcrypt
- Role-based access control
- Secure session management

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet**: Responsive tablet layouts
- **Desktop**: Enhanced desktop experience
- **Touch Friendly**: Optimized touch interactions

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Static site hosting
- **Railway**: Full-stack deployment
- **DigitalOcean**: VPS deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Development Guidelines
- Follow TypeScript best practices
- Use conventional commit messages
- Maintain consistent code style
- Write meaningful commit messages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Prisma** for the modern database toolkit
- **Firebase** for the comprehensive backend services
- **Lucide** for the beautiful icons

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)
- **Email**: support@genmatch.com

---

**Made with ❤️ for the Thai community**
