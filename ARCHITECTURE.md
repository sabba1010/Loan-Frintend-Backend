# System Architecture Diagram

## Email System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         YOUR WEBSITE                            │
└─────────────────────────────────────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    ▼                         ▼
        ┌──────────────────────┐   ┌──────────────────────┐
        │   FRONTEND (React)   │   │  BACKEND (Node.js)   │
        │  http://localhost:   │   │  http://localhost:   │
        │       5173           │   │       3000           │
        └──────────────────────┘   └──────────────────────┘
                    │                         │
                    │ 1. User fills form      │
                    │────────────────────────▶│
                    │                         │
                    │ 2. Frontend sends data  │
                    │    via fetch() to:      │
                    │    /api/contact         │
                    │                         │
                    │                         │ 3. Backend validates
                    │                         │    form fields
                    │                         │
                    │                         │ 4. Backend prepares
                    │                         │    HTML email
                    │                         │
                    │                         ▼
                    │              ┌──────────────────────┐
                    │              │   NODEMAILER         │
                    │              │   (Gmail SMTP)       │
                    │              └──────────────────────┘
                    │                         │
                    │                         │ 5. Connects to Gmail
                    │                         │    using credentials
                    │                         │
                    │                         ▼
                    │              ┌──────────────────────┐
                    │              │   GMAIL SERVERS      │
                    │              │   (envogame@         │
                    │              │    gmail.com)        │
                    │              └──────────────────────┘
                    │                         │
                    │              ┌──────────┴──────────┐
                    │              │                     │
                    │ 6. Response  │    7. Email sent    │
                    │◀─────────────│       to:           │
                    │   Success    │  sabbahossain123@   │
                    │   Message    │  gmail.com          │
                    │              │                     │
                    ▼              ▼
            ┌──────────────┐   ┌──────────────┐
            │ Show Toast   │   │ Email Inbox  │
            │ "Email Sent" │   │ (RECEIVED)   │
            └──────────────┘   └──────────────┘
```

## Data Flow

### 1. User Submission
```
Form Input:
  - name: "John Doe"
  - email: "john@example.com"
  - subject: "Inquiry"
  - message: "I have a question..."
```

### 2. Frontend Service
```typescript
// src/services/contactService.ts
submitContactForm(data)
  │
  ├─ Validates data
  ├─ Makes POST request to /api/contact
  └─ Returns response
```

### 3. Backend Validation
```
Check:
  ✓ name exists
  ✓ email exists & valid format
  ✓ subject exists
  ✓ message exists
```

### 4. Email Generation
```
From: envogame@gmail.com
To: sabbahossain123@gmail.com
Reply-To: john@example.com
Subject: New Contact Form Submission: Inquiry

Body (HTML):
  Name: John Doe
  Email: john@example.com
  Subject: Inquiry
  Message: I have a question...
```

### 5. Email Sending
```
Nodemailer
  │
  ├─ Creates Gmail connection
  ├─ Authenticates with app password
  ├─ Sends email via SMTP
  └─ Returns status
```

### 6. Response to User
```
{
  "success": true,
  "message": "Email sent successfully"
}
```

---

## Component Interaction

```
┌──────────────────────────────────────────────┐
│         React Component                      │
│  (LoanApplicationForm, ContactForm, etc)     │
└─────────────────┬──────────────────────────┘
                  │
                  │ Calls
                  ▼
┌──────────────────────────────────────────────┐
│    contactService.ts                         │
│  (submitContactForm function)                │
└─────────────────┬──────────────────────────┘
                  │
                  │ Makes POST request
                  ▼
┌──────────────────────────────────────────────┐
│    Backend: server.js                        │
│    Endpoint: POST /api/contact               │
└─────────────────┬──────────────────────────┘
                  │
        ┌─────────┼─────────┐
        │         │         │
        ▼         ▼         ▼
    Validate  Prepare   Send Email
    Fields    Email     via Gmail
        │         │         │
        └─────────┼─────────┘
                  │
                  ▼
            Return Response
                  │
                  ▼
            Frontend Toast
            (Success/Error)
