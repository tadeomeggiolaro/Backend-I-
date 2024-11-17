
import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1 },
        },
    ],
});

export default model('Cart', cartSchema);
