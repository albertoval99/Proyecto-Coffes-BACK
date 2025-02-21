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
    
            const precioTotal = cafePrecio * item.cantidad;
    
            const values = [
                idPedido,
                item.nombrecafe, 
                item.tuestecafe, 
                item.origencafe, 
                item.pesocafe, 
                item.nombretienda,
                item.cantidad,
                precioTotal
            ];
    
            await executeQuery(query, values);
        }
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
    



    async vaciarCarrito(aliasusuario: string): Promise<void> {
        const query = "DELETE FROM carritos WHERE aliasusuario = $1";
        const values = [aliasusuario];
        await executeQuery(query, values);
    }

    async getPedidos(aliasusuario: string): Promise<Pedido[]> {
        const query = `
            SELECT * FROM pedidos WHERE aliasusuario = $1
        `;
        const values = [aliasusuario];
        const result = await executeQuery(query, values);
        return result;
    }
}