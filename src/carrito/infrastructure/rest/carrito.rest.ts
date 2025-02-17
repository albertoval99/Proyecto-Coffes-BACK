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
        const response = await carritoUseCases.addCafeAlCarrito(nombrecafe, tuestecafe, origencafe, pesocafe, nombretienda, aliasValue);
        res.status(201).json({ message: `El cafe ha sido añadido al carrito.` });

    } catch (error) {
        const message = { text: `Error añadiendo al carrito: ${error.message || error}` };
        console.error(error);
        res.status(500).json(message);

    }
});

export default router;

