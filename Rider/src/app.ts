import "dotenv/config";
import express, {Request, Response} from "express";
import cors from "cors";
import { err404NotFound } from "./errors/middlewares/error.middleware";
import { riderEvent } from "./middlewares/event.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.get("/", (_:Request, res: Response)=>{
    res.status(200).json({
        message: "Gateway is live and running",
    })
});
riderEvent(app);

app.use(err404NotFound);


export default app