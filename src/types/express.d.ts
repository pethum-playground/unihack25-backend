declare global {
    namespace Express {
        interface Request {
            user?: {
                uid: number;
                email: string;
            };
        }
    }
}

export {};
