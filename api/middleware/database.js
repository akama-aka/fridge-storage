'use strict'

let sqlite = require("sqlite");
let sqlite3 = require("sqlite3");

let dbPromise = sqlite.open({
    filename: process.env.DB_PATH,
    driver: sqlite3.Database
}).then(db => {
    console.log('Database connection established');
    return db;
})

/**
 * @author Akama Aka <akama.aka@akami-solutions.cc>
 * @description Get all products from the database
 * @async
 * @returns {Promise<array[]>}
 */
const getAllProducts = async () => {
    const db = await dbPromise;
    return await db.all('SELECT * FROM products;');
}
/**
 * @author Akama Aka <akama.aka@akami-solutions.cc>
 * @async
 * @description Get a product by its id
 * @param id
 * @returns {Promise<array[]>}
 */
const getProductById = async (id) => {
    const db = await dbPromise;
    return await db.get('SELECT * FROM products WHERE product_id = ?;', id);
}
/**
 * @author Akama Aka <akama.aka@akami-solutions.cc>
 * @description Get a product by its name
 * @async
 * @param name
 * @returns {Promise<array[]>}
 */
const getProductByName = async (name) => {
    const db = await dbPromise;
    return await db.get('SELECT * FROM products WHERE product_name = ?;', name);;
}
/**
 * @author Akama Aka <akama.aka@akami-solutions.cc>
 * @description Get a product by its barcode
 * @param product_barcode
 * @param product_name
 * @param product_image
 * @returns {Promise<ISqlite.RunResult<Statement>>}
 */
const addProduct = async (product_barcode,product_name,product_image = null) => {
    const db = await dbPromise;
    return await db.run('INSERT INTO products (product_barcode,product_name,product_image) VALUES (?,?,?);',product_barcode,product_name,product_image);
}
/**
 * @author Akama Aka <akama.aka@akami-solutions.cc>
 * @async
 * @description Update a product
 * @param id
 * @returns {Promise<ISqlite.RunResult<Statement>>}
 */
const deleteProduct = async (id) => {
    const db = await dbPromise;
    return await db.run('DELETE FROM products WHERE product_id = ?;',id);
}

// Storage

const getStorage = async () => {
    const db = await dbPromise;
    return await db.all('SELECT * FROM storage;');
}

const getStorageItem = async (product_id) => {
    const db = await dbPromise;
    return await db.get('SELECT * FROM storage WHERE product_id = ?;',product_id);
}

const addStorage = async (product_id,quantity) => {
    const db = await dbPromise;
    return await db.run('INSERT INTO storage (product_id,storage_count) VALUES (?,?);',product_id,quantity ? quantity : 0);
}

const updateStorage = async (product_id,quantity) => {
    const db = await dbPromise;
    return await db.run('UPDATE storage SET storage_count = ? WHERE product_id = ?;',quantity,product_id);
}

const deleteStorage = async (product_id) => {
    const db = await dbPromise;
    return await db.run('DELETE FROM storage WHERE product_id = ?;',product_id);
}


module.exports = {
    getAllProducts,
    getProductById,
    getProductByName,
    addProduct,
    deleteProduct,
    getStorage,
    getStorageItem,
    addStorage,
    updateStorage,
    deleteStorage
}