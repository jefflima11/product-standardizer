import { Router } from 'express';
import { standardizeProduct } from '../controllers/productController.js';


const router = Router();

router.get('/', standardizeProduct);

export default router;