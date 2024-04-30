import { error } from "console";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LOGSEVERITYLEVEL } from "../../domain/entities/log.entity";
import fs from 'fs';


export class FileSystemDatasource implements LogDatasource {

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor(){
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if(!fs.existsSync(this.logPath)){
            fs.mkdirSync(this.logPath);
        }
        
        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach((path) => {
            if(fs.existsSync(path))return;
            fs.writeFileSync(path, '');
        })

        
    }

    async saveLog(newLog: LogEntity): Promise<void> {
        const logAsJson = `${JSON.stringify(newLog)}\n`;
        fs.appendFileSync(this.allLogsPath, logAsJson);
        if(newLog.level === LOGSEVERITYLEVEL.low) return;
        if(newLog.level === LOGSEVERITYLEVEL.medium){
            fs.appendFileSync(this.mediumLogsPath, logAsJson)
        }else{
            fs.appendFileSync(this.highLogsPath, logAsJson)
        }
    }


    private getLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8');
        const splittedLogs = content.split('\n').map((log) => LogEntity.fromJson(log));
        return splittedLogs;        
    }

    async getLogs(severityLevel: LOGSEVERITYLEVEL): Promise<LogEntity[]> {
        switch (severityLevel) {
            case LOGSEVERITYLEVEL.low:
                return this.getLogsFromFile(this.allLogsPath);
            case LOGSEVERITYLEVEL.medium:
                return this.getLogsFromFile(this.mediumLogsPath)
            case LOGSEVERITYLEVEL.high:
                return this.getLogsFromFile(this.highLogsPath)
        
            default:
                throw new Error(`Severity level ${severityLevel} not implemented`);
        }
    }
    
}