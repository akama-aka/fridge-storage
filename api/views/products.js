'use strict'
const db = require('../middleware/database');
module.exports =[
    // Products
    {
        method: 'GET',
        querystring: {
            id: {type: 'integer'}
        },
        url: '/api/products',
        handler: async (req, res) => {
            if(req.query.id){
                let product = await db.getProductById(req.query.id);
                res.send(product);
            } else {
                let products = await db.getAllProducts();  // Call the function with parentheses
                res.send({
                    // it needs to be looped because there are multiple products
                    products: products.map(product => {
                        return {
                            id: product.product_id,
                            barcode: product.product_barcode,
                            name: product.product_name,
                            image: product.product_image.toString() || null
                        }
                    })
                });
            }
        }
    },
    {
        method: 'POST',
        body: {
            type: 'object',
            properties: {
                barcode: {type: 'string'},
                name: {type: 'string'},
                image: {type: 'string'}
            },
            required: ['barcode', 'name']
        },
        url: '/api/products',
        handler: async (req, res) => {
            let product = req.body;
            await db.addProduct(product.barcode, product.name, product.image).then((response) => {
                // Add the product to storage too
                db.addStorage(response.lastID, 0);
            });
            res.send('Product added');
        }
    },
    {
        method: 'DELETE',
        querystring: {
            id: {type: 'integer'}
        },
        url: '/api/products',
        handler: async (req, res) => {
            await db.deleteProduct(req.query.id);
            res.send('Product deleted');
        }
    },
    // Storage
    {
        method: 'GET',
        querystring: {
            id: {type: 'integer'}
        },
        url: '/api/storage',
        handler: async (req, res) => {
            if(req.query.id){
                let storage = await db.getStorageItem(req.query.id);
                if(!storage) res.send({success: false, message: 'No storage found'});
                res.send({
                    id: storage.product_id,
                    storage_count: storage.storage_count
                });
            } else {
                let storage = await db.getStorage();  // Call the function with parentheses
                res.send({
                    // it needs to be looped because there are multiple products
                    storage: storage.map(storage => {
                        return {
                            id: storage.product_id || null,
                            storage_count: storage.storage_count || null
                        }
                    })
                });
            }
        }
    },
    {
        method: 'POST',
        body: {
            type: 'object',
            properties: {
                product_id: {type: 'integer'},
                quantity: {type: 'integer'}
            },
            required: ['product_id', 'quantity']
        },
        url: '/api/storage',
        handler: async (req, res) => {
            let storage = await req.body;
            await db.addStorage(storage.product_id, storage.quantity)
            res.send('Storage added');
        }
    },
    {
        method: 'PATCH',
        body: {
            type: 'object',
            properties: {
                product_id: {type: 'integer'},
                quantity: {type: 'integer'}
            },
            required: ['product_id', 'quantity']
        },
        url: '/api/storage',
        handler: async (req, res) => {
            let storage = await req.body;
            await db.updateStorage(storage.product_id, storage.quantity)
            res.send('Storage updated');
        }
    },
    {
        method: 'DELETE',
        querystring: {
            id: {type: 'integer'}
        },
        url: '/api/storage',
        handler: async (req, res) => {
            await db.deleteStorage(req.query.id);
            res.send('Storage deleted');
        }
    }
]