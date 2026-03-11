import logger from '../utilities/logger.js';
import { AppError } from '../utilities/errors.js';
import { config } from '../config/env.js';

const errorHandler = (err, req, res, next) => {
    const isDev = config.app.nodeEnv !== 'production';
    const isOperational = err instanceof AppError || err.isOperational;

    const statusCode = err.statusCode || 500;
    const message = isOperational ? err.message : 'Internal server error';

    logger.error(`[${req.method}] ${req.originalUrl} - ${message}`);
    if (isDev || !isOperational) {
        logger.error(err.stack || err.message);
    }

    return res.status(statusCode).json({
        error: message
    })
};

export default errorHandler;