import { Router, Request, Response } from 'express';
import { UserService } from '../../services/user.service';

const router = Router();

router.post('/registerToken', UserService.registerPushNotificationToken);
export default router;