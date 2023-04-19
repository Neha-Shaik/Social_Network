import express from 'express';
import { login } from '../controllers/auth.js';
const router = express.Router(); //we can do router.post etc rather than app

router.post('/login', login);
