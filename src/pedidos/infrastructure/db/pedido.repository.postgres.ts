import Pedido from "../../domain/Pedido";
import PedidoRepository from "../../domain/pedido.repository";
import { executeQuery } from '../../../context/db/postgres.db';
import Carrito from '../../../carrito/domain/Carrito';
import Cafe from "../../../cafes/domain/Cafe";

export default class PedidoRepositoryPostgres implements PedidoRepository {
    async crearPedido(direccion: string, tarjeta: string, fechaCaducidad: string, cvv: number, aliasusuario: string): Promise<Pedido> {
        const query = `
            INSERT INTO pedidos (fecha, direccion, tarjeta, fechaCaducidad, cvv, aliasUsuario)
            VALUES (CURRENT_DATE, $1, $2, $3, $4, $5)
            RETURNING *
        `;

        const values = [direccion, tarjeta, fechaCaducidad, cvv, aliasusuario];
        const result = await executeQuery(query, values);
        return result[0];
    }

    async obtenerPrecioCafe(nombreCafe: string, tuesteCafe: string, origenCafe: string, pesoCafe: number, nombreTienda: string): Promise<number> {
        const query = `
            SELECT precio
            FROM cafes
            WHERE nombre = $1
              AND tueste = $2
              AND origen = $3
              AND peso = $4
              AND nombreTienda = $5
        `;
        const values = [nombreCafe, tuesteCafe, origenCafe, pesoCafe, nombreTienda];

        const result = await executeQuery(query, values);

        if (result && result.length > 0) {
            return result[0].precio;
        } else {
            return 0;
        }
    }


    async insertarCafesenPedido(idPedido: number, carrito: Carrito[]): Promise<void> {
        const query = `
            INSERT INTO cafes_pedidos (idPedido, nombreCafe, tuesteCafe, origenCafe, pesoCafe, nombreTienda, cantidad, precio)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;

        for (let item of carrito) {
            const cafePrecio = await this.obtenerPrecioCafe(
                item.nombrecafe,
                item.tuestecafe,
                item.origencafe,
                item.pesocafe,
                item.nombretienda
            );

            const values = [
                idPedido,
                item.nombrecafe,
                item.tuestecafe,
                item.origencafe,
                item.pesocafe,
                item.nombretienda,
                item.cantidad,
                cafePrecio
            ];

            await executeQuery(query, values);
        }
    }



    async vaciarCarrito(aliasusuario: string): Promise<void> {
        const query = "DELETE FROM carritos WHERE aliasusuario = $1";
        const values = [aliasusuario];
        await executeQuery(query, values);
    }

    async getPedidos(aliasusuario: string): Promise<Pedido[]> {
        const query = `
            SELECT 
                p.id AS pedido_id,
                p.fecha,
                p.direccion,
                p.tarjeta,
                p.fechacaducidad,
                p.cvv,
                p.aliasusuario,
                cp.nombrecafe,
                cp.tuestecafe,
                cp.origencafe,
                cp.pesocafe,
                cp.nombretienda,
                cp.cantidad,
                cp.precio
        FROM pedidos p
        LEFT JOIN cafes_pedidos cp ON p.id = cp.idpedido
        WHERE p.aliasusuario = $1
        `;
        const values = [aliasusuario];
        const result = await executeQuery(query, values);

        const pedidosMap = new Map<number, Pedido>();

        result.forEach((row) => {
            //PEDIDO_ID ES EL ALIAS Q HE PUESTO EN LA QUERY
            if (!pedidosMap.has(row.pedido_id)) {
                pedidosMap.set(row.pedido_id, {
                    id: row.pedido_id,
                    fechaPedido: row.fecha,
                    direccion: row.direccion,
                    tarjeta: row.tarjeta,
                    fechaCaducidad: row.fechacaducidad,
                    cvv: row.cvv,
                    aliasusuario: row.aliasusuario,
                    cafes: []
                });
            }

            // Si hay café en el pedido, lo añadimos al array de cafés
            if (row.nombrecafe) {
                pedidosMap.get(row.pedido_id)?.cafes.push({
                    nombrecafe: row.nombrecafe,
                    tuestecafe: row.tuestecafe,
                    origencafe: row.origencafe,
                    pesocafe: row.pesocafe,
                    nombretienda: row.nombretienda,
                    cantidad: row.cantidad,
                    precio: row.precio,
                    precio_total: (row.precio * row.cantidad)
                });
            }
        });

        return Array.from(pedidosMap.values());
    }
}