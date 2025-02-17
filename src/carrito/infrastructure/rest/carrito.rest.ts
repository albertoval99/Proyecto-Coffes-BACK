import express, { Router, Request, Response } from "express";
import CarritoUseCases from '../../application/carrito.usecases';
import CarritoRepositoryPostgres from "../db/carrito.repository.postgres";
import Message from "../../../context/responses/Message";


const router = express.Router();
const carritoUseCases= new CarritoUseCases(new CarritoRepositoryPostgres)

router.post("/addCafeAlCarrito",async (req: Request, res: Response) => {
    const {nombre,tueste,origen,peso,nombreTienda,alias,cantidadCafe}=req.body;
    const respone= await carritoUseCases.addCafeAlCarrito(cafe, usuario, cantidadCafe)

});

export default router;

