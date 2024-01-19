import { Router } from 'express';
import { AuthService } from '../../../services/admin/auth.service';

const router = Router();

router.post('/login', AuthService.login);

export default router;