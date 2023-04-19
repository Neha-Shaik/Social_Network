import express from 'express';
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from '../controllers/users.js';
// we  can't do whole crud functionality as that would take more time so we are keeping the functionality limited to read
// which is get request
// update is done by patch request
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUserFriends);

/* UPDATE */
router.patch('/:id/:friendId', verifyToken, addRemoveFriend);

export default router;
