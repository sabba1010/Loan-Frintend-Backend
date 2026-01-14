# Email Backend Configuration Guide

This document provides instructions for setting up and running the email backend for contact form submissions.

## Overview

The backend server is built with **Express.js** and uses **Nodemailer** to send emails via Gmail. All contact form submissions are automatically sent to the configured recipient email address.

## Prerequisites

- Node.js (v16 or higher)
- npm or bun package manager
- Gmail account with an **App Password** generated

## Setup Instructions

### 1. Generate Gmail App Password

1. Go to your [Google Account](https://myaccount.google.com/)
2. Navigate to **Security** (left sidebar)
3. Find **App passwords** (you may need to enable 2-factor authentication first)
4. Select "Mail" and "Windows Computer" (or your device)
5. Google will generate a 16-character password - **copy this**

### 2. Configure Environment Variables

1. Create or update the `.env` file in the project root:

```env
# Email Configuration
EMAIL_USER=envogame@gmail.com
EMAIL_PASSWORD=your_app_password_here
EMAIL_FROM=envogame@gmail.com
EMAIL_TO=sabbahossain123@gmail.com

# Server Configuration
PORT=3000
NODE_ENV=development
```

**Important:** Replace `your_app_password_here` with the 16-character password from Google.

### 3. Install Dependencies

```bash
npm install
# or
bun install
```

This will install all backend dependencies including:
- `express` - Web framework
- `nodemailer` - Email sending
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variable management

### 4. Running the Backend

#### Option A: Run backend only
```bash
npm run dev:backend
```

#### Option B: Run frontend and backend together
```bash
npm run dev:all
```

The server will start on `https://loan-backend-flame.vercel.app`

## API Endpoints

### Health Check
- **Endpoint:** `GET /api/health`
- **Description:** Checks if the server is running
- **Response:**
```json
{
  "status": "Server is running"
}
```

### Contact Form Submission
- **Endpoint:** `POST /api/contact`
- **Content-Type:** `application/json`
- **Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "Your message here"
}
```

- **Success Response (200):**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

- **Error Response (400/500):**
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

## Frontend Integration

### Using the Contact Service

The frontend provides a utility service to easily send contact form data:

```typescript
import { submitContactForm } from '@/services/contactService';

const handleSubmit = async (data) => {
  const response = await submitContactForm({
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
  });

  if (response.success) {
    console.log('Email sent successfully!');
  } else {
    console.error('Failed to send email:', response.error);
  }
};
```

### Environment Variable for Frontend

Create a `.env.local` file (or update `.env`) with:

```env
VITE_API_BASE_URL=https://loan-backend-flame.vercel.app
```

This tells the frontend where to reach the backend API.

## Email Format

Emails sent from contact form submissions include:
- **From:** `envogame@gmail.com` (sender)
- **To:** `sabbahossain123@gmail.com` (recipient)
- **Reply-To:** Visitor's email address (for easy responses)
- **Subject:** "New Contact Form Submission: [User Subject]"

The email body is formatted as HTML with:
- Visitor's name
- Visitor's email
- Subject line
- Full message content

## Security Features

✓ **Email Validation:** All email addresses are validated for proper format
✓ **Required Fields:** All form fields (name, email, subject, message) are required
✓ **HTML Escaping:** User input is escaped to prevent HTML injection
✓ **Error Handling:** Detailed error messages (development only)
✓ **CORS:** Cross-origin requests are properly configured

## Troubleshooting

### "Failed to send email" Error

**Solution 1: Check App Password**
- Verify the Gmail App Password is correct
- Regenerate a new App Password if needed
- Ensure no spaces in the password

**Solution 2: Enable Less Secure Apps**
- Some Gmail accounts may need additional configuration
- Go to [Google Security](https://myaccount.google.com/security)
- Check "Allow less secure app access" if available

**Solution 3: Check Backend Logs**
- Look at the terminal where the backend is running
- Error messages will be logged there
- Run with `NODE_ENV=development` for detailed errors

### Backend Not Running

```bash
# Kill any process on port 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID [PID] /F
```

### CORS Errors

The CORS middleware should allow all origins by default. If you get CORS errors:
1. Ensure the backend is running
2. Check the API base URL in frontend environment variables
3. Verify the frontend URL is accessible to the backend

## Production Deployment

For production:

1. **Use an Email Service:** Consider using SendGrid, Mailgun, or AWS SES instead of Gmail
2. **Secure Passwords:** Use environment variables from your hosting provider
3. **Set NODE_ENV=production:** Remove detailed error messages
4. **Enable HTTPS:** Ensure all traffic is encrypted
5. **Add Rate Limiting:** Prevent spam submissions
6. **Add Logging:** Store sent emails and errors to a database

Example production `.env`:
```env
EMAIL_USER=noreply@yourdomain.com
EMAIL_PASSWORD=[YOUR_SERVICE_API_KEY]
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=support@yourdomain.com
PORT=3000
NODE_ENV=production
```

## File Structure

```
project-root/
├── server.js                    # Backend server file
├── .env                        # Environment variables
├── package.json               # Dependencies
├── src/
│   └── services/
│       └── contactService.ts  # Frontend service for API calls
└── [other frontend files...]
```

## Support

For issues or questions:
1. Check the error messages in the terminal
2. Verify environment variables are correctly set
3. Ensure backend and frontend are running on correct ports
4. Test the `/api/health` endpoint to confirm server is running

---

**Last Updated:** January 14, 2026
