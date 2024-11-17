import { Router } from 'express';
import { ProductosManager } from '../dao/productosManager.js';
export const realTimeProductRouter = Router()

let productosManager=new ProductosManager()

realTimeProductRouter.get('/',async(req,res)=>{

    let products= await productosManager.getProducts(req,res)

    res.render(`realtimeProduct`,{products})
})

realTimeProductRouter.get('/:id',(req,res)=>{

    let producto=productosManager.getById(+req.params.id)

    res.status(200).json({producto})
})

realTimeProductRouter.post("/",(req, res)=>{
    let {name, ...otros}=req.body
    if(!name){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete name`})
    }

    let existe=productosManager.getByName(name)
    if(existe){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ya existe el heroe ${name}`})
    }

    try {
        let nuevoProduct=productosManager.create({name, ...otros})
    
        req.serverSocket.emit("nuevoProduct", nuevoHeroe)

        res.setHeader('Content-Type','application/json');
        return res.status(200).json(nuevoHeroe);
        
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
        
    }
})


export default realTimeProductRouter