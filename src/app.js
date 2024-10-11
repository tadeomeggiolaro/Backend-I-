import express from "express"
import productsRouter from './router/products.router.js'
import cartRouter from "./router/carts.router.js";

const PORT = 8080

const app = express()

app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);

app.listen(PORT,()=>{
    console.log(`server online en el puerto ${PORT}`)
})