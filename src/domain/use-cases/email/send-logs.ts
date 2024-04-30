import { EmailService } from "../../../presentation/email/email.service";
import { LOGSEVERITYLEVEL, LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";


interface ISendEmailLogUseCase{
    execute : (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements ISendEmailLogUseCase{

    constructor(
        private emailService : EmailService,
        private logRepository: LogRepository
    ){}

    async execute (to: string | string[]) {
        
        try {
            const sent = await this.emailService.sendEmailWithFileLogs(to);
            if(!sent){
                throw new Error('Email log was not stored');
            }
            const log : LogEntity = {
                level: LOGSEVERITYLEVEL.low,
                message: 'Email was successfully sent',
                origin: 'send-logs.ts',
            }
            this.logRepository.saveLog(log)
            return true;
        } catch (error) {
            const log : LogEntity = {
                level: LOGSEVERITYLEVEL.high,
                message: 'Email was not able to send',
                origin: 'send-logs.ts',
            }
            this.logRepository.saveLog(log)
            return false;   
        }

    }
    
    
    

}