```

---

## File Organization

```
project-root/
│
├── FRONTEND (React/Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContactForm.tsx          ← User-facing form
│   │   │   └── [other components...]
│   │   │
│   │   └── services/
│   │       └── contactService.ts        ← API client
│   │
│   └── vite.config.ts                   ← Frontend config
│
├── BACKEND (Node.js/Express)
│   ├── server.js                        ← Main server
│   ├── server.ts                        ← TypeScript version
│   └── .env                             ← Configuration
│
└── DOCUMENTATION
    ├── SETUP_SUMMARY.md                 ← Start here!
    ├── QUICKSTART.md                    ← 5-min setup
    ├── EMAIL_SETUP.md                   ← Detailed guide
    ├── INTEGRATION_GUIDE.md              ← Code examples
    └── CONFIGURATION_REFERENCE.md        ← API reference
```

---

## Technology Stack

```
FRONTEND
├── React 18.3.1
├── TypeScript
├── Vite (bundler)
└── Shadcn UI Components
    └── ContactForm.tsx (uses UI components)

BACKEND
├── Node.js / Express 4.19.2
├── Nodemailer 6.9.13 (email)
├── CORS 2.8.5 (cross-origin)
└── Dotenv 16.4.5 (config)

INFRASTRUCTURE
├── Gmail SMTP (email delivery)
└── Local Development Server
```

---

## Environment Variables

```
FRONTEND
├── VITE_API_BASE_URL
│   └── Points to backend API
│       http://localhost:5000

BACKEND
├── EMAIL_USER → Gmail address
├── EMAIL_PASSWORD → Gmail app password
├── EMAIL_FROM → Sender address
├── EMAIL_TO → Recipient address
├── PORT → Server port (3000)
└── NODE_ENV → development/production
```

---

## Security Layers

```
User Input
    │
    ▼
Frontend Validation (TypeScript)
    │
    ├─ Required field checks
    └─ Email format validation
    
    ▼
API Request (HTTPS in production)
    │
    ├─ CORS protection
    └─ JSON parsing

    ▼
Backend Validation (Node.js)
    │
    ├─ Required fields check
    ├─ Email format validation
    └─ HTML escaping
    
    ▼
Email Transmission (SMTP + Gmail)
    │
    ├─ Gmail authentication
    ├─ Encrypted connection
    └─ Deliverability checks

    ▼
Recipients Mailbox (Gmail)
    │
    └─ Spam filtering, virus scanning
```

---

## Process Flow: Complete Example

```
User visits website
  │
  ▼
Sees contact form
  │
  ▼
Fills in:
  - Name: "Jane Smith"
  - Email: "jane@company.com"
  - Subject: "Loan Inquiry"
  - Message: "I would like to apply..."
  │
  ▼
Clicks "Send Message" button
  │
  ▼
Frontend JavaScript:
  - Validates all fields are filled
  - Shows loading spinner
  - Calls submitContactForm()
  │
  ▼
Sends HTTP POST to http://localhost:5000/api/contact
  {
    "name": "Jane Smith",
    "email": "jane@company.com",
    "subject": "Loan Inquiry",
    "message": "I would like to apply..."
  }
  │
  ▼
Backend processes request:
  - Validates all fields
  - Validates email format
  - Escapes HTML characters
  - Prepares HTML email
  │
  ▼
Sends email via Gmail SMTP:
  From: envogame@gmail.com
  To: sabbahossain123@gmail.com
  Reply-To: jane@company.com
  │
  ▼
Gmail receives & delivers
  │
  ▼
Recipient gets email in inbox
  │
  ▼
Frontend receives success response:
  {
    "success": true,
    "message": "Email sent successfully"
  }
  │
  ▼
Shows success toast message to user:
  "Your message has been sent!"
  │
  ▼
Form is cleared
  │
  ▼
User sees confirmation
```

---

## Monitoring Points

```
FRONTEND
├─ Console logs in browser
├─ Network tab (API requests)
└─ Toast notifications

BACKEND LOGS
├─ Server startup message
├─ Email transporter verification
├─ Request processing logs
├─ Email sending status
└─ Error messages

EMAIL RECEIPT
├─ Recipient inbox
├─ Spam folder
└─ Email headers (debugging)
```

---

**Last Updated:** January 14, 2026
