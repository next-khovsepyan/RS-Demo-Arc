import { Router, Request, Response } from 'express';
import { AuthService } from '../../services/auth.service';

const router = Router();

router.post('/login', AuthService.login);

export default router;