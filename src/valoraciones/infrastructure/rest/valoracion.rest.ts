import express, { Router, Request, Response } from "express";
import ValoracionUseCases from "../../application/valoracion.usecases";
import ValoracionRepositoryPostgres from "../db/valoracion.repository.postgres";
import Message from "../../../context/responses/Message";
import { isAuth, createToken, isUser } from "../../../context/security/auth";

const router = express.Router();
const valoracionUseCases = new ValoracionUseCases(new ValoracionRepositoryPostgres);



export default router;