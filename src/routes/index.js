import { Router } from 'express';
import produtcRoutes from './productRoutes.js';
import testsRoutes  from './testsRoutes.js';

const router = Router();

router.get('/', (req, res) => {
  res.send('Welcome to the APIs');
});

router.use('/products', produtcRoutes);
router.use('/tests', testsRoutes);

export default router;