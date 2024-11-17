import productsModels from '../models/products.models.js'
export class ProductosManager {


    async getProducts(req, res, limit, page,  sort,query) {
        let filter = {}
        if (query) {
            const [field, value] = query.split(':');
            filter = {
                [field]: { $regex: value, $options: 'i' },
            };
        }
        const limitNum = parseInt(limit);
        const pageNum = parseInt(page);
        const sortOption = sort ? { precio: sort === 'asc' ? 1 : -1 } : {};

        const products = await productsModels.find(filter)
            .sort(sortOption)
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum).lean();

        const totalProducts = await productsModels.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / limitNum);

        const hasPrevPage = pageNum > 1;
        const hasNextPage = pageNum < totalPages;

        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;
        const prevLink = hasPrevPage ? `${baseUrl}/products?limit=${limit}&page=${pageNum - 1}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null;
        const nextLink = hasNextPage ? `${baseUrl}/products?limit=${limit}&page=${pageNum + 1}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null;

        return ({
            status: 'success',
            payload: products,
            totalPages,
            prevPage: hasPrevPage ? pageNum - 1 : null,
            nextPage: hasNextPage ? pageNum + 1 : null,
            page: pageNum,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink,
        });

    }

    async getProduct(id) {
        const product = await productsModels.findById(id);
        if (product == undefined) {
            throw new Error(`El producto con el ID ${id} no se encontró en nuestra base de datos`, { cause: 404 })
        }

        return product

    }
    async updateProduct(id, updateRequest) {
        const updatedProduct = await productsModels.findByIdAndUpdate(id, updateRequest, { new: true });
        return updatedProduct
    }
    async createProduct(createRequest) {
        if (createRequest.precio == undefined || createRequest.tipo == undefined || createRequest.nombre == undefined || createRequest.imagen == undefined || typeof createRequest.precio !== 'number') {
            throw new Error('There are mandatory fields missing')
        }
        delete createRequest?.id
        const product = new productsModels(createRequest);
        await product.save();
        return product
    }
    async deleteProduct(id) {
        await productsModels.findByIdAndDelete(id);
        return products
    }
}

