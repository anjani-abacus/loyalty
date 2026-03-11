import express from 'express';
import { checkSpinEligibility, getSpinWin, sendSpinWinPoints } from './index.js';
import { verifyToken } from '@shared/middlewares/auth.middleware.js';
const spinRouter = express.Router();

spinRouter.get('/get_spin_win', getSpinWin);
spinRouter.post('/send_spin_win_points',verifyToken, sendSpinWinPoints);
spinRouter.get('/check_spin_eligibility', verifyToken,checkSpinEligibility);

export default spinRouter;