import express from 'express';

import adminRoutes from './admin';
import userAuthRoutes from './auth.route';
import userRoutes from './user.route';

import { authenticateToken } from '../../middlewares/auth.middleware';

const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/auth', userAuthRoutes);
router.use('/user', authenticateToken, userRoutes);

export default router;


