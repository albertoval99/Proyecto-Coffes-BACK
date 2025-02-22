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
        const { email, password } = req.body;
        const admin = await adminUseCases.login({ email, password });
        const token = createTokenAdmin(admin);
        res.status(201).json({
            admin: {
                alias:admin.alias,
                nombreTienda:admin.nombreTienda,
                email:admin.email
              },
              token
        });

    } catch (error) {
        const message: Message = { text: `Error logueando admin: ${error}` };
        res.status(500).json(message);
    }
});

// PATCH http://localhost:3000/api/administradores/actualizar
router.patch("/actualizar", async (req: Request, res: Response) => {
  try {
    
    const { alias,nombreTienda,email } = req.body;
    
    const admin = await adminUseCases.actualizar({
      alias,
      nombreTienda,
      email,
    });

    res.status(201).json({ admin });
  } catch (error) {
    console.error("Error en la actualización:", error);
    res.status(500).json({ mensaje: `Error actualizando admin: ${error.message}` });
  }
});

// GET http://localhost:3000/api/administradores/pedidos
router.get("/pedidos", async (req: Request, res: Response) => {
  try {
    const pedidos = await adminUseCases.getTodosPedidosRealizados();
    res.status(200).json(pedidos);
  } catch (error) {
    console.error("Error en la consulta de pedidos:", error);
    res.status(500).json({ mensaje: `Error obteniendo pedidos: ${error.message}` });
  }
});

export default router;