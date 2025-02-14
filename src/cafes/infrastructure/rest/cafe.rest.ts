import express, { Router, Request, Response } from "express";
import CafeUseCases from "../../application/cafe.usecases";
import CafeRepositoryPostgres from "../db/cafe.repository.postgres";
import Message from "../../../context/responses/Message";
import { isAuth, isAdmin, isUser } from "../../../context/security/auth";


const router = express.Router();
const cafeUseCases = new CafeUseCases(new CafeRepositoryPostgres);


// POST http://localhost:3000/api/cafes/crear
router.post("/crear", isAuth, isAdmin, async (req: Request, res: Response) => {
    try {
        console.log("Alias recibido en la solicitud:", req.body.admin.alias);
        console.log("Tienda recibida en la solicitud:", req.body.admin.nombreTienda);
        const nuevoCafe = {
            nombre: req.body.nombre,
            tueste: req.body.tueste,
            origen: req.body.origen,
            precio: req.body.precio,
            peso: req.body.peso,
            nombreTienda: req.body.admin.nombreTienda,
        };

        const response = await cafeUseCases.crearCafe(nuevoCafe);
        res.status(201).json(`El cafe ${response.nombre} ha sido creado con exito`);

    } catch (error) {
        const message: Message = { text: `Error registrando cafe: ${error}` };
        res.status(500).json(message);
    }
});


// GET http://localhost:3000/api/cafes/filtroCafes
router.get("/filtroCafes", async (req: Request, res: Response) => {
    try {
        //TIENEN QUE ESTAR EN EL ORDEN DEL REPOSITORY!!!!!!!
        const {
            nombre = null,
            tueste = null,
            precioMin = null,
            precioMax = null,
            origen = null,
            nombretienda = null, //SE TIENE QUE LLAMAR IGUAL Q EN LA BBDD
            pagina = 1,
            limite = 30,
            ordenPrecio = "asc",
        } = req.query;

        //Hay q asegurarse q los parametros sean string o null
        const comprobarNombre = typeof nombre === 'string' ? nombre : null;
        const comprobarOrigen  = typeof origen === 'string' ? origen : null;
        const comprobarTueste = typeof tueste === 'string' ? tueste : null;
        const comprobarTienda = typeof nombretienda === 'string' ? nombretienda : null;

        const precioMinValue = precioMin ? parseInt(precioMin as string, 10) : null;
        const precioMaxValue = precioMax ? parseInt(precioMax as string, 10) : null;
        
        
        const cafes = await cafeUseCases.filter(
            comprobarNombre,
            comprobarTueste,
            precioMinValue,
            precioMaxValue,
            comprobarOrigen,
            comprobarTienda,
            Number(pagina),  
            Number(limite),  
            ordenPrecio as "asc" | "desc" 
        );

        /** 
        console.log('Parámetros recibidos en rest:', {
            nombre,
            origen,
            tueste,
            nombretienda,
            precioMinValue,
            precioMaxValue,
          });
          console.log('Parámetros recibidos en el REST:', req.query);*/

        res.status(201).json(cafes);
        //console.log("Cafes filtrados")

    } catch (error) {
        console.error("Error filtrando cafés:", error);
        res.status(500).json({ mensaje: `Error filtrando cafés: ${error.message}` });
    }

});

export default router;