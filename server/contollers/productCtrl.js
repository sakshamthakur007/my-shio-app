const Products = require('../models/productModel');

// Filtering, sorting, and pagination
class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        const queryObj = { ...this.queryString };
        
        const excludedFields = ['page', 'sort', 'limit'];
        excludedFields.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            console.log(sortBy);
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    pagination() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 9;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

const productCtrl = {
    getProducts: async (req, res) => {
        try {
            const features = new APIfeatures(Products.find(), req.query).filtering().sorting().pagination();
            const products = await features.query;

            console.log('Final Query:', features.query);  // Log the final query
            console.log('Products Found:', products);      // Log the products found

            if (products.length === 0) return res.status(400).json({ msg: "No products found" });
            res.json(products);
        } catch (error) {
            console.error('Error:', error);  // Log any errors
            return res.status(500).json({ msg: error.message });
        }
    },
    createProduct: async (req, res) => {
        try {
            const { product_id, title, price, description, content, images, category } = req.body;

            if (!images) return res.status(400).json({ msg: "No Image Upload" });

            const existingProduct = await Products.findOne({ product_id });
            if (existingProduct) return res.status(400).json({ msg: "Product Already Exists" });

            const newProduct = new Products({
                product_id,
                title: title.toLowerCase(),
                price,
                description,
                content,
                images,
                category
            });

            await newProduct.save(); // Save the new product to the database

            res.json(newProduct);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id);
            res.json({ msg: "Deleted a Product" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { product_id, title, price, description, content, images, category } = req.body;

            if (!images) return res.status(400).json({ msg: "No Image Upload" });

            await Products.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    title: title.toLowerCase(),
                    product_id,
                    price,
                    description,
                    content,
                    images,
                    category
                }
            );
            res.json({ msg: "Updated a Product" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }
};

module.exports = productCtrl;
