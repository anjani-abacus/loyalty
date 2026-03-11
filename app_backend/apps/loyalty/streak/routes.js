import express from 'express';
import { getStreakProgress } from './index.js';
import { verifyToken } from '@shared/middlewares/auth.middleware.js';
const router = express.Router();

router.get('/streak-progress', verifyToken,getStreakProgress);

export default router;