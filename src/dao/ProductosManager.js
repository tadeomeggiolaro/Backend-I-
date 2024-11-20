import {productosModelo} from '../models/productos.models.js'
export class ProductosManager {


    async getProducts(req, res, limit, page, sort, query) {
        
        let filter = {};
        if (query) {
            const [field, value] = query.split(':');
            filter = {
                [field]: { $regex: value, $options: 'i' }, 
            };
        }
    
        
        const limitNum = parseInt(limit) || 10;
        const pageNum = parseInt(page) || 1; 
    
        let sortOption = {};
        if (sort?.includes('price')) {
            sortOption = { price: sort === 'price_asc' ? 1 : -1 }; 
        } else if (sort?.includes('title')) {
            sortOption = { title: sort === 'title_asc' ? 1 : -1 }; 
        }
    
        try {
            
            const products = await productosModelo.paginate(filter, {
                page: pageNum,
                limit: limitNum,
                sort: sortOption,
                lean: true,
            });
    
            
            const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;
            const prevLink = products.hasPrevPage
                ? `${baseUrl}/products?limit=${limitNum}&page=${products.prevPage}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}`
                : null;
            const nextLink = products.hasNextPage
                ? `${baseUrl}/products?limit=${limitNum}&page=${products.nextPage}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}`
                : null;
    
            
            return {
                status: 'success',
                payload: products.docs,
                totalPages: products.totalPages,
                prevPage: products.hasPrevPage ? products.prevPage : null,
                nextPage: products.hasNextPage ? products.nextPage : null,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink,
                nextLink,
            };
        } catch (err) {
            
            return {
                status: 'error',
                message: 'Error al obtener los productos',
                details: err.message,
            };
        }
    }
    

    async getProduct(id) {
        const product = await productosModelo.findById(id);
        if (product == undefined) {
            throw new Error(`El producto con el ID ${id} no se encontró en nuestra base de datos`, { cause: 404 })
        }

        return product

    }
    async updateProduct(id, updateRequest) {
        await this.getProduct(id)
        const updatedProduct = await productosModelo.findByIdAndUpdate(id, updateRequest, { new: true });
        return updatedProduct
    }
    async createProduct(createRequest) {
        if (createRequest.price == undefined || createRequest.category == undefined || createRequest.title == undefined || createRequest.stock == undefined|| typeof createRequest.price !== 'number') {
            throw new Error('There are mandatory fields missing')
        }
        delete createRequest?.id
        const product = new productosModelo(createRequest);
        await product.save();
        return product
    }
    async deleteProduct(id) {
        await this.getProduct(id)
        await productosModelo.findByIdAndDelete(id);
        return products
    }
}

