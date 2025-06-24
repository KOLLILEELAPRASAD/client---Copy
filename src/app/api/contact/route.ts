import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Define the expected form data structure
interface FormData {
  name: string;
  email: string;
  phone: string;
  websiteType: string;
  serviceType: string;
  budget: string;
  description: string;
}

// Hardcoded credentials for reliability
const EMAIL_USER = '7pavankumar9@gmail.com';
const EMAIL_PASS = 'vtsw ywno otss fxjr';
const RECEIVER_EMAIL = '7dvpavankumar9@gmail.com';

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body: FormData = await req.json();

    // Destructure form data
    const { name, email, phone, websiteType, serviceType, budget, description } = body;

    // Validate required fields (basic validation)
    if (!name || !email || !phone || !websiteType || !serviceType || !budget || !description) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Phone validation (basic)
    const phoneRegex = /^\+?[0-9\s\-\(\)]{8,20}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ error: 'Invalid phone number format' }, { status: 400 });
    }

    // Budget validation based on website type
    const budgetNum = parseInt(budget);
    let minBudget = 5000; // Default minimum

    // Set minimum budget based on website type
    if (websiteType === 'Static Website') {
      minBudget = 5000;
    } else if (websiteType === 'Dynamic Website') {
      minBudget = 7000;
    } else if (websiteType === 'Web Application') {
      minBudget = 15000;
    }

    if (isNaN(budgetNum) || budgetNum < minBudget) {
      return NextResponse.json({
        error: `Budget must be at least ₹${minBudget.toLocaleString()} for ${websiteType}`
      }, { status: 400 });
    }

    console.log('Creating transporter with credentials:', {
      user: EMAIL_USER,
      pass: EMAIL_PASS ? 'Password provided' : 'No password provided'
    });

    // Create a transporter object using Gmail with OAuth2
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false // Helps with some Gmail connection issues
      }
    });

    // Format the current date
    const currentDate = new Date().toLocaleString('en-IN', {
      dateStyle: 'full',
      timeStyle: 'medium',
      timeZone: 'Asia/Kolkata'
    });

    // Email content with improved HTML formatting
    const mailOptions = {
      from: `"CoreBlock Website" <${EMAIL_USER}>`,
      to: RECEIVER_EMAIL,
      subject: `New Project Inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">New Project Inquiry</h2>

          <p style="color: #666; font-size: 14px;">Submitted on: ${currentDate}</p>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #f0f0f0; font-weight: bold; width: 30%;">Name:</td>
              <td style="padding: 8px; border-bottom: 1px solid #f0f0f0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Email:</td>
              <td style="padding: 8px; border-bottom: 1px solid #f0f0f0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Phone:</td>
              <td style="padding: 8px; border-bottom: 1px solid #f0f0f0;"><a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Website Type:</td>
              <td style="padding: 8px; border-bottom: 1px solid #f0f0f0;">${websiteType}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Service Type:</td>
              <td style="padding: 8px; border-bottom: 1px solid #f0f0f0;">${serviceType}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #f0f0f0; font-weight: bold;">Budget:</td>
              <td style="padding: 8px; border-bottom: 1px solid #f0f0f0;">₹${budget}</td>
            </tr>
          </table>

          <div style="margin-top: 20px;">
            <h3 style="color: #333; font-size: 16px;">Project Description:</h3>
            <p style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; white-space: pre-line;">${description}</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #f0f0f0; font-size: 12px; color: #999;">
            <p>This is an automated email sent from your CoreBlock website contact form.</p>
          </div>
        </div>
      `,
    };

    // Send confirmation email to the user
    const userConfirmationOptions = {
      from: `"CoreBlock" <${EMAIL_USER}>`,
      to: email,
      subject: `Thank you for contacting CoreBlock`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">Thank You for Contacting Us</h2>

          <p style="margin-top: 20px; line-height: 1.6;">Dear ${name},</p>

          <p style="line-height: 1.6;">Thank you for reaching out to CoreBlock. We have received your inquiry and our team will review your requirements shortly.</p>

          <p style="line-height: 1.6;">We typically respond within 24 hours during business days. If your matter is urgent, please feel free to call us directly.</p>

          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin-top: 20px;">
            <h3 style="color: #333; font-size: 16px; margin-top: 0;">Your Request Summary:</h3>
            <ul style="padding-left: 20px;">
              <li><strong>Website Type:</strong> ${websiteType}</li>
              <li><strong>Service Type:</strong> ${serviceType}</li>
              <li><strong>Budget:</strong> ₹${budget}</li>
            </ul>
          </div>

          <p style="margin-top: 20px; line-height: 1.6;">We look forward to discussing your project in detail and helping you achieve your goals.</p>

          <p style="line-height: 1.6;">Best regards,<br>The CoreBlock Team</p>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #f0f0f0; font-size: 12px; color: #999;">
            <p>This is an automated response. Please do not reply to this email.</p>
          </div>
        </div>
      `,
    };

    try {
      // Skip verification as it often fails with Gmail
      console.log('Attempting to send admin email...');

      // Send email to admin
      const adminEmailResult = await transporter.sendMail(mailOptions);
      console.log('Admin email sent successfully:', adminEmailResult.messageId);

      console.log('Attempting to send user confirmation email...');
      // Send confirmation email to user
      const userEmailResult = await transporter.sendMail(userConfirmationOptions);
      console.log('User confirmation email sent successfully:', userEmailResult.messageId);

      return NextResponse.json({
        message: 'Your message has been sent successfully! We will contact you soon.',
        adminEmailId: adminEmailResult.messageId,
        userEmailId: userEmailResult.messageId
      }, { status: 200 });
    } catch (error) {
      console.error('Error sending email:', error);

      // Type guard for error object
      const emailError = error as NodemailerError;

      // Provide more specific error messages based on the error type
      if (emailError.code === 'EAUTH') {
        throw new Error('Authentication failed. Please check your email credentials.');
      } else if (emailError.code === 'ESOCKET' || emailError.code === 'ECONNECTION') {
        throw new Error('Could not connect to email server. Please try again later.');
      } else {
        throw new Error(`Email sending failed: ${emailError.message || 'Unknown error'}`);
      }
    }
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Failed to process your request. Please try again later.'
    }, { status: 500 });
  }
}