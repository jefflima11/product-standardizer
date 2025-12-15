import { Router } from 'express';
import { getAllProducts, dumpAllProducts, updateProducts } from '../controllers/productController.js';

const router = Router();

router.get('/all', getAllProducts);

router.post('/dump', dumpAllProducts);

router.patch('/update', updateProducts);

export default router;