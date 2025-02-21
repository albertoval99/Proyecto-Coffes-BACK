import Pedido from "../../domain/Pedido";
import PedidoRepository from "../../domain/pedido.repository";
import { executeQuery } from '../../../context/db/postgres.db';
import Carrito from '../../../carrito/domain/Carrito';

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