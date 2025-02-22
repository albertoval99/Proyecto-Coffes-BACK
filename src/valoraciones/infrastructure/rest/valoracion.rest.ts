import express, { Router, Request, Response } from "express";
import ValoracionUseCases from "../../application/valoracion.usecases";
import ValoracionRepositoryPostgres from "../db/valoracion.repository.postgres";
import Message from "../../../context/responses/Message";
import { isAuth, createToken, isUser } from "../../../context/security/auth";

const router = express.Router();
const valoracionUseCases = new ValoracionUseCases(new ValoracionRepositoryPostgres);

// POST http://localhost:3000/api/valoraciones/valoracion
router.post("/valoracion", isAuth, isUser, async (req: Request, res: Response) => {
    try {
        const { idPedido, valoraciones } = req.body;
        const alias = req.body.user;
        const aliasValue = alias.alias;

        await valoracionUseCases.gestionarValoracionesDelPedido(idPedido, valoraciones);

        res.status(201).json({ mensaje: "Valoraciones gestionadas con éxito" });
    } catch (error) {
        const message = { text: `Error gestionando la valoración: ${error.message || error}` };
        console.error(error);
        res.status(500).json(message);
    }
});

export default router;