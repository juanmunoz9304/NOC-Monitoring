import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LOGSEVERITYLEVEL } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";


export class LogRepositoryImpl implements LogRepository{

    constructor(private logDatasource: LogDatasource){}

    async saveLog(log: LogEntity): Promise<void> {
        this.logDatasource.saveLog(log);
    }

    async getLogs(severityLevel: LOGSEVERITYLEVEL): Promise<LogEntity[]> {
        return this.logDatasource.getLogs(severityLevel);
    }
    
}