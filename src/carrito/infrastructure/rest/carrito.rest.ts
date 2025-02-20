import express, { Router, Request, Response } from "express";
import CarritoUseCases from '../../application/carrito.usecases';
import CarritoRepositoryPostgres from "../db/carrito.repository.postgres";
import Message from "../../../context/responses/Message";
import { isAuth, isUser } from "../../../context/security/auth";


const router = express.Router();
const carritoUseCases = new CarritoUseCases(new CarritoRepositoryPostgres)

// POST http://localhost:3000/api/carrito/addCafeAlCarrito
router.post("/addCafeAlCarrito", isAuth, isUser, async (req: Request, res: Response) => {
    try {
        const { nombrecafe, tuestecafe, origencafe, pesocafe, nombretienda } = req.body;
        const alias = req.body.user;
        const aliasValue = alias.alias;//Para que no llegue como objeto user
        await carritoUseCases.addCafeAlCarrito(nombrecafe, tuestecafe, origencafe, pesocafe, nombretienda, aliasValue);
        res.status(201).json({ message: `El cafe se ha añadido al carrito.` });

    } catch (error) {
        const message = { text: `Error añadiendo al carrito: ${error.message || error}` };
        console.error(error);
        res.status(500).json(message);

    }
});


// GET http://localhost:3000/api/carrito/getCarrito
router.get("/getCarrito",isAuth,isUser,async (req: Request, res: Response)=>{
    try {
        const aliasusuario=req.body.user;
        const aliasValue=aliasusuario.alias;
        const carrito=await carritoUseCases.getCarrito(aliasValue);
        res.status(201).json(carrito);

    } catch (error) {
        const message = { text: `Error sacando al carrito: ${error.message || error}` };
        console.error(error);
        res.status(500).json(message);  
    }
})

// DELETE http://localhost:3000/api/carrito/eliminarCafeCarrito
router.delete("/eliminarCafeCarrito",isAuth,isUser,async (req: Request, res: Response)=>{
    try {

        const {nombrecafe, tuestecafe, origencafe, pesocafe, nombretienda} = req.body;
        const cafe = {nombre: nombrecafe, tueste: tuestecafe, origen: origencafe, peso: pesocafe, nombreTienda: nombretienda};
        const aliasusuario=req.body.user;
        const aliasValue=aliasusuario.alias;
        const eliminarCarrito=await carritoUseCases.borrarCafeCarrito(cafe, aliasValue)
        res.status(201).json(eliminarCarrito);
        
    } catch (error) {
        const message = { text: `Error borrando cafe del carrito: ${error.message || error}` };
        console.error(error);
        res.status(500).json(message);  
        
    }
})

// GET http://localhost:3000/api/carrito/getPrecioCarrito
router.get("/getPrecioCarrito", isAuth, isUser, async (req: Request, res: Response) => {
    try {
        const aliasusuario = req.body.user;
        const aliasValue = aliasusuario.alias;
        const carrito = await carritoUseCases.getPrecioTotal(aliasValue);

        res.status(201).json(carrito);

    } catch (error) {
        const message = { text: `Error sacando al carrito: ${error.message || error}` };
        console.error(error);
        res.status(500).json(message);
    }
});

export default router;

