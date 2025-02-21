import Cafe from "../../../cafes/domain/Cafe";
import Usuario from "../../../usuarios/domain/Usuario";
import CarritoRepository from "../../domain/carrito.repository";
import { executeQuery } from '../../../context/db/postgres.db';
import Carrito from "../../domain/Carrito";


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
            const query = "INSERT into carritos (nombrecafe,tuestecafe,origencafe,pesocafe,nombretienda,aliasusuario,cantidad) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *";
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

    async getCarrito(aliasUsuario: string): Promise<Carrito> {
        const query = "SELECT * FROM carritos WHERE aliasusuario = $1";
        const values = [aliasUsuario]
        const result = await executeQuery(query, values);
        return result;
    }

    async borrarCafeCarrito(cafe: Cafe, aliasUsuario: string): Promise<Carrito> {
        const query = "DELETE FROM carritos WHERE nombrecafe = $1 AND tuestecafe = $2 AND origencafe = $3 AND pesocafe = $4 AND nombretienda = $5 AND aliasusuario = $6";
        const values = [cafe.nombre, cafe.tueste, cafe.origen, cafe.peso, cafe.nombreTienda, aliasUsuario];
        const result = await executeQuery(query, values);
        return result;
    }

    async getPrecioTotal(aliasUsuario: string): Promise<Carrito> {
        const query =
            "SELECT carrito.*, cafe.precio, (carrito.cantidad * cafe.precio) as precio_total " +
            "FROM carritos carrito " +
            "JOIN cafes cafe ON carrito.nombrecafe = cafe.nombre " +
            "AND carrito.tuestecafe = cafe.tueste " +
            "AND carrito.origencafe = cafe.origen " +
            "AND carrito.pesocafe = cafe.peso " +
            "AND carrito.nombretienda = cafe.nombretienda "+
            "WHERE carrito.aliasusuario = $1";
        const values = [aliasUsuario];
        const result = await executeQuery(query, values);
        return result;
    }
}