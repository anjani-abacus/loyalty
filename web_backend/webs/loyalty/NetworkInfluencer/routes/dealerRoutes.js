import express from 'express';
import {
  createdealer,
  getALLdealerCode,
  getdealerByCode,
  updateDealer,
  softDeleteDealer
} from '../controllers/dealerController.js';
import { authenticateToken } from '@shared/middlewares/authenticateToken.js';

const dealerRouter = express.Router();

dealerRouter.post('/create_dealer', authenticateToken, createdealer);
dealerRouter.post('/get_all_dealer', authenticateToken, getALLdealerCode);
dealerRouter.get('/get_dealer/:dealer_code', authenticateToken, getdealerByCode);
dealerRouter.put('/update_dealer/:id', authenticateToken, updateDealer);
dealerRouter.delete('/delete_dealer/:id', authenticateToken, softDeleteDealer);

export default dealerRouter;
