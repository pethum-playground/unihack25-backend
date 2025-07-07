import nodemailer from 'nodemailer';
import logger from './logger.service';
import {emailConfigs, frontendUrl} from "../../config/constant";
import QRCode from 'qrcode';

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
    text?: string;
    attachments?: Array<{
        filename: string;
        content: Buffer;
        cid?: string;
    }>;
}

class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: emailConfigs.host,
            port: emailConfigs.port,
            secure: false,
            auth: {
                user: emailConfigs.user,
                pass: emailConfigs.password,
            },
        });
    }

    async sendEmail(options: EmailOptions): Promise<boolean> {
        try {
            const mailOptions = {
                from: emailConfigs.user,
                to: options.to,
                subject: options.subject,
                html: options.html,
                text: options.text,
                attachments: options.attachments,
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

    async sendContractInvitation(email: string, contractName: string, inviterName: string, plainPassword: string, invitationToken: string): Promise<boolean> {
        const signupUrl = `${frontendUrl}`;

        const subject = `You've been invited to sign a contract: ${contractName}`;

        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Contract Invitation</h2>
                
                <p>Hello,</p>
                
                <p><strong>${inviterName}</strong> has invited you to sign a contract titled "<strong>${contractName}</strong>".</p>
                
                <p>To proceed with signing this contract, you need to create an account first:</p>
                <p>Temporary Password: ${plainPassword}</p>
                
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

    async sendContractQRCodeBulk(
        recipients: Array<{email: string, name: string}>,
        contractName: string,
        contractId: number,
        contractAddress: string
    ): Promise<boolean> {
        try {
            const qrCodeDataURL = await QRCode.toBuffer(contractAddress);

            const recipientEmails = recipients.map(r => r.email).join(', ');
            const subject = `Contract QR Code: ${contractName}`;

            const html = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Contract Access QR Code</h2>
                    
                    <p>Hello,</p>
                    
                    <p>Here is the QR code to access the contract "<strong>${contractName}</strong>":</p>
                    
                    <div style="text-align: center; margin: 30px 0; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
                        <img src="cid:contractQRCode" alt="Contract QR Code" style="max-width: 256px; height: auto;" />
                    </div>
                    
                    <div style="background-color: #e9ecef; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p style="margin: 0; font-weight: bold; color: #495057;">Contract Address:</p>
                        <p style="margin: 5px 0 0 0; font-family: monospace; word-break: break-all; color: #6c757d;">${contractAddress}</p>
                    </div>
                    
                    <p style="color: #666; font-size: 14px;">
                        You can scan this QR code with any QR code reader to quickly access the contract address.
                        You can also visit the contract directly at:
                        <br><a href="${frontendUrl}/contracts/${contractId}">${frontendUrl}/contracts/${contractId}</a>
                    </p>
                    
                    <p style="color: #666; font-size: 12px; margin-top: 30px;">
                        Keep this QR code safe as it provides direct access to your contract.
                    </p>
                </div>
            `;

            const text = `
                Contract QR Code: ${contractName}
                
                Here is the contract address for "${contractName}":
                ${contractAddress}
                
                You can access the contract at: ${frontendUrl}/contract/${contractId}
            `;

            return await this.sendEmail({
                to: recipientEmails,
                subject,
                html,
                text,
                attachments: [
                    {
                        filename: 'contract_qr_code.png',
                        content: qrCodeDataURL,
                        cid: 'contractQRCode'
                    }
                ]
            });
        } catch (error) {
            logger.error('Failed to generate or send bulk QR code', {
                error,
                recipients: recipients.map(r => r.email),
                contractAddress
            });
            return false;
        }
    }
}

export default new EmailService();
