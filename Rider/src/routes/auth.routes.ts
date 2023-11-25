import { Router } from "express";
import { signInValidator, signUpValidator } from "../middlewares/validators/auth.validator";
import { createRiderAccount, userLogin } from "../controllers/auth.controller";
import {validateRequest} from "../utils/api.utils";

const route = Router();

route.post("/create", validateRequest(signUpValidator),createRiderAccount);
route.post("/login", validateRequest(signInValidator),userLogin);


export default route;