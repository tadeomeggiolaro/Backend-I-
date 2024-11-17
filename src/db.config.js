
import { connect } from 'mongoose';

const connectDB = async () => {
    try {
        await connect('mongodb://127.0.0.1:27017/ecommerce?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.1', {
        });
        console.log('MongoDB conectado correctamente');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error);
        process.exit(1); 
    }
};

export default connectDB;
