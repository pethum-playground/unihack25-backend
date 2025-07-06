import nodemailer from 'nodemailer';
import logger from './logger.service';

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
    text?: string;
}

class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    async sendEmail(options: EmailOptions): Promise<boolean> {
        try {
            const mailOptions = {
                from: process.env.SMTP_FROM || process.env.SMTP_USER,
                to: options.to,
                subject: options.subject,
                html: options.html,
                text: options.text,
            };

            const result = await this.transporter.sendMail(mailOptions);
            logger.info('Email sent successfully', {
                messageId: result.messageId,
                to: options.to,
                subject: options.subject
            });
            return true;
        } catch (error) {
            logger.error('Failed to send email', {
                error,
                to: options.to,
                subject: options.subject
            });
            return false;
        }
    }

    async sendContractInvitation(email: string, contractName: string, inviterName: string, invitationToken: string): Promise<boolean> {
        const signupUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/signup`;

        const subject = `You've been invited to sign a contract: ${contractName}`;

        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Contract Invitation</h2>
                
                <p>Hello,</p>
                
                <p><strong>${inviterName}</strong> has invited you to sign a contract titled "<strong>${contractName}</strong>".</p>
                
                <p>To proceed with signing this contract, you need to create an account first:</p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${signupUrl}" 
                       style="background-color: #007bff; color: white; padding: 12px 24px; 
                              text-decoration: none; border-radius: 5px; display: inline-block;">
                        Create Account & View Contract
                    </a>
                </div>
                
                <p style="color: #666; font-size: 14px;">
                    If the button doesn't work, copy and paste this link into your browser:<br>
                    <a href="${signupUrl}">${signupUrl}</a>
                </p>
                
                <p style="color: #666; font-size: 12px; margin-top: 30px;">
                    This invitation will expire in 7 days. If you have any questions, 
                    please contact ${inviterName} directly.
                </p>
            </div>
        `;

        const text = `
            You've been invited to sign a contract: ${contractName}
            
            ${inviterName} has invited you to sign a contract. To proceed, please create an account by visiting:
            ${signupUrl}
            
            This invitation will expire in 7 days.
        `;

        return await this.sendEmail({
            to: email,
            subject,
            html,
            text
        });
    }
}

export default new EmailService();
