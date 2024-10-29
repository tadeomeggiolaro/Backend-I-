// routes/products.js
import { Router } from 'express';
import { ProductosManager } from '../dao/ProductosManager.js';
const productRouter = Router();


productRouter.get('/', (req, res) => {
    const productosManager = new ProductosManager()
    const limitProduct = req.query.limit
    res.send(productosManager.getProducts(limitProduct))
});

productRouter.get('/:pid', (req, res) => {
    try {
        const id = req.params.pid
        const productosManager = new ProductosManager()
        const product = productosManager.getProduct(id)
        res.send(product)
        
    } catch (error){
        res.status(error.cause).send(error.message)   
    }

});

productRouter.post('/', (req, res) => {
    try {
        const createRequest = req.body
        const productosManager = new ProductosManager()
        const products = productosManager.createProduct(createRequest)
        req.serverSocket.emit(`updateProducts`,products)
        res.send(products)
    } catch (error) {
        res.status(500).send(error.message)
    }

});

productRouter.put('/:pid', (req, res) => {
    const id = req.params.pid
    const updateRequest = req.body
    const productosManager = new ProductosManager()
    const product= productosManager.updateProduct(id, updateRequest)
    const arrayProducts = productosManager.getProducts()
    req.serverSocket.emit(`updateProducts`,arrayProducts)
    res.send(product)
});

productRouter.delete('/:pid', (req, res) => {
    const id = req.params.pid
    const productosManager = new ProductosManager()
    const products = productosManager.deleteProduct(id)
    req.serverSocket.emit(`updateProducts`,products)
    res.send(products)
});

export default productRouter;
