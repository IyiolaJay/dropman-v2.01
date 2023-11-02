import "dotenv/config";
import express, {Request, Response} from "express";
import cors from "cors";
import { err404NotFound } from "./errors/middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.get("/", (_:Request, res: Response)=>{
    res.status(200).json({
        message: "Customer service is live and running",
    })
});

app.use(err404NotFound);



export default app