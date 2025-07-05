import { Request, Response } from 'express';
import client from "../../../services/database/prisma.service";
import logger from "../../../services/common/logger.service";

export default class UserController {

    public async initialEnable(req: Request, res: Response): Promise<any> {
        try {
            const userId = req.user!.uid;
            const {walletAddress, initialTransaction} = req.body;

            const user = await client.prisma.user.update({
                where: { id: userId },
                data: {
                    walletAddress,
                    initialTransaction,
                    enabled: true,
                }
            });

            const { password: _, ...userWithoutPassword } = user;
            return res.status(200).json({
                message: "succuss",
                user: userWithoutPassword,
            });
        } catch (error) {
            logger.error('Error enabling user', { error });
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
