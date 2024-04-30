export enum LOGSEVERITYLEVEL {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface ILogEntityOptions {
    message: string;
    level: LOGSEVERITYLEVEL;
    createdAt?: Date;
    origin: string;
}

export class LogEntity{
    public level: LOGSEVERITYLEVEL;
    public message: string;
    public createdAt?: Date;
    public origin: string;

    constructor({message, level, origin, createdAt = new Date()}: ILogEntityOptions){
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    static fromJson = (json : string): LogEntity => {
        const {message, level, createdAt = new Date(), origin} = JSON.parse(json) as LogEntity;
        const log = new LogEntity({message, level, origin, createdAt});
        log.createdAt = createdAt
        return log;
    }

    static fromMongoose = (object: {[key: string]: any}) : LogEntity => {
        const {message, level, createdAt, origin} = object;
        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin
        });

        return log;
    }

    static fromSQL = (object: {[key: string]: any}) : LogEntity => {
        const {message, level, createdAt, origin} = object;
        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin
        });

        return log;
    }
}