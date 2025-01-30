import express from "express";
import usuarioRouter from "./usuarios/infrastructure/rest/usuario.rest";
import administradorRouter from "./administradores/infrastructure/rest/administrador.rest";
import cafeRouter from "./cafes/infrastructure/rest/cafe.rest";

const port = 3000;
const app = express();
app.use(express.json());

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en el puerto: ${port} 🚀`);
});

const api = "/api";
app.use(`${api}/usuarios`, usuarioRouter);
app.use(`${api}/administradores`, administradorRouter);
app.use(`${api}/cafes`, cafeRouter);
