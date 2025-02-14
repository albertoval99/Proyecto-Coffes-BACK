import Cafe from "../../domain/Cafe";
import CafeRepository from "../../domain/cafe.repository";
import { executeQuery } from '../../../context/db/postgres.db';

export default class CafeRepositoryPostgres implements CafeRepository {

    async crearCafe(cafe: Cafe): Promise<Cafe> {

        const query = "INSERT INTO cafes (nombre,tueste,precio,origen,peso,nombreTienda) VALUES ($1,$2,$3,$4,$5,$6) returning *";
        const values = [cafe.nombre, cafe.tueste, cafe.precio, cafe.origen, cafe.peso, cafe.nombreTienda];

        const rows = await executeQuery(query, values);

        return {
            nombre: rows[0].nombre,
            tueste: rows[0].tueste,
            precio: rows[0].precio,
            origen: rows[0].origen,
            peso: rows[0].peso,
            nombreTienda: rows[0].nombretienda,

        };
    }

    async filter(
        nombre: string | null = null,
        tueste: string | null = null,
        precioMin: number | null = null,
        precioMax: number | null = null,
        origen: string | null = null,
        nombreTienda: string | null = null,
        pagina: number = 1,
        limite: number = 15,
        ordenPrecio: 'asc' | 'desc' = 'asc'
    ): Promise<Cafe[]> {

        
        const cafesPorPagina = limite;
        const saltoPaginas = (pagina - 1) * cafesPorPagina;

        let query = "SELECT * FROM cafes";
        const values = [];
        let indiceValue = 1;
        let tieneCondiciones = false;

        if (nombre !== null) {
            query += ` WHERE nombre ILIKE '%' || $${indiceValue} || '%'`;
            values.push(nombre);
            indiceValue++;
            tieneCondiciones = true;
        }

        if (origen !== null) {
            if (tieneCondiciones) {
                query += ` AND origen ILIKE '%' || $${indiceValue} || '%'`;
            } else {
                query += ` WHERE origen ILIKE '%' || $${indiceValue} || '%'`;
                tieneCondiciones = true;
            }
            values.push(origen);
            indiceValue++;
        }


        if (tueste !== null) {
            if (tieneCondiciones) {
                query += ` AND tueste ILIKE '%' || $${indiceValue} || '%'`;
            } else {
                query += ` WHERE tueste ILIKE '%' || $${indiceValue} || '%'`;
                tieneCondiciones = true;
            }
            values.push(tueste);
            indiceValue++;
        }


        if (nombreTienda !== null) {
            if (tieneCondiciones) {
                query += ` AND nombretienda ILIKE '%' || $${indiceValue} || '%'`;
            } else {
                query += ` WHERE nombretienda ILIKE '%' || $${indiceValue} || '%'`;
                tieneCondiciones = true;
            }
            values.push(nombreTienda);
            indiceValue++;
        }

        if (precioMin !== null) {
            if (tieneCondiciones) {
                query += ` AND precio >= $${indiceValue}`;
            } else {
                query += ` WHERE precio >= $${indiceValue}`;
                tieneCondiciones = true;
            }
            values.push(precioMin);
            indiceValue++;
        }

        if (precioMax !== null) {
            if (tieneCondiciones) {
                query += ` AND precio <= $${indiceValue}`;
            } else {
                query += ` WHERE precio <= $${indiceValue}`;
                tieneCondiciones = true;
            }
            values.push(precioMax);
            indiceValue++;
        }


        //Para ordenar asc o desc
        query += ` ORDER BY precio ${ordenPrecio}`;

        //Asi aplicamos la paginacion
        query += ` LIMIT $${indiceValue} OFFSET $${indiceValue + 1}`;
        values.push(cafesPorPagina, saltoPaginas);

        /** 
        console.log("Consulta SQL:", query);
        console.log("Valores:", values);
        console.log('Parámetros recibidos en el Repository:', {
            nombre,
            tueste,
            precioMin,
            precioMax,
            origen,
            nombreTienda,
            pagina,
            limite,
            ordenPrecio
          });*/
          
        const cafes = await executeQuery(query, values);
        return cafes;
    }

}