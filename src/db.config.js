
import { connect } from 'mongoose';

const connectDB = async () => {
    try {
        await connect("mongodb+srv://tadeomeggiolaro:VitoLaro@cluster0.mn4ah.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
            {
                dbName: "ecommerce"
            });
        console.log('MongoDB conectado correctamente');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error);
        process.exit(1); 
    }
};


export default connectDB;
