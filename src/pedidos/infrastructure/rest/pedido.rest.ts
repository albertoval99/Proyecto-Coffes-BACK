import express, { Router, Request, Response } from "express";
import PedidoUseCases from '../../application/pedido.usecases';
import PedidoRepositoryPostgres from '../db/pedido.repository.postgres';

import { isAuth, isUser } from "../../../context/security/auth";

const router = express.Router();
const pedidoUseCases = new PedidoUseCases(new PedidoRepositoryPostgres);


// POST http://localhost:3000/api/pedido/crearPedido
router.post("/crearPedido", isAuth, isUser, async (req: Request, res: Response) => {
    try {
        const { direccion, tarjeta, fechacaducidad, cvv,carrito } = req.body;
        const alias = req.body.user;
        const aliasValue = alias.alias;
        const pedido = await pedidoUseCases.crearPedido(direccion, tarjeta, fechacaducidad, cvv, aliasValue);
        await pedidoUseCases.insertarCafesenPedido(pedido.id, carrito);
        await pedidoUseCases.vaciarCarrito(aliasValue);
        res.status(201).json({ mensaje: "Pedido creado con éxito", pedido,carrito });
       
    } catch (error) {
        const message = { text: `Error creando el pedido: ${error.message || error}` };
        console.error(error);
        res.status(500).json(message);
    }
});

// GET http://localhost:3000/api/pedido/getPedidos
router.get("/getPedidos", isAuth, isUser, async (req: Request, res: Response) => {
    try {
        const alias = req.body.user;
        const aliasValue = alias.alias;
        const pedidos = await pedidoUseCases.getPedidos(aliasValue);
        res.status(201).json(pedidos);
        
    } catch (error) {
        const message = { text: `Error obteniendo pedidos: ${error.message || error}` };
        console.error(error);
        res.status(500).json(message);
        
    }
});


export default router;