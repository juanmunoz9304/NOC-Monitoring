import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LOGSEVERITYLEVEL } from "../../domain/entities/log.entity";
import { LogModel } from '../../data/mongo/models/log.model';


export class MongoDatalogDatasource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        console.log('Mongo log stored', newLog.id);
        
    }
    async getLogs(severityLevel: LOGSEVERITYLEVEL): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level : severityLevel
        });
        return logs.map((log) => LogEntity.fromMongoose(log));
    }
    
}