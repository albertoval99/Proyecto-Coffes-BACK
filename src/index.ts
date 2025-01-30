import { testDB } from "../src/context/db/test-db";
import express,{Request,Response} from "express";
import usuarioRouter from "./usuarios/infrastructure/rest/usuario.rest";
import administradorRoter from "./administradores/infrastructure/rest/administrador.rest";
import cafeRouter from "./cafes/infrastructure/rest/cafe.rest";

const port=3000;
const app=express();
app.use(express.json());

const startServer = async () => {
    //1º Verifica la conexión a la base de datos
    await testDB();
    app.listen(port, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${port}🚀`);
    });
  };

startServer();

const api="/api";
app.use(`${api}/usuarios`, usuarioRouter);
app.use(`${api}/administradores`, administradorRoter);
app.use(`${api}/cafes`, cafeRouter);





