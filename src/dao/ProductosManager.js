import { v4 as uuidv4 } from 'uuid'
import { readJSON, writeJSON } from "../utils/fileshandle.js"
export class ProductosManager {


    getProducts(limitProduct) {
        const products = readJSON('products.json')
        if (limitProduct != undefined) {
            products.length = limitProduct
            return products
        }
        return products
    }

    getProduct(id) {
        const products = readJSON('products.json')
        const productsfound = products.find(product => product.id === id)
        if (productsfound == undefined) {
            throw new Error(`El producto con el ID ${id} no se encontró en nuestra base de datos`, { cause: 404 })
        }

        return productsfound

    }
    updateProduct(id, updateRequest) {
        const products = readJSON('products.json')
        const product = this.getProduct(id)
        const updatedProduct = { ...product, ...updateRequest, id }
        const productIndex = products.findIndex(product => product.id === id)
        products[productIndex] = updatedProduct
        writeJSON('products.json', products);
        return updatedProduct
    }
    createProduct(createRequest) {
        const products = readJSON('products.json')
        if (createRequest.precio == undefined || createRequest.tipo == undefined || createRequest.nombre == undefined || createRequest.imagen == undefined || typeof createRequest.precio !== 'number') {
            throw new Error('There are mandatory fields missing')
        }
        delete createRequest?.id
        const newProduct = { ...createRequest, id: uuidv4() }
        const newArrayProduct = [...products, newProduct]
        writeJSON('products.json',newArrayProduct);
        return products

    }
    deleteProduct(id) {
        const products = readJSON('products.json')
        const newArrayProduct = products.filter(product => product.id !== id)
        writeJSON('products.json', newArrayProduct);
        // updateNewChangesInDB
        return newArrayProduct
    }
}

