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
        peso: number | null = null,
        nombreTienda: string | null = null,
        pagina: number = 1,
        limite: number = 30,
        ordenPrecio: 'asc' | 'desc' = 'asc'
    ): Promise<Cafe[]> {
        const cafesPorPagina = limite;
        const saltoPaginas = (pagina - 1) * cafesPorPagina;

        let query = "SELECT * FROM cafes";
        const values: any[] = [];
        let condiciones: string[] = [];
        let indiceValue = 1;

        if (nombre !== null) {
            condiciones.push(`nombre ILIKE $${indiceValue}`);
            values.push(`%${nombre}%`);
            indiceValue++;
        }
        if (origen !== null) {
            condiciones.push(`origen ILIKE $${indiceValue}`);
            values.push(`%${origen}%`);
            indiceValue++;
        }

        if (precioMin !== null) {
            condiciones.push(`precio >= $${indiceValue}`);
            values.push(precioMin);
            indiceValue++;
        }

        if (precioMax !== null) {
            condiciones.push(`precio <= $${indiceValue}`);
            values.push(precioMax);
            indiceValue++;
        }

        if (tueste !== null) {
            condiciones.push(`tueste ILIKE $${indiceValue}`);
            values.push(`%${tueste}%`);
            indiceValue++;
        }

        if (nombreTienda !== null) {
            condiciones.push(`nombre_tienda ILIKE $${indiceValue}`);
            values.push(`%${nombreTienda}%`);
            indiceValue++;
        }

        if (peso !== null) {
            condiciones.push(`peso = $${indiceValue}`);
            values.push(peso);
            indiceValue++;
        }


        if (condiciones.length > 0) {
            query += " WHERE " + condiciones.join(" AND ");
        }

        //Para ordenar asc o desc
        query += ` ORDER BY precio ${ordenPrecio}`;

        //Asi aplicamos la paginacion
        query += ` LIMIT $${indiceValue} OFFSET $${indiceValue + 1}`;
        values.push(cafesPorPagina, saltoPaginas);


        const cafes = await executeQuery(query, values);
        return cafes;
    }

}