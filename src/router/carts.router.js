import { Router } from 'express';
import { CartManager } from '../dao/CartManager.js';
const cartRouter = Router();


const cartManager = new CartManager()

cartRouter.get('/', async (_, res) => {

    res.send(await cartManager.getCarts())
});

cartRouter.get('/:cid', async (req, res) => {
    try {
        const id = req.params.cid
        const cart = await cartManager.getCart(id)
        res.send(cart)
    } catch (error) {
        res.status(error.cause).send(error.message)
    }



});
cartRouter.post('/', async (_, res) => {
    try {
        res.send(await cartManager.createCart())
    } catch (error) {
        res.status(500).send(error.message)
    }

});
cartRouter.post('/:cid/products/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const action = req.query.action
        if (action == 'remove') {
            res.send(await cartManager.removeProduct(cartId, productId));
        } else if (action == 'add') {
            res.send(await cartManager.addProduct(cartId, productId))
        }
    } catch (error) {
        res.status(500).send(error.message)
    }

});





export default cartRouter