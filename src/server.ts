import express from "express";
import usuarioRouter from "./usuarios/infrastructure/rest/usuario.rest";
import administradorRouter from "./administradores/infrastructure/rest/administrador.rest";
import cafeRouter from "./cafes/infrastructure/rest/cafe.rest";
import carritoRouter from "./carrito/infrastructure/rest/carrito.rest";
import pedidoRouter from "./pedidos/infrastructure/rest/pedido.rest";
import valoracionesRouter from "./valoraciones/infrastructure/rest/valoracion.rest";

const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../doc/swagger.json");

const cors = require('cors');
const corsOptions = {
   origin: "http://localhost:5173"
}
app.use(cors(corsOptions));

app.use(express.json());

//http://localhost:3000/api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));



const api = "/api";
app.use(`${api}/usuarios`, usuarioRouter);
app.use(`${api}/administradores`, administradorRouter);
app.use(`${api}/cafes`, cafeRouter);
app.use(`${api}/carrito`,carritoRouter);
app.use(`${api}/pedido`,pedidoRouter);
app.use(`${api}/valoraciones`,valoracionesRouter);


export default app;
