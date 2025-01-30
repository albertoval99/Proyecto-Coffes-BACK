import express, { Router,Request, Response } from "express";
import CafeUseCases from "../../application/cafe.usecases";
import CafeRepositoryPostgres from "../db/cafe.repository.postgres";
import Message from "../../../context/responses/Message";
import { isAuth,isAdmin,isUser} from "../../../context/security/auth";


const router = express.Router();
const cafeUseCases= new CafeUseCases(new CafeRepositoryPostgres);


// POST http://localhost:3000/api/cafes/crear
router.post("/crear",isAuth,isAdmin,async (req:Request,res:Response)=>{
    try {
        console.log("Alias recibido en la solicitud:", req.body.admin.alias);
        const nuevoCafe = {
            nombre:req.body.nombre,
            tueste:req.body.tueste,
            origen:req.body.origen,
            precio:req.body.precio,
            tienda:req.body.admin.tienda,
            nombreTienda:req.body.nombreTienda,
            aliasAdmin: req.body.admin.alias 
        };
       
        const response= await cafeUseCases.crearCafe(nuevoCafe);
        res.status(201).json(`El cafe ${response.nombre} ha sido creado con exito`);
 
    } catch (error) {
        const message: Message = { text: `Error registrando cafe: ${error}` };
        res.status(500).json(message);
    }
});

export default router;