import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";//npm install jsonwebtoken
import Message from "../responses/Message";
import Usuario from "../../usuarios/domain/Usuario";
import UsuarioUseCases from "../../usuarios/application/usuario.usecases";
import UsuarioRepositoryPostgres from "../../usuarios/infrastructure/db/usuario.repository.postgres";
import Administrador from "../../administradores/domain/Administrador";
import AdministradorUseCases from "../../administradores/application/administrador.usescases";
import AdministradorRepositoryPostgres from "../../administradores/infrastructure/db/administrador.repository.postgres";
import Tienda from '../../tiendas/domain/Tienda';


const SECRET_KEY: Secret = "malladetaSecretKey";

const adminUseCases = new AdministradorUseCases(new AdministradorRepositoryPostgres);
const usuarioUseCases = new UsuarioUseCases(new UsuarioRepositoryPostgres);

const createToken = (usuario: Usuario): string => {
  const payload = {
    user: {
      alias: usuario.alias,
    },
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1 days" });
};

const createTokenAdmin = (admin: Administrador): string => {
  const payload = {
    admin: {
      alias: admin.alias,
      nombreTienda: admin.nombreTienda 
    },
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1 days" });
};


const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    const token: string | undefined = authHeader && authHeader.split(" ")[1];
    if (token) {
      console.log("✅ Token recibido:", token);
      const decoded: any = jwt.verify(token, SECRET_KEY);
      console.log("✅ Token decodificado:", decoded);
      req.body.user = decoded.user;
      req.body.admin = decoded.admin;
      next();
    } else throw new Error("Token no proporcionado");
  } catch (err) {
    console.error(err);
    const message: Message = { text: err.message || "Token inválido o expirado" };
    res.status(401).json(message);
  }
};


const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const admin = req.body.admin;
    if (admin) {
      const comprobarAdmin = await adminUseCases.getAdminByAlias(admin.alias);
      if (!comprobarAdmin) {
        throw new Error("No se ha encontrado ese administrador");
      }
      next();
    } else {
      res.status(401).json({ "mensaje": "No autorizado" });
    }
  } catch (err) {
    console.error(err);
    const message: Message = { text: String(err) };
    res.status(401).json(message);
  }
};

const isUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body.user;
    console.log("👤 Usuario recibido en isUser:", user);
    if (user) {
      const comprobarUser = await usuarioUseCases.getUserByAlias(user.alias);
      console.log("👤 Verificando si el usuario existe:", comprobarUser);
      if (!comprobarUser) {
        console.log("❌ Usuario no encontrado");
        throw new Error("No se ha encontrado ese usuario");
      }
      next();
    } else {
      console.log("❌ No hay usuario en el body");
      res.status(401).json({ "mensaje": "No autorizado" });
    }
  } catch (err) {
    console.error("❌ Error en isUser:", err);
    const message: Message = { text: String(err) };
    res.status(401).json(message);
  }
};


const decode = (token: string) => {
  return jwt.decode(token);
};


export { decode, createToken, createTokenAdmin, isAuth, isAdmin, isUser };