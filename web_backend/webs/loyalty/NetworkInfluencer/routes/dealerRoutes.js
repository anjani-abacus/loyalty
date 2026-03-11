import express from 'express';
import { createdealer, getALLdealerCode, getdealerByCode } from '../controllers/dealerController.js';
import { authenticateToken } from '@shared/middlewares/authenticateToken.js';

const dealerRouter = express.Router();

dealerRouter.post('/create_dealer', authenticateToken, createdealer);
dealerRouter.get('/get_dealer/:dealer_code', getdealerByCode);
dealerRouter.post('/get_all_dealer', getALLdealerCode);


export default dealerRouter;


