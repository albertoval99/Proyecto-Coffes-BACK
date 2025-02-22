import Cafe from "../../../cafes/domain/Cafe";
import { executeQuery } from "../../../context/db/postgres.db";
import Valoracion from "../../domain/Valoracion";
import ValoracionRepository from "../../domain/valoracion.repository";

export default class ValoracionRepositoryPostgres implements ValoracionRepository {
    async comprobarSiHayValoracion(nombrecafe: string, tuestecafe: string, origencafe: string, pesocafe: number, preciocafe: number, nombretienda: string, aliasusuario: string): Promise<boolean> {
        const query = `
            SELECT * 
            FROM valoraciones 
            WHERE nombrecafe = $1 
            AND tuestecafe = $2 
            AND origencafe = $3 
            AND pesocafe = $4
            AND preciocafe = $5
            AND nombretienda = $6 
            AND aliasusuario = $7
        `;
        const values = [nombrecafe, tuestecafe, origencafe, pesocafe, preciocafe, nombretienda, aliasusuario];
        const result = await executeQuery(query, values);
        return result.length > 0; //Si tiene al menos una fila, existe valoración
    }

    async insertarValoracion(nombrecafe: string, tuestecafe: string, origencafe: string, pesocafe: number, preciocafe: number, nombretienda: string, aliasusuario: string, valoracion: number): Promise<void> {
        const query = `
            INSERT INTO valoraciones 
            (nombrecafe, tuestecafe, origencafe, pesocafe,precioCafe,nombretienda, aliasusuario, valoracion)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;
        const values = [nombrecafe, tuestecafe, origencafe, pesocafe, preciocafe, nombretienda, aliasusuario, valoracion];
        await executeQuery(query, values);
    }

    async actualizarValoracion(nombrecafe: string, tuestecafe: string, origencafe: string, pesocafe: number, preciocafe: number, nombretienda: string, aliasusuario: string, valoracion: number): Promise<void> {
        const query = `
            UPDATE valoraciones
            SET valoracion = $1
            WHERE nombrecafe = $2 
            AND tuestecafe = $3
            AND origencafe = $4 
            AND pesocafe = $5
            AND preciocafe = $6
            AND nombretienda = $7
            AND aliasusuario = $8
        `;
        const values = [valoracion, nombrecafe, tuestecafe, origencafe, pesocafe, preciocafe, nombretienda, aliasusuario];
        await executeQuery(query, values);
    }

    async obtenerCafesDePedidoById(idPedido: number): Promise<Cafe[]> {
        const query = `
        SELECT 
            nombrecafe,
            tuestecafe,
            origencafe,
            pesocafe,
            nombretienda,
            cantidad,
            precio
        FROM cafes_pedidos 
        WHERE idPedido = $1
    `;
        const values = [idPedido];
        const result = await executeQuery(query, values);

        // SIEMPRE HAY QUE MAPEAR CUANDO SE QUIERE SACAR MAS DE UNA FILA
        const cafes: Cafe[] = result.map((row: any) => ({
            nombrecafe: row.nombrecafe,
            tuestecafe: row.tuestecafe,
            origencafe: row.origencafe,
            pesocafe: row.pesocafe,
            nombretienda: row.nombretienda,
            cantidad: row.cantidad,
            precio: row.precio
        }));

        return cafes;
    }

    async gestionarValoracionesDelPedido(idPedido: number, valoraciones: Valoracion[]): Promise<void> {

        //Esto devuelve un array de cafes,y x eso podemos coger los atributos de cafe
        const cafesDelPedido = await this.obtenerCafesDePedidoById(idPedido);

        for (let valoracion of valoraciones) {
            const cafePedido = cafesDelPedido.find(cafe => {
                cafe.nombre === valoracion.nombrecafe
                    && cafe.tueste === valoracion.tuestecafe
                    && cafe.origen === valoracion.origencafe
                    && cafe.peso === valoracion.pesocafe
                    && cafe.nombreTienda === valoracion.nombreTienda
            });

            if (cafePedido) {
                const existeValoracion = await this.comprobarSiHayValoracion(
                    valoracion.nombrecafe,
                    valoracion.tuestecafe,
                    valoracion.origencafe,
                    valoracion.pesocafe,
                    valoracion.preciocafe,
                    valoracion.nombreTienda,
                    valoracion.aliasusuario
                );

                if (existeValoracion) {
                    await this.actualizarValoracion(
                        valoracion.nombrecafe,
                        valoracion.tuestecafe,
                        valoracion.origencafe,
                        valoracion.pesocafe,
                        valoracion.preciocafe,
                        valoracion.nombreTienda,
                        valoracion.aliasusuario,
                        valoracion.valoracion
                    );
                } else {
                    await this.insertarValoracion(
                        valoracion.nombrecafe,
                        valoracion.tuestecafe,
                        valoracion.origencafe,
                        valoracion.pesocafe,
                        valoracion.preciocafe,
                        valoracion.nombreTienda,
                        valoracion.aliasusuario,
                        valoracion.valoracion
                    );
                }
            }
        }
    }
}