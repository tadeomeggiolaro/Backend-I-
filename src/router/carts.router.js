import { Router } from 'express';
import { ProductosManager } from '../dao/ProductosManager.js';
import { CartManager } from '../dao/CartManager.js';
const cartRouter = Router();




cartRouter.get('/', (_, res) => {
    const cartManager = new CartManager()
    res.send(cartManager.getCarts())
});

cartRouter.get('/:cid', (req, res) => {
    try {
        const id = req.params.cid
        const cartManager = new CartManager()
        const cart = cartManager.getCart(id)
        res.send(cart)
    } catch (error) {
        res.status(error.cause).send(error.message)  
    }
    
    

});
cartRouter.post('/', (_, res) => {
    try {
        const cartManager = new CartManager()
        res.send(cartManager.createCart())
    } catch (error) {
        res.status(500).send(error.message)
    }

});
cartRouter.post('/:cid/product/:pid', (req, res) => {
    try {
        const cartManager = new CartManager()
        const cartId = req.params.cid
        const productId = req.params.pid
        res.send(cartManager.addProduct(cartId,productId))
    } catch (error) {
        res.status(500).send(error.message)
    }

});

cartRouter.put('/:cid', (req, res) => {
    const id = req.params.cid
    const updateRequest = req.body
    const cartManager = new CartManager()
    res.send(cartManager.updateProduct(id, updateRequest))
});



export default cartRouter