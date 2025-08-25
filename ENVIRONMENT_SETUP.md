# 🚀 Environment Setup Guide for GenMatch

## **📋 Required Environment Variables**

### **1. JWT_SECRET (REQUIRED)**
```
JWT_SECRET=your-super-secret-jwt-key-here
```
- **Required for**: User authentication and JWT token generation
- **Length**: At least 32 characters recommended
- **Example**: `JWT_SECRET=genmatch-super-secret-jwt-key-2024-production`

### **2. Supabase Configuration (Optional)**
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```
- **Required for**: Real database connection
- **If not set**: System will use mock database (demo mode)

---

## **🔧 Setup Instructions**

### **Local Development**
1. Copy `.env.example` to `.env.local`
2. Fill in your values
3. Restart development server

### **Vercel Production**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add `JWT_SECRET` with a strong secret key
3. Add Supabase variables if using real database
4. Redeploy your project

---

## **🎯 Current Status**

- **Local**: ✅ Mock Database (Working)
- **Production**: ❌ Missing JWT_SECRET (Error)

---

## **⚡ Quick Fix for Production**

1. **Set JWT_SECRET in Vercel:**
   - Go to Vercel Dashboard
   - Project Settings → Environment Variables
   - Add: `JWT_SECRET=your-secret-key-here`

2. **Redeploy:**
   - Push new code to GitHub
   - Vercel will auto-deploy

---

## **🔍 Troubleshooting**

### **Error: "ระบบยังไม่ได้ตั้งค่า"**
- **Cause**: Missing JWT_SECRET
- **Solution**: Set JWT_SECRET environment variable

### **Error: "ไม่สามารถเชื่อมต่อฐานข้อมูลได้"**
- **Cause**: Missing Supabase credentials
- **Solution**: Set Supabase environment variables or use mock database

---

## **📞 Support**

If you need help setting up environment variables:
1. Check Vercel documentation
2. Contact system administrator
3. Use mock database mode for testing
