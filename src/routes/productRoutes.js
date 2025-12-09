import { Router } from 'express';
import { standardizeProduct, getAllProducts } from '../controllers/productController.js';


const router = Router();

router.get('/', standardizeProduct);
router.get('/all', getAllProducts);

export default router;