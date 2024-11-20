import { Router } from 'express';
import { CartManager } from '../dao/CartManager.js';
import { ProductosManager } from '../dao/productosManager.js';
const renderRouter = Router();

const productosManager = new ProductosManager()
const cartManager = new CartManager()

renderRouter.get('/products', async (req, res) => {

    const { limit = 10, page = 1, sort, query } = req.query;

    const products = await productosManager.getProducts(req, res, limit, page, sort, query)
    res.render('home', { products })
});

renderRouter.get('/products/:pid', async (req, res) => {
    const productId = req.params.pid

    const product = await (productosManager.getProduct(productId))
    res.render('home', { products: [product] })
});

renderRouter.get('/carts/:cid', async (req, res) => {

    const cartId = req.params.cid

    const cart = await (cartManager.getCart(cartId))
    console.log(cart)
    res.render('cart', { cart })
});

export default renderRouter