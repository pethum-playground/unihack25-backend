import {Router} from "express";
import AuthController from "../controllers/auth.controller";
import UserController from "../controllers/user.controller";

const userRoute: Router = Router();
const controller = new UserController()

userRoute.post("/initial-enable", controller.initialEnable);

export default userRoute;


