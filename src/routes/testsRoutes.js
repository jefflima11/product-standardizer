import Router from 'express';
import { testsConnection } from '../controllers/testsController.js';

const router = Router();

router.get('/connection', testsConnection);

export default router;