# Email Integration Guide

This guide shows how to integrate the email backend into your existing React components.

## Overview

Your backend email service handles form submissions and sends emails automatically. Here's how to use it.

## Basic Integration

### 1. Using the Contact Service

```typescript
import { submitContactForm } from '@/services/contactService';

// In your component
const handleSubmitForm = async (data) => {
  const response = await submitContactForm({
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
  });

  if (response.success) {
    // Success - show confirmation to user
    toast.success('Email sent successfully!');
  } else {
    // Error - show error message
    toast.error(response.error || response.message);
  }
};
```

### 2. Complete Example Component

```typescript
import { useState } from 'react';
import { submitContactForm } from '@/services/contactService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export function MyContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const { toast } = useToast();

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await submitContactForm(form);
      
      if (result.success) {
        toast({
          title: 'Success!',
          description: 'Your message has been sent.'
        });
        // Reset form
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        toast({
          title: 'Error',
          description: result.error || result.message,
          variant: 'destructive'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <Input
        name="email"
        type="email"
        placeholder="your@email.com"
        value={form.email}
        onChange={handleChange}
        required
      />
      <Input
        name="subject"
        placeholder="Subject"
        value={form.subject}
        onChange={handleChange}
        required
      />
      <Textarea
        name="message"
        placeholder="Your message..."
        value={form.message}
        onChange={handleChange}
        required
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
```

## Integrating with Existing Forms

### LoanApplicationForm Integration

If you want to send loan application data via email:

```typescript
// In LoanApplicationForm.tsx
import { submitContactForm } from '@/services/contactService';

const onSubmit = async (data) => {
  // Prepare the application data
  const emailData = {
    name: data.applicantName || data.firstName,
    email: data.email,
    subject: 'New Loan Application',
    message: `
Applicant Information:
- Name: ${data.firstName} ${data.lastName}
- Email: ${data.email}
- Employment: ${data.employment}
- Loan Amount: ${data.loanAmount}

[Add more fields as needed]
    `.trim()
  };

  // Send via email
  const response = await submitContactForm(emailData);
  
  if (response.success) {
    // Application submitted successfully
    toast.success('Application submitted!');
  } else {
    // Handle error
    toast.error('Failed to submit application');
  }
};
```

## Environment Configuration

### Frontend (.env or .env.local)

```env
VITE_API_BASE_URL=http://localhost:5000
```

### Backend (.env)

```env
EMAIL_USER=envogame@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=envogame@gmail.com
EMAIL_TO=sabbahossain123@gmail.com
PORT=3000
NODE_ENV=development
```

## Error Handling

The service handles errors gracefully:

```typescript
const response = await submitContactForm(data);

if (!response.success) {
  // response.error contains detailed error (dev mode)
  // response.message contains user-friendly message
  
  if (response.error?.includes('Invalid email')) {
    // Handle email validation error
  } else if (response.error?.includes('All fields')) {
    // Handle missing fields
  } else {
    // Handle generic email error
  }
}
```

## Validation

The backend validates:
- ✓ All fields are required
- ✓ Email format is valid
- ✓ Name, subject, message are not empty
- ✓ No HTML injection (input is escaped)

## Testing

### Manual Test

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Test",
    "message": "This is a test"
  }'
```

### Expected Response

```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

## Advanced Usage

### Send Multiple Emails

```typescript
const results = await Promise.all([
  submitContactForm(data1),
  submitContactForm(data2),
  submitContactForm(data3),
]);

const allSuccess = results.every(r => r.success);
```

### Add Custom Fields

Extend the service to support more fields:

```typescript
// In contactService.ts
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;  // Optional field
  company?: string;
}

// In your component
const response = await submitContactForm({
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Inquiry',
  message: 'I have a question...',
  phone: '555-1234',
  company: 'ACME Corp'
});
```

Then update the server to handle additional fields:

```typescript
// In server.js - modify the email template
const { name, email, subject, message, phone, company } = req.body;

const mailOptions = {
  // ... existing options ...
  html: `
    <div>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
      <!-- ... rest of template ... -->
    </div>
  `
};
```

## Rate Limiting (Optional Enhancement)

To prevent spam, add rate limiting:

```typescript
import rateLimit from 'express-rate-limit';

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: 'Too many submissions, please try again later'
});

app.post('/api/contact', contactLimiter, async (req, res) => {
  // ... existing code ...
});
```

Install: `npm install express-rate-limit`

## Troubleshooting

### "Email sent but not received"
- Check spam folder
- Verify EMAIL_TO address in .env
- Check backend logs for errors

### "Failed to send email"
- Verify Gmail app password is correct
- Check backend is running (`npm run dev:backend`)
- Verify VITE_API_BASE_URL points to correct backend URL

### "CORS errors"
- Backend must be running on port 3000
- Frontend .env must have `VITE_API_BASE_URL=http://localhost:5000`
- Check for typos in environment variables

---

**Need more help?** See `EMAIL_SETUP.md` for detailed troubleshooting.
