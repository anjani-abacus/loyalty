import "./shared/cronjobs/schduling.js"; 
import express from 'express';
import logger from '@shared/utilities/logger.js';
import loyaltyApp from '@apps/loyalty/app.js';
import { config } from "./shared/config/env.js";

const PORT = config.app.port || 7000;
const app = express();

// Mount all modular apps

app.use('/api/loyalty/v1', loyaltyApp);

// Root health check
app.get('/api/health', (req, res) => {
  return  res.status(200).json({ status: 'ok', message: 'Main API is running' });
});

app.listen(PORT, (err) => {
    if (err) {
        logger.error(`Error starting server: ${err.message}`);
        setTimeout(() => process.exit(1), 100);
        return;
    }
    logger.info(`🚀 Server running on port ${PORT}`);
});
