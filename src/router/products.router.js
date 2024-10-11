// routes/products.js
import { Router } from 'express';
import { ProductosManager } from '../dao/ProductosManager.js';
const productRouter = Router();


productRouter.get('/', (req, res) => {
    const productosManager = new ProductosManager()
    res.send(productosManager.getProducts())
});

productRouter.get('/:pid', (req, res) => {
    const id = req.params.pid
    const productosManager = new ProductosManager()
    res.send(productosManager.getProduct(id))

});

productRouter.post('/', (req, res) => {
    try {
        const createRequest = req.body
        console.log(createRequest)
        const productosManager = new ProductosManager()
        res.send(productosManager.createProduct(createRequest))
    } catch (error) {
        res.status(500).send(error.message)
    }

});

productRouter.put('/:pid', (req, res) => {
    const id = req.params.pid
    const updateRequest = req.body
    const productosManager = new ProductosManager()
    res.send(productosManager.updateProduct(id, updateRequest))
});

productRouter.delete('/:pid', (req, res) => {
    const id = req.params.pid
    const productosManager = new ProductosManager()
    res.send(productosManager.deleteProduct(id))
});

export default productRouter;
