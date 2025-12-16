import { Router } from 'express';
import { getAllProducts, dumpAllProducts, updateProducts, getHistoricalProducts, getDetailedHistoricalProducts } from '../controllers/productController.js';

const router = Router();

router.get('/all', getAllProducts);
router.get('/historical', getHistoricalProducts);
router.get('/detailed-historical/:id', getDetailedHistoricalProducts);

router.post('/dump', dumpAllProducts);

router.patch('/update', updateProducts);

export default router;