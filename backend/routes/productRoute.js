import express from 'express';
import { listProducts, addProduct, removeProduct, singleProduct, purchaseProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';
import productModel from '../models/productModel.js';


const productRouter = express.Router();

productRouter.post('/add', adminAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), addProduct);

productRouter.post('/remove', adminAuth, removeProduct);
productRouter.post('/single', singleProduct);
productRouter.get('/list', listProducts);

// Route to handle purchasing a product and updating stock
productRouter.post('/purchase', adminAuth,async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const updatedProduct = await purchaseProduct(productId, quantity);

        if (updatedProduct) {
            return res.status(200).json({
                success: true,
                message: 'Product purchased successfully',
                stock: updatedProduct.stock,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Insufficient stock or invalid product',
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal server error',
        });
    }
});

productRouter.post('/update-stock', adminAuth, async (req, res) => {
    try {
        const { id, stock } = req.body;
        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        product.stock = stock; // Update stock quantity
        await product.save();

        res.json({ success: true, message: "Stock updated successfully", stock: product.stock });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
});


export default productRouter;
