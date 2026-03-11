import express from 'express';
import { createdealer, getALLdealerCode, getdealerByCode } from '../controller/dealerController.js';
import { verifyToken } from '@shared/middlewares/auth.middleware.js';

const dealerRouter = express.Router();

dealerRouter.post('/create_dealer',verifyToken ,createdealer);
dealerRouter.get('/get_dealer/:dealer_code',getdealerByCode);
dealerRouter.get('/get_all_dealer',getALLdealerCode);


export default dealerRouter;


