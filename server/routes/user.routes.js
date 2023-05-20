import express from 'express';
import { loginUser, registerUser } from '../controllers/user.js';

const router = express.Router();

router.post('/user/login', loginUser);
router.post('/user/signup', registerUser);

export default router;
