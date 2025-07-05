import dotenv from 'dotenv';
import path from "path";

dotenv.config({ path: path.join(__dirname, '.env') });

import logger from  './src/servies/common/logger.service'
import app from './src/app';

const port = process.env.PORT || 3100;

const server = app.listen(port, () => {
    logger.info(`Server is listening on ${port}`);
});

process.on('SIGTERM', () => {
    logger.debug('SIGTERM signal received: Closing Server');
    server.close(() => {
        logger.debug('Server Closed');
    });
});
