import { standardize } from '../services/productServices.js';

export const standardizeProduct = (req, res) => {
    const data = req.body;
    const cleaned = standardize(data);
    res.json(cleaned);
};