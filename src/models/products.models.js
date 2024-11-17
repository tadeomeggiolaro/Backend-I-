import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid'
const productSchema = new Schema({
    tipo: {
        type: String,
        required: true,
        enum: ['buzo'],
    },
    id: {
        type: String,
        default: () => uuidv4(),
        unique: true,
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    precio: {
        type: Number,
        required: true,
        min: 0,
    },
    imagen: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return /^(http|https):\/\/[^\s$.?#].[^\s]*$/gm.test(value);
            },
            message: (props) => `${props.value} no es una URL válida.`,
        },
    },
});



export default model('Product', productSchema);