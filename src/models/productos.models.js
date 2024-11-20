import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema({
    code: { type: String, unique: true },
    title: { type: String, required: true },
    description: { type: String, },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    status: { type: Boolean, default: true },
    thumbnails: { type: String},
});

productSchema.plugin(mongoosePaginate);
export const productosModelo = mongoose.model('productos', productSchema);
