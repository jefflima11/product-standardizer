import { Router } from 'express';
import produtcRoutes from './productRoutes.js';

const router = Router();

router.use('/products', produtcRoutes);

export default router;