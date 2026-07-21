# 🔐 Gmail SMTP Setup Guide

## Follow These Steps to Fix OTP Email Issue:

### 1. Enable 2-Factor Authentication (2FA)
- Go to [myaccount.google.com/security](https://myaccount.google.com/security)
- Click "2-Step Verification" on the left sidebar
- Follow the steps to enable 2FA with your phone

### 2. Generate App Password
- Once 2FA is enabled, go back to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
- Select **Mail** as the app
- Select **Windows (or your device)** as the device
- Click **Generate**
- You'll see a 16-character password like: `xxxx xxxx xxxx xxxx`
- **Copy this password (remove spaces)**

### 3. Update Your `.env` File
Replace `MAIL_PASS` with the new 16-character App Password:
```
MAIL_PASS=xxxxxxxxxxxxxxxx
```

### 4. Verify Configuration
Your server/.env should have:
```
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_USER=anildhanimansukh@gmail.com
MAIL_PASS=[YOUR_16_CHAR_APP_PASSWORD]
MONGODB_URL=[YOUR_DB_URL]
PORT=4000
```

### 5. Restart Your Backend Server
```bash
cd server
npm start
```

---

## ❗ IMPORTANT NOTES:
- ⚠️ **NEVER use your actual Gmail password** - Always use App Password
- ⚠️ **App Passwords only work with 2FA enabled**
- ⚠️ **If 2FA is disabled, the App Password won't work**
- ⚠️ Keep your App Password secret - it gives full email access

## Test the OTP Flow:
1. Go to Signup page
2. Enter email and click "Send OTP"
3. Check your email inbox (and spam folder)
4. If still not working, check browser console and server logs for errors

