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
app.use("/api/v2/customer", proxy(process.env.CUSTOMER_PROXY || ""));
app.use("/api/v2/request", proxy(process.env.REQUEST_PROXY || ""));
app.use("/api/v2/rider", proxy(process.env.RIDER_PROXY || ""));

serveSwaggerDocs(app, Number(process.env.PORT) ?? 5000);



export default app