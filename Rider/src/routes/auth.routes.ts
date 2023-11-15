import { Router } from "express";
import { signUpValidator } from "../middlewares/validators/auth.validator";
import { createRiderAccount } from "../controllers/auth.controller";
import {validateRequest} from "../utils/api.utils";

const route = Router();

route.post("/create", validateRequest(signUpValidator),createRiderAccount);


export default route;