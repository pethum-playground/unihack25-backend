import { Router } from "express";
import ContractController from "../controllers/contract.controller";
import multer from "multer";

const contractRoute: Router = Router();
const controller = new ContractController();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } //10 MB limit
});

contractRoute.post("/verify-user", controller.verifyUser);
contractRoute.post("/", upload.single('document'), controller.create);
contractRoute.get("/users/:userId", controller.getByUserId);
contractRoute.get("/:id", controller.getById);
contractRoute.delete("/:id", controller.delete);

export default contractRoute;
