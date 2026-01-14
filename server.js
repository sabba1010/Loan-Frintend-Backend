import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { emailService } from './email.service.js';

// Load environment variables
dotenv.config();

// Initialize email service
console.log('\n' + '='.repeat(70));
console.log('⚡ INITIALIZING APPLICATION');
console.log('='.repeat(70));
await emailService.initialize();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  console.log('✓ [GET] /api/health');
  res.status(200).json({
    status: 'Server is running',
    timestamp: new Date().toISOString(),
    port: PORT,
    environment: process.env.NODE_ENV,
    emailConfigured: !!process.env.EMAIL_USER,
  });
});

// Test email endpoint
app.post('/api/test-email', async (req, res) => {
  console.log('\n' + '='.repeat(70));
  console.log('🧪 TEST EMAIL ENDPOINT TRIGGERED');
  console.log('='.repeat(70));
  
  try {
    await emailService.sendTestEmail();
    
    res.status(200).json({
      success: true,
      message: 'Test email sent successfully!',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('\n❌ FAILED TO SEND TEST EMAIL');
    console.error(`   Error: ${error.message}`);
    console.error(`   Code: ${error.code}`);
    console.error('='.repeat(70) + '\n');
    
    res.status(500).json({
      success: false,
      message: 'Failed to send test email',
      error: error.message,
      errorCode: error.code,
    });
  }
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  console.log('\n' + '='.repeat(70));
  console.log('[POST] /api/contact - New contact form submission');
  console.log('='.repeat(70));
  
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.warn('⚠️  Validation failed: Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, subject, message) are required',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn(`⚠️  Validation failed: Invalid email format: ${email}`);
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    console.log(`   Name: ${name}`);
    console.log(`   Email: ${email}`);
    console.log(`   Subject: ${subject}`);
    console.log(`   Message length: ${message.length} characters`);
    console.log('✅ All validations passed');

    // Send email via service
    await emailService.sendContactFormEmail({ name, email, subject, message });

    console.log('='.repeat(70) + '\n');

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('\n❌ Failed to send contact email:');
    console.error(`   Error: ${error.message}`);
    console.error(`   Code: ${error.code}`);
    console.error('='.repeat(70) + '\n');
    
    return res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Email service error',
      errorCode: error.code,
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Unexpected error:');
  console.error(`   ${err.message}`);
  console.error(`   Stack: ${err.stack}`);
  
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  console.warn(`⚠️  404 - Not found: ${req.method} ${req.path}`);
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path,
    availableEndpoints: [
      'GET /api/health',
      'POST /api/test-email',
      'POST /api/contact'
    ],
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log('\n' + '='.repeat(70));
  console.log('🚀 SERVER STARTED SUCCESSFULLY');
  console.log('='.repeat(70));
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Environment: ${process.env.NODE_ENV}`);
  console.log(`✅ Backend URL: http://localhost:${PORT}`);
  console.log('\n📍 Available Endpoints:');
  console.log(`   GET  http://localhost:${PORT}/api/health`);
  console.log(`   POST http://localhost:${PORT}/api/test-email (🔑 Use this to debug!)`);
  console.log(`   POST http://localhost:${PORT}/api/contact`);
  console.log('='.repeat(70) + '\n');
});

// Handle server errors
server.on('error', (err) => {
  console.error('❌ Server error:', err.message);
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Try a different port.`);
  }
});
