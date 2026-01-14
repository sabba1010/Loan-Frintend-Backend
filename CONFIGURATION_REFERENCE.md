# Backend Configuration Reference

## Environment Variables

### Email Configuration

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `EMAIL_USER` | Gmail account for sending | `envogame@gmail.com` | ✓ |
| `EMAIL_PASSWORD` | Gmail app password (16 char) | `abcd efgh ijkl mnop` | ✓ |
| `EMAIL_FROM` | Sender email address | `envogame@gmail.com` | ✓ |
| `EMAIL_TO` | Recipient email address | `sabbahossain123@gmail.com` | ✓ |

### Server Configuration

| Variable | Description | Default | Options |
|----------|-------------|---------|---------|
| `PORT` | Server port | `3000` | Any valid port |
| `NODE_ENV` | Environment mode | `development` | `development`, `production` |

## Complete .env File

```env
# Email Configuration
EMAIL_USER=envogame@gmail.com
EMAIL_PASSWORD=your_16_char_app_password
EMAIL_FROM=envogame@gmail.com
EMAIL_TO=sabbahossain123@gmail.com

# Server Configuration
PORT=3000
NODE_ENV=development
```

## API Endpoints

### POST /api/contact

**Request:**
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "subject": "string (required)",
  "message": "string (required)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Validation Error (400):**
```json
{
  "success": false,
  "message": "All fields (name, email, subject, message) are required"
}
```

**Server Error (500):**
```json
{
  "success": false,
  "message": "Failed to send email",
  "error": "Error details (development only)"
}
```

### GET /api/health

**Response (200):**
```json
{
  "status": "Server is running"
}
```

## File Structure

```
project-root/
├── server.js                    # Main backend file (Node.js)
├── server.ts                    # TypeScript version (optional)
├── .env                        # Environment variables (NOT in git)
├── package.json                # Dependencies
│
├── src/
│   ├── services/
│   │   └── contactService.ts   # Frontend API client
│   ├── components/
│   │   └── ContactForm.tsx      # Example form component
│   └── [other React files...]
│
├── EMAIL_SETUP.md               # Detailed setup guide
├── QUICKSTART.md                # 5-minute quick start
├── INTEGRATION_GUIDE.md          # How to integrate with components
└── CONFIGURATION_REFERENCE.md    # This file
```

## npm Scripts

```json
{
  "dev": "vite",                          // Start frontend only
  "dev:backend": "node server.js",        // Start backend only
  "dev:all": "concurrently \"npm run dev\" \"npm run dev:backend\"",  // Both
  "build": "vite build",                  // Build for production
  "lint": "eslint .",                     // Run linter
  "preview": "vite preview"               // Preview production build
}
```

## Dependencies Added

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | ^4.19.2 | Web framework |
| `nodemailer` | ^6.9.13 | Email sending |
| `cors` | ^2.8.5 | Cross-origin requests |
| `dotenv` | ^16.4.5 | Environment variables |
| `concurrently` | ^8.2.2 | Run multiple processes |

## Gmail App Password Setup

### Requirements
- Gmail account
- 2-Factor Authentication enabled

### Steps
1. Go to https://myaccount.google.com
2. Click "Security" in left sidebar
3. Find "App passwords" section
4. Select: Mail → Windows Computer (or your device)
5. Google generates 16-character password
6. Copy and paste into `.env`

### Format
```
Your app password: a b c d e f g h i j k l m n o p
```

The spaces are just for readability. Use it without spaces:
```
EMAIL_PASSWORD=abcdefghijklmnop
```

## CORS Configuration

By default, CORS is enabled for all origins:

```javascript
app.use(cors());
```

For production, restrict to specific origins:

```javascript
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));
```

## Email Template

Emails are sent as HTML with this structure:

```html
New Contact Form Submission

Name: [User's Name]
Email: [User's Email]
Subject: [User's Subject]
Message: [User's Message]

Reply-To: [User's Email]
```

All user input is HTML-escaped for security.

## Security Features

✓ **Input Validation**
  - All fields required
  - Email format validation
  - No empty strings

✓ **Output Security**
  - HTML escaping prevents injection
  - Special characters converted to HTML entities
  - Script tags cannot execute

✓ **Network Security**
  - HTTPS recommended in production
  - CORS configured
  - Rate limiting available (optional)

✓ **Credential Security**
  - Passwords in .env only
  - .env in .gitignore
  - App password (not main password)

## Error Handling

Development mode (`NODE_ENV=development`):
- Detailed error messages returned to client
- Full stack traces in console
- Useful for debugging

Production mode (`NODE_ENV=production`):
- Generic error messages
- No sensitive information exposed
- Detailed logs server-side only

## Performance Considerations

- Email sending is asynchronous (non-blocking)
- Concurrent requests handled properly
- No database required
- Low memory footprint

## Monitoring & Logging

Backend logs to console:

```
Server is running on port 3000
Environment: development
Email transporter is ready to send emails

[On submission]
Email sent to: sabbahossain123@gmail.com
[On error]
Error sending email: {error details}
```

## Production Deployment Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong Gmail app password
- [ ] Store .env variables in hosting platform
- [ ] Enable HTTPS
- [ ] Implement rate limiting
- [ ] Add request logging
- [ ] Monitor email delivery
- [ ] Set up error alerts
- [ ] Test failover scenarios
- [ ] Consider email service provider (SendGrid, Mailgun, etc.)

## Migration to Production Email Service

To use a service like SendGrid instead of Gmail:

```javascript
// Replace Gmail transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY
  }
});
```

Update .env:
```env
SENDGRID_API_KEY=SG.xxxxxx
```

## Support Resources

- **Nodemailer Docs:** https://nodemailer.com/
- **Gmail App Passwords:** https://support.google.com/accounts/answer/185833
- **Express.js Docs:** https://expressjs.com/
- **CORS Docs:** https://github.com/expressjs/cors

---

**Last Updated:** January 14, 2026
**Maintained By:** Development Team
