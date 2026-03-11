import express from 'express';
import {  getLeaderBoardByDistrict, getLeaderBoardByState, getUserFullRank } from './index.js';
import { verifyToken } from '@shared/middlewares/auth.middleware.js';

const router = express.Router();

router.get('/leaderboard-by-state',verifyToken,getLeaderBoardByState);
router.get('/leaderboard-by-district',verifyToken,getLeaderBoardByDistrict);
router.get('/user-full-rank',verifyToken,getUserFullRank);
export default router;