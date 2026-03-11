import express from 'express';
import { verifyToken } from '@shared/middlewares/auth.middleware.js';
import upload from '@shared/config/multer.js';
import { CreatePost,  getALLPosts,  GetPost, likePost } from './index.js';

const router = express.Router();
router.post(
    '/create-post',
    verifyToken,
    upload.single('img'),
    CreatePost
);
router.get(
    '/get-post',
    verifyToken,
    GetPost
);

router.post(
    '/like-post',
    verifyToken,
    likePost
);

router.get(
    '/all-posts',
    getALLPosts
)

export default router;