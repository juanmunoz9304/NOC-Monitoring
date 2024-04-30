import { ILogEntityOptions, LOGSEVERITYLEVEL, LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase{
    execute (url:string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase{

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback, 
        private readonly errorCallback: ErrorCallback,
    ){}
    
    async execute(url: string): Promise<boolean> {
        const logOptions : ILogEntityOptions = {
            message: `Service ${url} up`,
            level: LOGSEVERITYLEVEL.high,
            origin: 'check-service.ts',
        }
        try {
            const req = await fetch(url);
            if(!req.ok){
                throw new Error(`Error on check service ${url}`);
            }
            
            const log = new LogEntity(logOptions);
            this.logRepository.saveLog(log);
            this.successCallback && this.successCallback();            
            return true;
        } catch (error) {
            const errorMessage = `${error} on ${url}`;
            logOptions.level = LOGSEVERITYLEVEL.high;
            logOptions.message = errorMessage;
            const log = new LogEntity(logOptions);
            this.logRepository.saveLog(log);
            this.errorCallback && this.errorCallback(errorMessage);
            return false;
        }
    }
    
}