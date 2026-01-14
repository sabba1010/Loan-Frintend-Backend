# Email Backend Setup - Implementation Checklist

## ✅ Pre-Setup Checklist

- [ ] Gmail account ready
- [ ] 2-Factor Authentication enabled on Gmail
- [ ] Access to Gmail App Passwords
- [ ] Terminal/Command line available
- [ ] npm or bun installed

---

## ✅ Setup Checklist

### Step 1: Gmail Configuration
- [ ] Go to https://myaccount.google.com/security
- [ ] Navigate to "App passwords"
- [ ] Select "Mail" and your device type
- [ ] Copy the 16-character password generated

### Step 2: Environment Configuration
- [ ] Open `.env` file in project root
- [ ] Update `EMAIL_PASSWORD` with the 16-character password
  ```env
  EMAIL_PASSWORD=xxxxxxxxxxxxxxxx
  ```
- [ ] Verify other email settings:
  - [ ] EMAIL_USER: envogame@gmail.com
  - [ ] EMAIL_FROM: envogame@gmail.com
  - [ ] EMAIL_TO: sabbahossain123@gmail.com
- [ ] Verify server settings:
  - [ ] PORT: 3000
  - [ ] NODE_ENV: development

### Step 3: Dependencies
- [ ] Dependencies already installed from npm install
  - [ ] express
  - [ ] nodemailer
  - [ ] cors
  - [ ] dotenv
  - [ ] concurrently

### Step 4: Backend Files
- [ ] server.js exists in project root
- [ ] .env file created with credentials
- [ ] .gitignore configured (protects .env)

### Step 5: Frontend Integration Files
- [ ] src/services/contactService.ts exists
- [ ] src/components/ContactForm.tsx exists

---

## ✅ Testing Checklist

### Test 1: Backend Server
- [ ] Start backend: `npm run dev:backend`
- [ ] Check console shows:
  - [ ] "Server is running on port 3000"
  - [ ] "Email transporter is ready to send emails"
- [ ] Visit https://loan-backend-flame.vercel.app/api/health in browser
- [ ] Should see: `{"status":"Server is running"}`

### Test 2: Email Transporter
- [ ] Backend console shows email is ready
- [ ] No authentication errors in logs
- [ ] Check .env has correct Gmail password

### Test 3: Test Email Submission
Option A - Using Browser Console:
```javascript
fetch('https://loan-backend-flame.vercel.app/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test',
    message: 'This is a test'
  })
}).then(r => r.json()).then(console.log);
```

- [ ] Should return: `{"success":true,"message":"Email sent successfully"}`

Option B - Using curl:
```bash
curl -X POST https://loan-backend-flame.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test"}'
```

- [ ] Should return success response

### Test 4: Email Receipt
- [ ] Check sabbahossain123@gmail.com inbox
- [ ] Look for email with subject: "New Contact Form Submission: Test"
- [ ] Check email contains all submitted fields
- [ ] Check spam/junk folder if not in inbox

### Test 5: Frontend Integration
- [ ] Start frontend: `npm run dev`
- [ ] Frontend runs at http://localhost:5173
- [ ] Open ContactForm component in browser
- [ ] Fill in all form fields
- [ ] Click submit
- [ ] Should see loading state
- [ ] Should see success message
- [ ] Should see email arrive

---

## ✅ Integration Checklist

### Option 1: Use Pre-Built Component
- [ ] Import ContactFormComponent into your page
- [ ] Test the form submission
- [ ] Verify email is sent

### Option 2: Integrate with Existing Form
- [ ] Import submitContactForm from contactService
- [ ] Call submitContactForm in your form's onSubmit
- [ ] Handle success response (show toast)
- [ ] Handle error response (show toast)
- [ ] Test the form

### Option 3: Custom Implementation
- [ ] Understand the API endpoint: POST /api/contact
- [ ] Prepare form data with: name, email, subject, message
- [ ] Make fetch request to backend
- [ ] Handle response appropriately
- [ ] Test the implementation

---

## ✅ Validation Checklist

### Backend Validation
- [ ] Test with missing "name" field → Gets error message
- [ ] Test with missing "email" field → Gets error message
- [ ] Test with invalid email format → Gets error message
- [ ] Test with missing "subject" field → Gets error message
- [ ] Test with missing "message" field → Gets error message
- [ ] Test with valid data → Success response

