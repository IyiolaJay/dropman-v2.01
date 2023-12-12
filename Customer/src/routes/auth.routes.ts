import { Router } from "express";
import { createUserAccount, userLogin, verifyUser } from "../controllers/auth.controller";
import { validateRequest } from "../utils/api.utils";
import { signInValidator, signUpValidator } from "../middlewares/validators/auth.validator";
import { authenticateUser } from "../middlewares/auth.middleware";

const route = Router();

route.post("/create", validateRequest(signUpValidator),createUserAccount);
route.post("/login", validateRequest(signInValidator), userLogin);
route.patch("/verify/:token", authenticateUser,verifyUser);

export default route;