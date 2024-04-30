import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/env.plugins';

interface ISendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

interface Attachment {
    fileName: string;
    path: string;
}

export class EmailService{
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    async sendEmail(options: ISendMailOptions): Promise<boolean>{
        const {to, subject, htmlBody, attachments} = options;

        try {
            const sentInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            })

            console.log(sentInformation);
            return true;
        } catch (error) {
            return false;
        }
    }
    

    async sendEmailWithFileLogs(to: string | string[]){
        const subject = 'Logs del servidor';
        const htmlBody = `
        <h1>hello</h1>
        <br>
        <p>testing</p>
        `;
        const attachments : Attachment[] = [
            {
                fileName: 'logs-all',
                path: './logs/logs-all.log'
            },
            {
                fileName: 'logs-high',
                path: './logs/logs-high.log'
            },
            {
                fileName: 'logs-medium',
                path: './logs/logs-medium.log'
            },
        ]

        return this.sendEmail({
            to,
            subject,
            htmlBody,
            attachments
        })
    }
}