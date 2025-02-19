import express, { Router, Request, Response } from "express";
import UsuarioUseCases from "../../application/usuario.usecases";
import Message from "../../../context/responses/Message";
import UsuarioRepositoryPostgres from "../db/usuario.repository.postgres";
import { isAuth, createToken, isUser } from "../../../context/security/auth";

const router = express.Router();
const usuarioUseCases = new UsuarioUseCases(new UsuarioRepositoryPostgres);

// POST http://localhost:3000/api/usuarios/registro
router.post("/registro", async (req: Request, res: Response) => {
  try {
    const nuevoUsuario = req.body;
    const response = await usuarioUseCases.registro(nuevoUsuario);
    res.status(201).json({ message: `El usuario ${response.alias} ha sido creado con éxito.` });

  } catch (error) {
    const message = { text: `Error registrando usuario: ${error.message || error}` };
    console.error(error);
    res.status(500).json(message);
  }
});

// POST http://localhost:3000/api/usuarios/login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const usuario = await usuarioUseCases.login({ email, password });
    const token = createToken(usuario);
    res.status(201).json({
      usuario: {
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        email: usuario.email,
        imagen: usuario.imagen,
        alias: usuario.alias,
        fechanacimiento: usuario.fechaNacimiento,
      },
      token
    });

  } catch (error) {
    console.log(error);
    const message: Message = { text: `Error logueando usuario: ${error}` };
    res.status(500).json(message);
  }
});

// PATCH http://localhost:3000/api/usuarios/actualizar
router.patch("/actualizar", async (req: Request, res: Response) => {
  try {
    const { alias, email, nombre, fechaNacimiento, apellidos, imagen } = req.body;
    
    
    const usuario = await usuarioUseCases.actualizar({
      alias,
      email,
      nombre,
      fechaNacimiento,
      apellidos,
      imagen
    });

    res.status(201).json({ usuario });
  } catch (error) {
    console.error("Error en la actualización:", error);
    res.status(500).json({ mensaje: `Error actualizando usuario: ${error.message}` });
  }
});





export default router;