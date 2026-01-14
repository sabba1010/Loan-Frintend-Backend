import nodemailer from 'nodemailer';

/**
 * Email Service - Handles all email operations
 * - Initializes Nodemailer transporter
 * - Verifies SMTP connection
 * - Sends emails with error handling
 * - Logs all operations to console
 */

class EmailService {
  constructor() {
    this.transporter = null;
    this.isReady = false;
  }

  /**
   * Initialize the email transporter
   * Called once when the application starts
   */
  async initialize() {
    console.log('\n' + '='.repeat(70));
    console.log('📧 EMAIL SERVICE INITIALIZATION');
    console.log('='.repeat(70));

    // Validate environment variables
    const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASSWORD', 'EMAIL_FROM', 'EMAIL_TO'];
    const missingVars = requiredEnvVars.filter(v => !process.env[v]);

    if (missingVars.length > 0) {
      console.error('❌ CRITICAL: Missing environment variables:', missingVars.join(', '));
      console.error('Please check your .env file');
      this.isReady = false;
      return;
    }

    console.log('✅ All required environment variables found');
    console.log(`   EMAIL_USER: ${process.env.EMAIL_USER}`);
    console.log(`   EMAIL_FROM: ${process.env.EMAIL_FROM}`);
    console.log(`   EMAIL_TO: ${process.env.EMAIL_TO}`);

    try {
      console.log('\n🔧 Creating Nodemailer transporter...');

      // Create transporter with Gmail SMTP settings
      // Works for Gmail accounts and custom domains forwarded through Gmail
      this.transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // TLS (not SSL)
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
          minVersion: 'TLSv1.2',
        },
        logger: true,
        debug: true,
      });

      console.log('✅ Transporter created successfully');

      // Verify transporter connection
      console.log('\n🧪 Verifying SMTP connection...');
      await new Promise((resolve, reject) => {
        this.transporter.verify((error, success) => {
          if (error) {
            console.error('❌ SMTP VERIFICATION FAILED');
            console.error(`   Error: ${error.message}`);
            console.error(`   Code: ${error.code}`);
            console.error(`   Response: ${error.response}`);
            console.error('\n⚠️  Troubleshooting:');
            console.error('   1. Check EMAIL_PASSWORD has no spaces');
            console.error('   2. Verify EMAIL_PASSWORD is an App Password (not regular password)');
            console.error('   3. Enable 2FA on your email account');
            console.error('   4. Check Gmail security alerts');
            console.error('   5. Verify EMAIL_USER is correct');
            this.isReady = false;
            reject(error);
          } else {
            console.log('✅ SMTP CONNECTION VERIFIED');
            console.log('   Ready to send emails!');
            this.isReady = true;
            resolve();
          }
        });
      });

      console.log('='.repeat(70) + '\n');
    } catch (error) {
      console.error('\n❌ FAILED TO INITIALIZE EMAIL SERVICE');
      console.error(`   Error: ${error.message}`);
      console.error(`   Code: ${error.code}`);
      if (error.stack) {
        console.error(`   Stack: ${error.stack}`);
      }
      console.error('='.repeat(70) + '\n');
      this.isReady = false;
      throw error;
    }
  }

  /**
   * Send an email
   * @param {Object} mailOptions - Email options
   * @param {string} mailOptions.from - From address
   * @param {string} mailOptions.to - To address
   * @param {string} mailOptions.subject - Email subject
   * @param {string} mailOptions.html - HTML content
   * @param {string} [mailOptions.text] - Plain text content
   * @param {string} [mailOptions.replyTo] - Reply-to address
   * @returns {Promise<Object>} Email sending result
   */
  async sendEmail(mailOptions) {
    // Validate input
    if (!mailOptions.to || !mailOptions.subject || (!mailOptions.html && !mailOptions.text)) {
      const error = new Error('Missing required email options: to, subject, and (html or text)');
      console.error(`❌ ${error.message}`);
      throw error;
    }

    // Ensure transporter is ready
    if (!this.isReady) {
      const error = new Error('Email service is not ready. Transporter verification failed.');
      console.error(`❌ ${error.message}`);
      throw error;
    }

    try {
      console.log('\n🚀 SENDING EMAIL');
      console.log('='.repeat(70));
      console.log(`📤 From: ${mailOptions.from}`);
      console.log(`📥 To: ${mailOptions.to}`);
      console.log(`📌 Subject: ${mailOptions.subject}`);
      if (mailOptions.replyTo) {
        console.log(`↩️  Reply-To: ${mailOptions.replyTo}`);
      }
      console.log(`📝 Content: ${mailOptions.html ? 'HTML' : 'Text'}`);

      const startTime = Date.now();
      console.log('\n⏳ Attempting to send via SMTP...');

      const info = await this.transporter.sendMail(mailOptions);

      const elapsed = Date.now() - startTime;
      console.log('\n✅ EMAIL SENT SUCCESSFULLY!');
      console.log(`   Message ID: ${info.messageId}`);
      console.log(`   Response: ${info.response}`);
      console.log(`   Time: ${elapsed}ms`);
      console.log('='.repeat(70) + '\n');

      return {
        success: true,
        messageId: info.messageId,
        response: info.response,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('\n❌ EMAIL SEND FAILED');
      console.error('='.repeat(70));
      console.error(`Error Message: ${error.message}`);
      console.error(`Error Code: ${error.code}`);
      console.error(`Error Response: ${error.response}`);

      if (error.stack) {
        console.error(`\nStack Trace:\n${error.stack}`);
      }

      console.error('\n🔍 Debugging Information:');
      console.error(`   - SMTP Host: smtp.gmail.com:587`);
      console.error(`   - Email From: ${mailOptions.from}`);
      console.error(`   - Email To: ${mailOptions.to}`);
      console.error(`   - Transporter Ready: ${this.isReady}`);
      console.error('\n💡 Possible Solutions:');
      console.error('   1. Check EMAIL_PASSWORD - remove any spaces');
      console.error('   2. Verify it\'s an App Password, not regular password');
      console.error('   3. Enable 2FA on your email account');
      console.error('   4. Check for Gmail security alerts');
      console.error('   5. Verify EMAIL_USER and EMAIL_FROM are correct');
      console.error('   6. Check firewall/network blocking port 587');
      console.error('='.repeat(70) + '\n');

      throw error;
    }
  }

  /**
   * Send a test email to verify setup
   * @returns {Promise<Object>} Email sending result
   */
  async sendTestEmail() {
    const testMailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: '🧪 Test Email - Nodemailer Configuration Check',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #ecf0f1; border-radius: 8px; border-left: 4px solid #2ecc71;">
          <h2 style="color: #2ecc71; margin-top: 0;">✅ Test Email Successful!</h2>
          <p>If you're reading this, your Nodemailer configuration is working correctly.</p>
          <hr style="border: none; border-top: 1px solid #bdc3c7; margin: 20px 0;">
          <h3 style="color: #34495e;">Configuration Details:</h3>
          <ul style="color: #555; line-height: 1.8;">
            <li><strong>From:</strong> ${process.env.EMAIL_FROM}</li>
            <li><strong>To:</strong> ${process.env.EMAIL_TO}</li>
            <li><strong>SMTP Host:</strong> smtp.gmail.com</li>
            <li><strong>SMTP Port:</strong> 587 (TLS)</li>
            <li><strong>Server Time:</strong> ${new Date().toLocaleString()}</li>
            <li><strong>Environment:</strong> ${process.env.NODE_ENV}</li>
          </ul>
          <hr style="border: none; border-top: 1px solid #bdc3c7; margin: 20px 0;">
          <p style="color: #7f8c8d; font-size: 12px;">
            This is an automated test email from your Node.js backend. 
            If you received this, your email configuration is working properly!
          </p>
        </div>
      `,
    };

    return this.sendEmail(testMailOptions);
  }

  /**
   * Send a contact form email
   * @param {Object} formData - Contact form data
   * @param {string} formData.name - Sender's name
   * @param {string} formData.email - Sender's email
   * @param {string} formData.subject - Email subject
   * @param {string} formData.message - Email message
   * @returns {Promise<Object>} Email sending result
   */
  async sendContactFormEmail(formData) {
    const { name, email, subject, message } = formData;

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission: ${subject}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #555;">Name:</strong>
            <p style="margin: 5px 0; color: #666;">${this._escapeHtml(name)}</p>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #555;">Email:</strong>
            <p style="margin: 5px 0; color: #666;">${this._escapeHtml(email)}</p>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #555;">Subject:</strong>
            <p style="margin: 5px 0; color: #666;">${this._escapeHtml(subject)}</p>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #555;">Message:</strong>
            <p style="margin: 5px 0; color: #666; white-space: pre-wrap;">${this._escapeHtml(message)}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">Sent on ${new Date().toLocaleString()}</p>
        </div>
      `,
    };

    return this.sendEmail(mailOptions);
  }

  /**
   * Escape HTML special characters to prevent injection
   * @private
   * @param {string} text - Text to escape
   * @returns {string} Escaped text
   */
  _escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }
}

// Export singleton instance
export const emailService = new EmailService();
