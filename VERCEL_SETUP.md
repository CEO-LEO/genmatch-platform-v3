# 🚀 คู่มือการตั้งค่า Vercel สำหรับ GenMatch

## 📋 ขั้นตอนการตั้งค่า Environment Variables

### 1️⃣ เปิด Vercel Dashboard
- ไปที่ [vercel.com](https://vercel.com)
- คลิก **Sign In** หรือ **Continue with GitHub**

### 2️⃣ เลือก Project
- คลิกที่ project **genmatch-platform-v3**
- ถ้าไม่เห็น ให้คลิก **View All Projects**

### 3️⃣ เข้า Settings
- คลิกแท็บ **Settings** (ไอคอนเฟือง)
- เลือก **Environment Variables** ในเมนูซ้าย

### 4️⃣ เพิ่ม Environment Variable
- คลิกปุ่ม **Add New**
- กรอกข้อมูล:
  ```
  Name: JWT_SECRET
  Value: genmatch-super-secret-jwt-key-2024-production-12345
  Environment: Production
  ```
- คลิก **Save**

### 5️⃣ Redeploy
- ไปแท็บ **Deployments**
- คลิกปุ่ม **Redeploy** (ไอคอนรีเฟรช)
- รอให้ deploy เสร็จ

## 🎯 Environment Variables ที่ต้องมี

```
JWT_SECRET=genmatch-super-secret-jwt-key-2024-production-12345
```

## ✅ หลังจากตั้งค่าเสร็จ

1. **Login จะทำงานได้** ✅
2. **สมัครสมาชิกจะทำงานได้** ✅
3. **ระบบจะทำงานได้สมบูรณ์** ✅

## 🆘 ถ้าเจอปัญหา

- **ตรวจสอบว่า Environment Variable ถูกต้อง**
- **ตรวจสอบว่าเลือก Environment เป็น Production**
- **ตรวจสอบว่า Redeploy แล้ว**
- **รอ 1-2 นาทีหลัง Redeploy**

---

**🎊 ตั้งค่าเสร็จแล้ว GenMatch จะทำงานได้สมบูรณ์! 🚀**
