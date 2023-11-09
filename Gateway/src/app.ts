import "dotenv/config";
import express, {Request, Response} from "express";
import cors from "cors";
import { serveSwaggerDocs } from "./docs/swagger.doc";
import proxy from  "express-http-proxy";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.get("/", (_:Request, res: Response)=>{
    res.status(200).json({
        message: "Gateway is live and running",
    })
});
app.use("/customer", proxy("http://localhost:5001"));
app.use("/rider", proxy("http://localhost:5003"));

serveSwaggerDocs(app, 5000);



export default app