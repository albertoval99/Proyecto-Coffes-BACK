import Carrito from "../../carrito/domain/Carrito";
import Pedido from "./Pedido";

export default interface PedidoRepository {
    crearPedido(direccion: string, tarjeta: string, fechaCaducidad: string, cvv: number, aliasusuario: string): Promise<Pedido>;
    vaciarCarrito(aliasusuario: string): Promise<void>;
    getPedidos(aliasusuario: string): Promise<Pedido[]>;
}