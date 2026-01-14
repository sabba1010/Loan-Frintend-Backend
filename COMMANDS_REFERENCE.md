# Commands Reference Guide

## 🚀 Quick Start Commands

### First Time Setup

```bash
# 1. Install all dependencies
npm install

# 2. Edit .env and add Gmail app password
# Open .env and update: EMAIL_PASSWORD=your_16_char_password
```

### Running the Application

```bash
# Option 1: Run everything together (RECOMMENDED)
npm run dev:all

# Option 2: Run frontend only
npm run dev

# Option 3: Run backend only
npm run dev:backend
```

---

## 📋 Available npm Scripts

```bash
# Frontend development
npm run dev              # Start frontend dev server (localhost:5173)

# Backend development
npm run dev:backend      # Start backend server (localhost:3000)

# Both together
npm run dev:all          # Start frontend + backend

# Production build
npm run build            # Build frontend for production
npm run build:dev        # Build with development settings

# Code quality
npm run lint             # Check for code issues
npm run lint --fix       # Fix linting issues automatically

# Preview
npm run preview          # Preview production build locally
```

---

## 🔧 Common Tasks

### Update Dependencies

```bash
# Check for updates
npm outdated

# Update all packages
npm update

# Install specific new package
npm install package-name
```

### Clear Cache & Reinstall

```bash
# Windows
rmdir /s /q node_modules
del package-lock.json
npm install

# macOS/Linux
rm -rf node_modules
rm package-lock.json
npm install
```

### Check Ports

```bash
# Windows - check if ports are in use
netstat -ano | findstr :3000
netstat -ano | findstr :5173

# macOS/Linux
lsof -i :3000
lsof -i :5173
```

### Kill Process on Port

```bash
# Windows
taskkill /PID [PID_NUMBER] /F

# macOS/Linux - kill port 3000
lsof -ti:3000 | xargs kill -9

# macOS/Linux - kill port 5173
lsof -ti:5173 | xargs kill -9
```

---

## 📧 Testing Email Service

### Test 1: Browser Console

Open browser console (F12) and run:

```javascript
fetch('http://localhost:5000/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Subject',
    message: 'This is a test message'
  })
})
.then(response => response.json())
.then(data => console.log('Response:', data))
.catch(error => console.error('Error:', error));
```

### Test 2: curl Command

```bash
# Windows (Command Prompt)
curl -X POST http://localhost:5000/api/contact ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test\",\"email\":\"test@example.com\",\"subject\":\"Test\",\"message\":\"Test\"}"

# macOS/Linux
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test"}'
```

### Test 3: Using Postman

1. Open Postman
2. Create new POST request
3. URL: `http://localhost:5000/api/contact`
4. Headers: `Content-Type: application/json`
5. Body (JSON):
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "subject": "Test Subject",
  "message": "This is a test message"
}
```
6. Click Send

### Test 4: Health Check

```bash
# Windows
curl http://localhost:5000/api/health

# macOS/Linux
curl http://localhost:5000/api/health
```

Expected response:
```json
{"status":"Server is running"}
```

---

## 🔍 Checking Logs

### Backend Logs

View terminal where you ran `npm run dev:backend`

Look for:
```
Server is running on port 3000
Environment: development
Email transporter is ready to send emails
```

### Email Sending Logs

When email is sent, you'll see in backend terminal:
```
Email sent successfully to: sabbahossain123@gmail.com
```

### Errors

Errors appear in backend terminal:
```
Error sending email: [error details]
```

---

## 🐛 Debugging Commands

### Frontend Debugging

```bash
# Build and check for errors
npm run build

# Lint code
npm run lint

# Fix lint issues
npm run lint --fix
```

### Backend Debugging

Enable Node.js debugging:
```bash
# Run with debug output
NODE_DEBUG=* npm run dev:backend

# Or specific modules
NODE_DEBUG=express npm run dev:backend
```

### Environment Check

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check installed packages
npm list

# Check specific package
npm list express
npm list nodemailer
```

---

## 🔐 Security Commands

### Check npm Vulnerabilities

```bash
# Audit for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Force fix (may break compatibility)
npm audit fix --force
```

