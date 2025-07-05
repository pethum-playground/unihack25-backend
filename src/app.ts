import express, {NextFunction, Request, Response} from "express";

import auth from "./api/v1/middlewares/auth";
import appRouter from "./api/v1/routes/app.route";

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.express.use(express.json());

        this.express.get("/healthz", (req: any, res: { send: (arg0: string) => any; }) => res.send("Balnzed Support up and running"));

        this.setMiddlewares();
        this.setAppRoutes();
        this.catchErrors();
    }

    private setMiddlewares(): void {
        this.express.use(auth);
    }

    private setAppRoutes(): void {
        this.express.use("/api/v1", appRouter);
    }

    private catchErrors(): void {
    }
}

export default new App().express;
