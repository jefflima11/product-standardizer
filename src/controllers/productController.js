import { getAllProducts as getAllProductsModel, dumpAllProducts as dumpAllProductsModel} from '../models/productModel.js';

export async function getAllProducts(req, res) {
    try {
        const products = await getAllProductsModel();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export async function dumpAllProducts(req, res) {
    try {
        const dumpedProducts = await dumpAllProductsModel();
        res.status(200).json({return: dumpedProducts, message: 'Dump realizado com sucesso!'});
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}