const nodemailer = require('nodemailer');

const config = require('../config');
const logger = require('../utils/logger');

// Create transporter
const transporter = nodemailer.createTransport({
  host: config.email.smtp.host,
  port: config.email.smtp.port,
  secure: config.email.smtp.port === 465,
  auth: {
    user: config.email.smtp.user,
    pass: config.email.smtp.password,
  },
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    logger.error('Email service error:', error);
  } else {
    logger.info('Email service ready');
  }
});

/**
 * Send email
 */
const sendEmail = async (options) => {
  const mailOptions = {
    from: options.from || config.email.from,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
    attachments: options.attachments,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error('Send email error:', error);
    throw error;
  }
};

/**
 * Send welcome email
 */
const sendWelcomeEmail = async (to, name) => {
  await sendEmail({
    to,
    subject: 'Welcome to Our Platform!',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1>Welcome, ${name}!</h1>
        <p>Thank you for joining our platform.</p>
        <p>Get started by exploring our features.</p>
        <a href="${config.appUrl}/dashboard" 
           style="background: #007bff; color: white; padding: 10px 20px; 
                  text-decoration: none; border-radius: 5px; display: inline-block;">
          Go to Dashboard
        </a>
      </div>
    `,
  });
};

/**
 * Send password reset email
 */
const sendPasswordResetEmail = async (to, token) => {
  const resetUrl = `${config.appUrl}/reset-password?token=${token}`;

  await sendEmail({
    to,
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Password Reset Request</h2>
        <p>You requested to reset your password.</p>
        <p>Click the button below to reset your password:</p>
        <a href="${resetUrl}" 
           style="background: #dc3545; color: white; padding: 10px 20px; 
                  text-decoration: none; border-radius: 5px; display: inline-block;">
          Reset Password
        </a>
        <p>If you didn't request this, please ignore this email.</p>
        <p>This link expires in 1 hour.</p>
      </div>
    `,
  });
};

/**
 * Send verification email
 */
const sendVerificationEmail = async (to, token) => {
  const verifyUrl = `${config.appUrl}/verify-email?token=${token}`;

  await sendEmail({
    to,
    subject: 'Verify Your Email',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Email Verification</h2>
        <p>Please verify your email address by clicking the button below:</p>
        <a href="${verifyUrl}" 
           style="background: #28a745; color: white; padding: 10px 20px; 
                  text-decoration: none; border-radius: 5px; display: inline-block;">
          Verify Email
        </a>
        <p>If you didn't create an account, please ignore this email.</p>
      </div>
    `,
  });
};

/**
 * Send notification email
 */
const sendNotificationEmail = async (to, subject, message) => {
  await sendEmail({
    to,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>${subject}</h2>
        <p>${message}</p>
      </div>
    `,
  });
};

/**
 * Send email with template
 */
const sendTemplateEmail = async (to, templateName, data) => {
  // Load template (можно использовать ejs, pug, handlebars)
  const template = loadTemplate(templateName);
  const html = renderTemplate(template, data);

  await sendEmail({
    to,
    subject: data.subject,
    html,
  });
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendVerificationEmail,
  sendNotificationEmail,
  sendTemplateEmail,
};
