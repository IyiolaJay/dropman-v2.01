import { connectToDatabase } from './database';
import expressApp from './app';
import { Express } from 'express';


const port = process.env.PORT;

const startApp =  (app : Express, port: any)=>{
    
    app.listen(port, async()=>{
        await connectToDatabase();
        console.log(`Customer service is live an listening on port ${port}`);
    })
}

startApp(expressApp, port);