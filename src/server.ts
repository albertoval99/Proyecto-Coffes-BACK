import express from "express";
import usuarioRouter from "./usuarios/infrastructure/rest/usuario.rest";
import administradorRouter from "./administradores/infrastructure/rest/administrador.rest";
import cafeRouter from "./cafes/infrastructure/rest/cafe.rest";

const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../doc/swagger.json");

app.use(express.json());
//http://localhost:3000/api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));



const api = "/api";
app.use(`${api}/usuarios`, usuarioRouter);
app.use(`${api}/administradores`, administradorRouter);
app.use(`${api}/cafes`, cafeRouter);


export default app;
