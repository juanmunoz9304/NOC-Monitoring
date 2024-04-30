import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoDatalogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgreLogDatasource } from "../infrastructure/datasources/postgre-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from './email/email.service';

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
    // new MongoDatalogDatasource()
    // new PostgreLogDatasource()
)
const mongoLogRepository = new LogRepositoryImpl(
    // new FileSystemDatasource()
    new MongoDatalogDatasource()
    // new PostgreLogDatasource()
)
const sqlLogRepository = new LogRepositoryImpl(
    // new FileSystemDatasource()
    // new MongoDatalogDatasource()
    new PostgreLogDatasource()
)


const emailService = new EmailService();

export class Server {
    public static start() {
        CronService.createJob('*/10 * * * * *', () => {
            // new CheckService().execute('http://localhost:3000/')          
            new CheckServiceMultiple(
                [fsLogRepository,
                mongoLogRepository,
                sqlLogRepository],
                () => console.log('success'),
                (error) => console.log(error),                
            ).execute('http://localhost:3000/')          
        });



        // new SendEmailLogs(emailService, logRepository).execute('sebastianmo394@gmail.com')

        // const emailService = new EmailService();
        // emailService.sendEmail({
        //     to: 'sebastianmo394@gmail.com',
        //     subject: 'test',
        //     htmlBody: '<h3>hello</h3>'
        // })

        // emailService.sendEmailWithFileLogs('sebastianmo394@gmail.com');
    }
}