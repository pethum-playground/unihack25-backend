import {Router} from "express";
import authRoute from "./auth.route";

const appRouter: Router = Router();

appRouter.use("/auth", authRoute);

export default appRouter;
