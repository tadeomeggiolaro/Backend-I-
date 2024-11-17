import express from "express"
import productsRouter from './router/products.router.js'
import cartRouter from "./router/carts.router.js";
import handlebars from "express-handlebars"
import __dirname from './dirname.js'
import renderRouter from "./router/render.router.js";
import { Server } from "socket.io";
import realTimeProductRouter from "./router/realTimeProduct.route.js";
import connectDB from "./db.config.js";
const PORT = 8080

const app = express()
const httpServer = app.listen(PORT,()=>{
    connectDB()
    console.log(`server online en el puerto ${PORT}`)
})

const socketServerInstance = new Server(httpServer)

app.engine('handlebars',handlebars.engine())
app.set('views',__dirname + '/views' )
app.set('view engine','handlebars')
app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(
    '/api/products',
    (req, res, next)=>{
        req.serverSocket=socketServerInstance
        next()
    }, 
    productsRouter
);
app.use('/api/carts', cartRouter);

app.use('/realtimeproduct', realTimeProductRouter);
app.use('/', renderRouter);


export default socketServerInstance
