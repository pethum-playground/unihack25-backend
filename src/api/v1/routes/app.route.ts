import {Router} from "express";


const appRouter: Router = Router();

appRouter.use("/test", () => {
    console.log("Test route hit");
});

export default appRouter;
