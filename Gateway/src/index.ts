import expressApp from './app';
import { Express } from 'express';


const port = process.env.PORT;

const startApp =  (app : Express, port: any)=>{
    
    app.listen(port, async()=>{
        console.log(port);
        console.log(`Gateway is live an listening on port http://localhost:${Number(port)}`);
    })
}

startApp(expressApp, port);