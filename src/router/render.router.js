import { Router } from 'express';
import { ProductosManager } from '../dao/ProductosManager.js';
import { CartManager } from '../dao/CartManager.js';
const renderRouter = Router();




renderRouter.get('/products', (req, res) => {
    const productosManager = new ProductosManager()
    const limitProduct = req.query.limit
    
    const products = (productosManager.getProducts(limitProduct))
    res.render('home',{products})
});

renderRouter.get('/products/:pid', (req, res) => {
    const productosManager = new ProductosManager()
    const productId =  req.params.pid
    
    const product = (productosManager.getProduct(productId))
    res.render('home',{products:[product]})
});

export default renderRouter