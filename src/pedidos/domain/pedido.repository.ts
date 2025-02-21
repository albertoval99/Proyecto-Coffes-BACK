import Carrito from "../../carrito/domain/Carrito";
import Pedido from "./Pedido";

export default interface PedidoRepository {
    crearPedido(direccion: string, tarjeta: string, fechaCaducidad: string, cvv: number, aliasusuario: string): Promise<Pedido>;
    /** 
    obtenerCarritoConPrecios(aliasusuario: string): Promise<Carrito>;
    insertarDetallesPedido(idPedido: number, carrito: Carrito[]): Promise<void>;
    vaciarCarrito(aliasusuario: string): Promise<void>;*/
}