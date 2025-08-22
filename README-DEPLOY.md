# 🚀 GenMatch Platform - Deployment Guide

คู่มือการ deploy GenMatch Platform ขึ้นเซิร์ฟเวอร์

## 📋 Prerequisites

### เซิร์ฟเวอร์ที่ต้องการ:
- **OS:** Ubuntu 20.04 LTS หรือใหม่กว่า
- **RAM:** อย่างน้อย 2GB
- **Storage:** อย่างน้อย 20GB
- **Domain:** มี domain name สำหรับใช้งาน

### Software ที่ต้องติดตั้ง:
- Node.js 18+ และ npm
- Git
- Nginx
- PM2 (Process Manager)
- Certbot (สำหรับ SSL)

## 🛠️ การติดตั้งเซิร์ฟเวอร์

### 1. อัปเดตระบบ
```bash
sudo apt update && sudo apt upgrade -y
```

### 2. ติดตั้ง Node.js และ npm
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 3. ติดตั้ง Nginx
```bash
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 4. ติดตั้ง PM2
```bash
sudo npm install -g pm2
```

### 5. ติดตั้ง Certbot (สำหรับ SSL)
```bash
sudo apt install certbot python3-certbot-nginx -y
```

## 🚀 การ Deploy

### 1. Clone โปรเจค
```bash
cd /var/www
sudo git clone https://github.com/CEO-LEO/genmatch-platform-v3.git genmatch-platform
cd genmatch-platform
```

### 2. ติดตั้ง Dependencies
```bash
sudo npm ci --production
```

### 3. Build โปรเจค
```bash
sudo npm run build
```

### 4. ตั้งค่าสิทธิ์
```bash
sudo chown -R www-data:www-data /var/www/genmatch-platform
sudo chmod -R 755 /var/www/genmatch-platform
```

### 5. เริ่มต้นแอปพลิเคชัน
```bash
sudo pm2 start ecosystem.config.js --env production
sudo pm2 save
sudo pm2 startup
```

## 🔧 การตั้งค่า Nginx

### 1. คัดลอกไฟล์ config
```bash
sudo cp nginx.conf /etc/nginx/sites-available/genmatch
```

### 2. แก้ไข domain name
```bash
sudo nano /etc/nginx/sites-available/genmatch
# เปลี่ยน your-domain.com เป็น domain จริง
```

### 3. เปิดใช้งาน site
```bash
sudo ln -s /etc/nginx/sites-available/genmatch /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🔒 การตั้งค่า SSL

### 1. ขอ SSL Certificate
```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### 2. ตั้งค่า Auto-renewal
```bash
sudo crontab -e
# เพิ่มบรรทัดนี้:
0 12 * * * /usr/bin/certbot renew --quiet
```

## 📊 การจัดการแอปพลิเคชัน

### ดูสถานะ
```bash
pm2 status
```

### ดู logs
```bash
pm2 logs genmatch-platform
```

### Restart แอป
```bash
pm2 restart genmatch-platform
```

### Reload แอป
```bash
pm2 reload genmatch-platform
```

## 🔄 การอัปเดต

### 1. Pull โค้ดใหม่
```bash
cd /var/www/genmatch-platform
sudo git pull origin main
```

### 2. ติดตั้ง dependencies ใหม่
```bash
sudo npm ci --production
```

### 3. Build ใหม่
```bash
sudo npm run build
```

### 4. Reload แอป
```bash
sudo pm2 reload genmatch-platform
```

## 📝 การตั้งค่า Environment Variables

สร้างไฟล์ `.env.local` ในโฟลเดอร์โปรเจค:

```bash
# Database
DATABASE_URL="your-database-url"

# JWT Secret
JWT_SECRET="your-jwt-secret-key"

# API Keys
NEXT_PUBLIC_API_URL="https://your-domain.com"

# Other configurations
NODE_ENV="production"
```

## 🚨 การแก้ไขปัญหา

### แอปไม่ทำงาน
```bash
pm2 status
pm2 logs genmatch-platform
pm2 restart genmatch-platform
```

### Nginx ไม่ทำงาน
```bash
sudo systemctl status nginx
sudo nginx -t
sudo systemctl restart nginx
```

### SSL ไม่ทำงาน
```bash
sudo certbot certificates
sudo certbot renew --dry-run
```

## 📊 การ Monitor

### 1. PM2 Monitor
```bash
pm2 monit
```

### 2. System Resources
```bash
htop
df -h
free -h
```

### 3. Nginx Logs
```bash
sudo tail -f /var/log/nginx/genmatch_access.log
sudo tail -f /var/log/nginx/genmatch_error.log
```

## 🔐 Security Checklist

- [ ] Firewall เปิดเฉพาะ port 80, 443
- [ ] SSH key authentication
- [ ] Regular security updates
- [ ] SSL certificate valid
- [ ] Environment variables secured
- [ ] Database access restricted
- [ ] Log monitoring enabled

## 📞 Support

หากมีปัญหาการ deploy ติดต่อ:
- **Email:** support@genmatch.com
- **Documentation:** [GitHub Repository](https://github.com/CEO-LEO/genmatch-platform-v3)

---

**🎉 ขอให้การ Deploy สำเร็จ!** 🚀
