# Quick Start Guide - Email Backend Setup

## 5-Minute Setup

### Step 1: Get Gmail App Password
1. Go to https://myaccount.google.com/security
2. Click "App passwords" (requires 2FA)
3. Select Mail → Windows Computer
4. Copy the 16-character password

### Step 2: Update .env File
Replace the password in `.env`:
```
EMAIL_PASSWORD=xxxxxxxxxxxxxxxx
```

### Step 3: Install & Run
```bash
npm install
npm run dev:all
```

This starts:
- Frontend: http://localhost:5173
- Backend: https://loan-backend-flame.vercel.app

## Testing the Email Service

### Method 1: Use the Contact Form Component
Import in your component:
```tsx
import { ContactFormComponent } from '@/components/ContactForm';

export function MyPage() {
  return <ContactFormComponent />;
}
```

### Method 2: Send a Test Request
Using curl:
```bash
curl -X POST https://loan-backend-flame.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message"
  }'
```

Using JavaScript/Fetch:
```javascript
fetch('https://loan-backend-flame.vercel.app/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Subject',
    message: 'This is a test message'
  })
})
.then(r => r.json())
.then(console.log);
```

## Verify It's Working

1. **Check Backend Health:**
   ```
   https://loan-backend-flame.vercel.app/api/health
   ```
   Should see: `{"status":"Server is running"}`

2. **Check Backend Console:**
   Look for: `Email transporter is ready to send emails`

3. **Check Email Inbox:**
   `sabbahossain123@gmail.com` should receive test emails

## Production Notes

- Update `VITE_API_BASE_URL` to your production backend URL
- Use a transactional email service (SendGrid, AWS SES, etc.)
- Store passwords in secure environment variables
- Enable rate limiting to prevent spam
- Add authentication/CAPTCHA to forms

## Need Help?

See `EMAIL_SETUP.md` for detailed troubleshooting and configuration options.