### Frontend Validation
- [ ] Form requires all fields before submit
- [ ] Shows loading state while sending
- [ ] Shows success toast on success
- [ ] Shows error toast on failure
- [ ] Clears form after success

---

## ✅ Security Checklist

- [ ] .env file is in .gitignore
- [ ] Never committed .env to git
- [ ] Email password is 16-character app password (not main password)
- [ ] HTML escaping is enabled on backend
- [ ] CORS is configured
- [ ] Input validation is working
- [ ] No sensitive data in error messages (production)

---

## ✅ Documentation Checklist

- [ ] Read SETUP_SUMMARY.md (overview)
- [ ] Read QUICKSTART.md (5-minute setup)
- [ ] Read EMAIL_SETUP.md (detailed guide)
- [ ] Read INTEGRATION_GUIDE.md (code examples)
- [ ] Read CONFIGURATION_REFERENCE.md (API reference)
- [ ] Read ARCHITECTURE.md (system design)

---

## ✅ Deployment Checklist

### Before Production
- [ ] Set NODE_ENV=production
- [ ] Remove detailed error messages in responses
- [ ] Update API base URL for production
- [ ] Test all forms with production credentials
- [ ] Enable HTTPS
- [ ] Set up error logging
- [ ] Consider rate limiting

### For Production Server
- [ ] Use environment variables from hosting platform
- [ ] Store secrets securely
- [ ] Enable monitoring
- [ ] Set up error alerts
- [ ] Test failover scenarios
- [ ] Consider SendGrid/AWS SES for better deliverability

---

## ✅ Troubleshooting Checklist

### Email Not Sending
- [ ] Check backend is running on port 3000
- [ ] Check .env has correct Gmail password
- [ ] Check .env EMAIL_TO is correct
- [ ] Check backend logs for errors
- [ ] Verify 2FA is enabled on Gmail
- [ ] Verify app password is correct (16 characters)

### CORS Errors
- [ ] Backend is running on https://loan-backend-flame.vercel.app
- [ ] Frontend .env has VITE_API_BASE_URL
- [ ] No typos in URLs
- [ ] CORS middleware is enabled in server.js

### Form Not Submitting
- [ ] All form fields are filled
- [ ] Backend is running
- [ ] Check browser console for errors
- [ ] Check network tab for failed requests
- [ ] Verify endpoint URL is correct

### Email Not Arriving
- [ ] Check spam/junk folder
- [ ] Verify EMAIL_TO in .env is correct
- [ ] Check backend logs show email sent
- [ ] Gmail might be blocking - check security settings
- [ ] Try with a different recipient email

---

## ✅ Post-Setup Verification

After completing setup, verify:

- [ ] Backend starts without errors: `npm run dev:backend`
- [ ] Frontend starts without errors: `npm run dev`
- [ ] Health check works: GET /api/health
- [ ] Test email sends successfully
- [ ] Email received in inbox
- [ ] Form validation works
- [ ] Error handling works
- [ ] No sensitive data in errors (production)
- [ ] All files created and in place
- [ ] Documentation is accessible

---

## 📝 Setup Status

Create a file `SETUP_STATUS.txt` with the date and status:

```
EMAIL BACKEND SETUP
==================
Date: January 14, 2026
Status: ✅ COMPLETE

Backend Server: ✅ Running on port 3000
Email Service: ✅ Configured with Gmail
Frontend Integration: ✅ Ready to use
Documentation: ✅ Complete

Ready for Production: NO (Requires app password)
```

---

## 🎯 Next Steps After Setup

1. **Start the servers:**
   ```bash
   npm run dev:all
   ```

2. **Test the system:**
   - Use the ContactForm component
   - Or send test email via API
   - Verify receipt

3. **Integrate with your forms:**
   - Update existing forms to use contactService
   - Or use pre-built ContactForm component

4. **Monitor in production:**
   - Check email delivery
   - Monitor error logs
   - Track form submissions

---

## 📞 Need Help?

| Issue | Document |
|-------|----------|
| Can't get started | QUICKSTART.md |
| Setup not working | EMAIL_SETUP.md |
| How to integrate | INTEGRATION_GUIDE.md |
| API details | CONFIGURATION_REFERENCE.md |
| System design | ARCHITECTURE.md |

---

**Completion Date:** ________________

**Completed By:** ________________

**Notes:** ________________________________________________

---

*Print this checklist and check off items as you complete them!*
