import {Router} from "express";
import userRoute from "./user.route";

const appRouter: Router = Router();

appRouter.use("/users", userRoute);

export default appRouter;
