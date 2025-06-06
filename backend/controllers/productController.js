import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function to add a product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, weight, stock, sizes, bestseller,commonName } = req.body;

        const images = ["image1", "image2", "image3", "image4"]
            .map(key => req.files[key] && req.files[key][0])
            .filter(item => item !== undefined);

        if (!images.length) {
            return res.json({ success: false, message: "At least one image is required." });
        }

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true",
            commonName,
            weight,
            stock: Number(stock),
            image: imagesUrl,
            date: Date.now()
        };

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Function to list products with stock status
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        const updatedProducts = products.map(product => ({
            ...product._doc,
            stockStatus: product.stock > 0 ? "In Stock" : "Out of Stock"
        }));
        res.json({ success: true, products: updatedProducts });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Function to remove a product
const removeProduct = async (req, res) => {
    try {
        const { id } = req.body;
        const product = await productModel.findById(id);
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }
        await productModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Product Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Function to get a single product
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        if (!productId) {
            return res.json({ success: false, message: "Product ID is required" });
        }
        const product = await productModel.findById(productId);
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }
        res.json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Function to handle product purchase and decrease stock
const purchaseProduct = async (productId, quantity) => {
    try {
        const product = await productModel.findById(productId);

        if (!product) {
            return null; // Product not found
        }

        if (product.stock < quantity) {
            return null; // Insufficient stock
        }

        product.stock -= quantity; // Reduce stock
        await product.save(); // Save updated stock in the database

        return product; // Return updated product
    } catch (error) {
        throw new Error(error.message); // Handle errors
    }
};


export { listProducts, addProduct, removeProduct, singleProduct, purchaseProduct };
