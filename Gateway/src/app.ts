import "dotenv/config";
import express, {Request, Response} from "express";
import cors from "cors";
import { serveSwaggerDocs } from "./docs/swagger.doc";
// import proxy from  "express-http-proxy";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.get("/", (_:Request, res: Response)=>{
    res.status(200).json({
        message: "Gateway is live and running",
    })
});

serveSwaggerDocs(app, 5000);



export default app