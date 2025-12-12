import { Router } from 'express';
import { getAllProducts, dumpAllProducts } from '../controllers/productController.js';

const router = Router();

router.get('/all', getAllProducts);

router.post('/dump', dumpAllProducts);

export default router;