import { testDB } from "../src/context/db/test-db";
import express,{Request,Response} from "express";
import pool from "./context/db/postgres.db";

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
//app.use(`${api}/usuarios`, usuarioRouter);




