import express from 'express';
import { getFeedPosts, getUserPosts, likePost } from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
router.get('/', verifyToken, getFeedPosts); // gets the posts of all users
router.get('/:userId/posts', verifyToken, getUserPosts); //gets single users posts

/* UPDATE */
router.patch('/:id/like', verifyToken, likePost);

export default router;
