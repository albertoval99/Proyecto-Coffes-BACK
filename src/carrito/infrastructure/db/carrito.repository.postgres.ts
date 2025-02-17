import Cafe from "../../../cafes/domain/Cafe";
import Usuario from "../../../usuarios/domain/Usuario";
import CarritoRepository from "../../domain/carrito.repository";
import { executeQuery } from '../../../context/db/postgres.db';


export default class CarritoRepositoryPostgres implements CarritoRepository {

    async isCafeEnCarrito(nombrecafe: string, tuestecafe: string, origencafe: string, pesocafe: number, nombretienda: string): Promise<boolean> {
        const query = "SELECT * FROM carritos WHERE nombrecafe=$1 AND tuestecafe=$2 AND origencafe=$3 AND pesocafe=$4 AND nombretienda=$5";
        const values = [nombrecafe, tuestecafe, origencafe, pesocafe, nombretienda];

        const result = await executeQuery(query, values);
        // console.log(result);
        // console.log("Parámetros de la consulta:", {
        //     nombrecafe, tuestecafe, origencafe, pesocafe, nombretienda
        // });
        if (result[0] && result[0].cantidad >= 1) {
            return result[0].cantidad;
        }
        return null;
    }

    cantidad = 1;//fuera de todo para que siempre añada de 1 en 1

    async addCafeAlCarrito(nombrecafe: string, tuestecafe: string, origencafe: string, pesocafe: number, nombretienda: string, aliasusuario: string): Promise<Cafe[]> {

        const isCafeEnCarrito = await this.isCafeEnCarrito(nombrecafe, tuestecafe, origencafe, pesocafe, nombretienda);
        if (!isCafeEnCarrito) {
            const query = "INSERT into carritos (nombrecafe,tuestecafe,origencafe,pesocafe,nombretienda,aliasusuario,cantidad) VALUES ($1,$2,$3,$4,$5,$6,$7) returning *";
            const values = [nombrecafe, tuestecafe, origencafe, pesocafe, nombretienda, aliasusuario, this.cantidad]
            console.log(query)
            return await executeQuery(query, values);
        } else {
            //si ya esta en el carrito le sumo 1 a la cantidad actualizandolo
            const query = "UPDATE carritos SET cantidad=cantidad+1 WHERE nombreCafe=$1 AND tuestecafe=$2 AND origencafe=$3 AND pesocafe=$4 AND nombretienda=$5 AND aliasusuario=$6 RETURNING * "
            const values = [nombrecafe, tuestecafe, origencafe, pesocafe, nombretienda, aliasusuario]
            return await executeQuery(query, values);
        }
    }
}