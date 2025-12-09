import { standardize } from '../services/productServices.js';
import { getAllProducts as getAllProductsModel} from '../models/productModel.js';

export const standardizeProduct = (req, res) => {
    const data = req.body;
    const cleaned = standardize(data);
    res.json(cleaned);
};

export async function getAllProducts(req, res) {
    try {
        const products = await getAllProductsModel();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}