import Cafe from "../../../cafes/domain/Cafe";
import Usuario from "../../../usuarios/domain/Usuario";
import CarritoRepository from "../../domain/carrito.repository";
import { executeQuery } from '../../../context/db/postgres.db';


export default class CarritoRepositoryPostgres implements CarritoRepository {

    
       cantidad=1;//fuera de todo para que siempre añada de 1 en 1

       async isCafeEnCarrito(nombre: string, tueste: string, origen: string, peso: number, nombretienda: string): Promise<Cafe> {
           
       }
       
        async addCafeAlCarrito(nombre: string, tueste: string, origen: string, peso: number, nombretienda: string, alias: string): Promise<Cafe[]> {
            const query="INSERT into carritos (nombreCafe,tuestecafe,origencafe,pesoCafe,nombreTienda,aliasUsuario,cantidad) VALUES ($1,$2,$3,$4,$5,$6,$7) returning *";
            
        }