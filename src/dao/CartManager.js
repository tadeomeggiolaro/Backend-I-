import { v4 as uuidv4 } from 'uuid'
import { readJSON, writeJSON } from "../utils/fileshandle.js";
export class CartManager {

    getCarts() {
        const carts = readJSON('../data/carts.json');
        return carts

    }
    getCart(id) {
        const carts = readJSON('../data/carts.json');
        return carts.find(cart => cart.id === id)
    }

    createCart() {
        const carts = readJSON('../data/carts.json');
        const newCart = { products: [], id: uuidv4() }
        carts.push(newCart)
        writeJSON('../data/carts.json', carts);
        return carts

    }
    deleteCart(id) {
        const carts = readJSON('../data/carts.json');
        const newArrayCart = carts.filter(cart => cart.id !== id)
        // updateNewChangesInDB
        writeJSON('../data/carts.json', newArrayCart);
        return newArrayCart
    }
    addProduct(cartId, productId) {

        const carts = this.getCarts()

        const cartIndex = carts.findIndex(c => c.id == cartId)
        
        const productInCart = carts[cartIndex].products.findIndex(product => product.productId == productId)

        if (productInCart > -1) {
            carts[cartIndex].products[productInCart].quantity++
        }
        else (carts[cartIndex].products.push({ productId, quantity: 1 }))
        writeJSON('../data/carts.json', carts);
        return carts
    }

}