### Environment Variables

```bash
# Check if .env file exists
dir .env          # Windows
ls -la .env       # macOS/Linux

# Never commit .env
git status        # Should NOT show .env
```

---

## 📦 Package Management

### View Dependencies

```bash
# List all dependencies
npm list

# List only production dependencies
npm list --production

# List only dev dependencies
npm list --dev
```

### Manage Dependencies

```bash
# Add new package
npm install package-name

# Add dev dependency
npm install --save-dev package-name

# Remove package
npm uninstall package-name

# Update all packages
npm update

# Check for outdated packages
npm outdated
```

---

## 🚢 Deployment Commands

### Build for Production

```bash
# Build frontend
npm run build

# Preview production build
npm run preview
```

### Environment for Production

```bash
# Set environment variable (Windows)
set NODE_ENV=production
npm run dev:backend

# Set environment variable (macOS/Linux)
NODE_ENV=production npm run dev:backend
```

---

## 📝 File Operations

### View File Contents

```bash
# Windows
type .env
type server.js
type src/services/contactService.ts

# macOS/Linux
cat .env
cat server.js
cat src/services/contactService.ts
```

### Edit Files

```bash
# Windows - Open in notepad
notepad .env

# macOS/Linux - Open in default editor
nano .env
vim .env
```

---

## 🔄 Restart Servers

### When to Restart

- After changing .env file
- After installing new packages
- After modifying server.js
- If something stops working

### How to Restart

1. Stop current process:
   ```
   Press Ctrl+C in terminal
   ```

2. Start again:
   ```bash
   npm run dev:all
   # or
   npm run dev:backend
   ```

---

## 📊 Status Check

### All Systems Running

When both servers are running, you should see:

**Frontend:**
```
VITE v5.4.19  ready in 234 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

**Backend:**
```
Server is running on port 3000
Environment: development
Email transporter is ready to send emails
```

### Health Endpoints

```bash
# Frontend
http://localhost:5173

# Backend Health
http://localhost:5000/api/health

# Backend API
POST http://localhost:5000/api/contact
```

---

## 💾 Backup & Recovery

### Backup Important Files

```bash
# Backup .env (IMPORTANT - contains credentials!)
copy .env .env.backup    # Windows
cp .env .env.backup      # macOS/Linux

# Backup entire project
# Use git: git commit -m "Backup before changes"
# Or zip/compress entire folder
```

### Restore from Backup

```bash
# Restore .env
copy .env.backup .env    # Windows
cp .env.backup .env      # macOS/Linux
```

---

## 🎯 Typical Workflow

```bash
# 1. Start everything
npm run dev:all

# 2. In another terminal, test email
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test"}'

# 3. Check inbox for email
# Check browser at http://localhost:5173

# 4. Stop servers
# Ctrl+C in terminal

# 5. When done, build for production
npm run build

# 6. Preview production
npm run preview
```

---

## ⚠️ Common Issues & Fixes

### "Port 3000 already in use"

```bash
# Kill process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID [PID] /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### "Module not found"

```bash
# Reinstall dependencies
npm install

# Clear npm cache
npm cache clean --force
npm install
```

### ".env file not found"

```bash
# Check if file exists
dir .env          # Windows
ls -la .env       # macOS/Linux

# Create if missing
# Copy from project docs and edit
```

### "Email not sending"

```bash
# Check logs in terminal
# Look for errors in backend terminal window
# Verify .env has correct password
# Make sure backend is running
```

---

## 📞 When You Need Help

1. **Check logs**: Look at terminal output
2. **Check .env**: Verify all credentials
3. **Check ports**: 5173 (frontend) and 3000 (backend)
4. **Read docs**: See QUICKSTART.md or EMAIL_SETUP.md
5. **Restart**: Stop and restart servers

---

## 🔗 Useful Links

```
Frontend: http://localhost:5173
Backend Health: http://localhost:5000/api/health
Gmail Settings: https://myaccount.google.com/security
Gmail App Passwords: https://myaccount.google.com/apppasswords
npm Docs: https://docs.npmjs.com/
```

---

**Reference Version:** 1.0
**Last Updated:** January 14, 2026
