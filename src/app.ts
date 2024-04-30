import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/env.plugins";
import { MongoDatabase } from "./data/mongo/init";
import { LogModel } from "./data/mongo/models/log.model";
import { Server } from "./presentation/server";

(async() => {
    main();
})()

async function main() {
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    // const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: "LOW",
    //         message: 'Test from node',
    //         origin: 'app.ts'
    //     }
    // })

    // console.log(newLog);

    // const logs = await prisma.logModel.findMany({
    //     where:{
    //         level: "MEDIUM"
    //     },
    //     orderBy:{
    //         createdAt: "desc"
    //     }
    // });
    // console.log(logs);
    



    // const newLog = await LogModel.create({
    //     message: 'Test message from node',
    //     origin: 'App.ts',
    //     level: 'low'
    // })

    // // await newLog.save();
    // // console.log(newLog);

    // const logs = await LogModel.find();
    // console.log(logs);
    


    Server.start();
    // console.log(envs);
    
}