import { Router } from 'express';
import { connectionTest } from '../controllers/testsController.js';

const router = Router();

router.get('/connection', connectionTest);

export default router;