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
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

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

// Loan application submission endpoint
app.post('/api/contact', async (req, res) => {
  console.log('\n' + '='.repeat(70));
  console.log('[POST] /api/contact - New loan application submission');
  console.log('='.repeat(70));
  
  try {
    console.log('\n📥 REQUEST RECEIVED');
    console.log('Content-Type:', req.get('content-type'));
    console.log('Request Headers:', req.headers);

    console.log('\n📋 RAW REQUEST BODY:');
    console.log(JSON.stringify(req.body, null, 2));

    console.log('\n🔍 PARSING REQUEST BODY:');
    // Extract all loan application fields from request body
    const applicationData = {
      // Personal Info
      firstName: req.body.firstName || '',
      lastName: req.body.lastName || '',
      email: req.body.email || '',
      phone: req.body.phone || '',
      dateOfBirth: req.body.dateOfBirth || '',
      province: req.body.province || '',
      // Employment Info
      employmentStatus: req.body.employmentStatus || '',
      employer: req.body.employer || '',
      jobTitle: req.body.jobTitle || '',
      annualIncome: req.body.annualIncome || '',
      yearsEmployed: req.body.yearsEmployed || '',
      // Loan Info
      loanAmount: req.body.loanAmount || '',
      loanPurpose: req.body.loanPurpose || '',
      details: req.body.details || '',
      // Files (if present)
      t1File: req.body.t1File || null,
      voidChequeFile: req.body.voidChequeFile || null,
    };

    // Log received data
    console.log('📋 Application Data Extracted:');
    console.log(`   Name: ${applicationData.firstName} ${applicationData.lastName}`);
    console.log(`   Email: ${applicationData.email}`);
    console.log(`   Phone: ${applicationData.phone}`);
    console.log(`   Date of Birth: ${applicationData.dateOfBirth}`);
    console.log(`   Province: ${applicationData.province}`);
    console.log(`   Employment Status: ${applicationData.employmentStatus}`);
    console.log(`   Employer: ${applicationData.employer}`);
    console.log(`   Job Title: ${applicationData.jobTitle}`);
    console.log(`   Annual Income: $${applicationData.annualIncome}`);
    console.log(`   Years Employed: ${applicationData.yearsEmployed}`);
    console.log(`   Loan Amount: $${applicationData.loanAmount}`);
    console.log(`   Loan Purpose: ${applicationData.loanPurpose}`);
    console.log(`   Details: ${applicationData.details}`);
    console.log(`   T1 File: ${applicationData.t1File ? `Present (${applicationData.t1File.name}, ${applicationData.t1File.size} bytes)` : 'Not provided'}`);
    console.log(`   Void Cheque: ${applicationData.voidChequeFile ? `Present (${applicationData.voidChequeFile.name}, ${applicationData.voidChequeFile.size} bytes)` : 'Not provided'}`);

    console.log('\n✅ Data extraction successful');
    console.log('📧 Preparing to send email...');

    // Send email via service
    await emailService.sendLoanApplicationEmail(applicationData);

    console.log('\n✅ EMAIL SENT SUCCESSFULLY');
    console.log('='.repeat(70));

    return res.status(200).json({
      success: true,
      message: 'Application submitted and email sent successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('\n❌ FAILED TO PROCESS LOAN APPLICATION');
    console.error('='.repeat(70));
    console.error(`Error Message: ${error.message}`);
    console.error(`Error Code: ${error.code}`);
    console.error(`Error Name: ${error.name}`);
    if (error.stack) {
      console.error(`Stack Trace:\n${error.stack}`);
    }
    console.error('='.repeat(70) + '\n');
    
    return res.status(500).json({
      success: false,
      message: 'Failed to submit application',
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
