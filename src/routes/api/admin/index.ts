import express from 'express';
import adminAuthRoutes from './auth.route'

const router = express.Router();

router.use('/auth', adminAuthRoutes);

export default router;