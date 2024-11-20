
import cartsModel from '../models/carts.model.js';
import { ProductosManager } from './productosManager.js';

const productosManager = new ProductosManager()
export class CartManager {

    async getCarts() {
        const carts = await cartsModel.find();
        return carts

    }
    async getCart(id) {
        
        const cart = await cartsModel.findById(id).populate('products.product').lean()
        if(cart == undefined){
            throw new Error(`El carrito con el ID ${id} no se encontró en nuestra base de datos`, {cause:404})
        }
        return cart
    }

    async createCart() {
        const cart = new cartsModel();
        await cart.save();
        return await this.getCarts()
    }
    async deleteCart(id) {
        await cartsModel.findByIdAndDelete(id);
        return await this.getCarts()
    }
    async addProduct(cartId, productId) {
        const cart = await cartsModel.findById(cartId);
        const existingProduct = cart.products.find(p => p.product.toString() === productId);

        if (existingProduct) {
            
            existingProduct.quantity += 1;
        } else {
            await productosManager.getProduct(productId)
            cart.products.push({ product: productId, quantity: 1 });
        }

        await cart.save();
        return cart
        
    }
    removeProduct = async (cartId, productId) => {
            const cart = await this.getCart(cartId);
            const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
            if (productIndex === -1) {
                throw new Error(`El producto con el ID ${id} no se encontró en nuestra base de datos`, {cause:404})
            }
            await productosManager.getProduct(productId)
            cart.products.splice(productIndex, 1);
            await cart.save();
            return cart
    };
    removeQuantity = async (cartId, productId) => {
            const cart = await this.getCart(cartId);
            const product = cart.products.find(p => p.product.toString() === productId);
            if (!product) {
                throw new Error(`El producto con el ID ${id} no se encontró en nuestra base de datos`, {cause:404})
                
            }
            await productosManager.getProduct(productId)
            if (product.quantity > 1) {
                product.quantity -= 1;
            } else {

                cart.products = cart.products.filter(p => p.product.toString() !== productId);
            }
    
            await cart.save();
            return cart
    };
    
    
    addQuantity = async (cartId, productId) => {
            
            const cart = await this.getCart(cartId);
            
            const product = cart.products.find(p => p.product.toString() === productId);
            if (!product) {
                throw new Error(`El producto con el ID ${id} no se encontró en nuestra base de datos`, {cause:404})            }
            product.quantity += 1;
            await cart.save();
            return cart
    };
    
}

