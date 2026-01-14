import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer, { Transporter } from 'nodemailer';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Types
interface ContactFormRequest extends Request {
  body: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };
}

interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Nodemailer transporter with Gmail
const transporter: Transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verify transporter connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter error:', error);
  } else {
    console.log('Email transporter is ready to send emails');
  }
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'Server is running' });
});

// Contact form submission endpoint
app.post('/api/contact', async (req: ContactFormRequest, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, subject, message) are required',
      } as EmailResponse);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      } as EmailResponse);
    }

    // Prepare email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #555;">Name:</strong>
            <p style="margin: 5px 0; color: #666;">${escapeHtml(name)}</p>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #555;">Email:</strong>
            <p style="margin: 5px 0; color: #666;">${escapeHtml(email)}</p>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #555;">Subject:</strong>
            <p style="margin: 5px 0; color: #666;">${escapeHtml(subject)}</p>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #555;">Message:</strong>
            <p style="margin: 5px 0; color: #666; white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">This is an automated message from your contact form.</p>
        </div>
      `,
      replyTo: email,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
    } as EmailResponse);
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error:
        process.env.NODE_ENV === 'development'
          ? (error as Error).message
          : undefined,
    } as EmailResponse);
  }
});

// Utility function to escape HTML special characters
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unexpected error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error:
      process.env.NODE_ENV === 'development' ? err.message : undefined,
  } as EmailResponse);
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
  } as EmailResponse);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
