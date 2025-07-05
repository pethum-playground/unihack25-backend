import {NextFunction, Request, Response} from "express";

export default  function (req: Request, res: Response, next: NextFunction){
    try {
        const auth = req.header('Authorization')
        const token = auth?.split(" ")[1];

        next()
    } catch (ex) {
        res.status(400).send('Invalid token');
    }
}
