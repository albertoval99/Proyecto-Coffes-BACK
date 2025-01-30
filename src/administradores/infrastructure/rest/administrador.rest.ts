import { isAuth, createToken, createTokenAdmin } from "../../../context/security/auth";
import Message from "../../../context/responses/Message";
import express, { Router, Request, Response } from "express";
import AdministradorUseCases from "../../application/administrador.usescases";
import AdministradorRepositoryPostgres from "../db/administrador.repository.postgres";

const router = express.Router();
const adminUseCases = new AdministradorUseCases(new AdministradorRepositoryPostgres);

// POST http://localhost:3000/api/administradores/login
router.post("/login", async (req: Request, res: Response) => {
    try {
        const { alias, password } = req.body;
        const admin = await adminUseCases.login({ alias, password });
        const token = createTokenAdmin(admin);
        res.status(201).json({token});

    } catch (error) {
        const message: Message = { text: `Error logueando admin: ${error}` };
        res.status(500).json(message);
    }
});

export default router;