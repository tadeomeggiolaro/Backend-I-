import { Router } from 'express';
import { ProductosManager } from '../dao/productosManager.js';
const productRouter = Router();


productRouter.get('/', async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query;
    const productosManager = new ProductosManager()
    res.send(await productosManager.getProducts(req, res, limit, page, sort, query))
});

productRouter.get('/:pid', async (req, res) => {
    try {
        const id = req.params.pid
        const productosManager = new ProductosManager()
        const product = await productosManager.getProduct(id)
        res.send(product)

    } catch (error) {
        res.status(error.cause).send(error.message)
    }

});

productRouter.post('/', async (req, res) => {
    try {
        const createRequest = req.body
        const productosManager = new ProductosManager()
        const products = await productosManager.createProduct(createRequest)
        req.serverSocket.emit(`updateProducts`, products)
        res.send(products)
    } catch (error) {
        res.status(500).send(error.message)
    }

});

productRouter.put('/:pid', async (req, res) => {
    const id = req.params.pid
    const updateRequest = req.body
    const productosManager = new ProductosManager()
    const product = await productosManager.updateProduct(id, updateRequest)
    const arrayProducts = await productosManager.getProducts(req, res)
    req.serverSocket.emit(`updateProducts`, arrayProducts)
    res.send(product)
});

productRouter.delete('/:pid', async (req, res) => {
    const id = req.params.pid
    const productosManager = new ProductosManager()
    await productosManager.deleteProduct(id)
    const products = productosManager.getProducts(req, res)
    req.serverSocket.emit(`updateProducts`, products)
    res.send(products)
});

export default productRouter;
