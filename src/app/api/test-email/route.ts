import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Hardcoded credentials for reliability
const EMAIL_USER = '7pavankumar9@gmail.com';
const EMAIL_PASS = 'vtsw ywno otss fxjr';
const RECEIVER_EMAIL = '7dvpavankumar9@gmail.com';

export async function GET() {
  try {
    console.log('Testing email configuration...');
    
    // Create a transporter object using Gmail
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    
    // Test the connection
    const verifyResult = await new Promise((resolve, reject) => {
      transporter.verify(function (error, success) {
        if (error) {
          console.error('SMTP connection verification failed:', error);
          reject(error);
        } else {
          console.log('SMTP server is ready to take our messages');
          resolve(success);
        }
      });
    });
    
    // Send a test email
    const testMailOptions = {
      from: `"Test Email" <${EMAIL_USER}>`,
      to: RECEIVER_EMAIL,
      subject: 'Test Email from CoreBlock Website',
      text: 'This is a test email to verify the email configuration is working correctly.',
      html: '<p>This is a test email to verify the email configuration is working correctly.</p>'
    };
    
    const info = await transporter.sendMail(testMailOptions);
    
    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      messageId: info.messageId,
      verifyResult
    });
  } catch (error) {
    console.error('Test email error:', error);

    // Type guard for error object
    const emailError = error as NodemailerError;

    return NextResponse.json({
      success: false,
      error: emailError.message || 'Unknown error',
      code: emailError.code,
      command: emailError.command,
      stack: emailError.stack
    }, { status: 500 });
  }
}