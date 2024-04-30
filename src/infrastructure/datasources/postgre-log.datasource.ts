import { PrismaClient, SEVERITYLEVEL } from "@prisma/client";
import { LogModel } from "../../data/mongo/models/log.model";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LOGSEVERITYLEVEL } from "../../domain/entities/log.entity";

const prisma = new PrismaClient();
const severityEnum = {
    low: SEVERITYLEVEL.LOW,
    medium: SEVERITYLEVEL.MEDIUM,
    high: SEVERITYLEVEL.HIGH
}

export class PostgreLogDatasource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {
        const level = severityEnum[log.level];
        const newLog = await prisma.logModel.create({
            data:{
                ...log,
                level
            }
        })
        console.log('Log saved on DB', newLog);
        
    }
    async getLogs(severityLevel: LOGSEVERITYLEVEL): Promise<LogEntity[]> {
        const level = severityEnum[severityLevel];
        const logs = await prisma.logModel.findMany({
            where:{
                level
            }
        })
        return logs.map((log) => LogEntity.fromSQL(log))             
    }
    
}