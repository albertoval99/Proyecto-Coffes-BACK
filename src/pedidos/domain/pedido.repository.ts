import Cafe from "../../cafes/domain/Cafe";
import Carrito from "../../carrito/domain/Carrito";
import Pedido from "./Pedido";

export default interface PedidoRepository {
    crearPedido(direccion: string, tarjeta: string, fechaCaducidad: string, cvv: number, aliasusuario: string): Promise<Pedido>;
    insertarCafesenPedido(idPedido: number, carrito: Carrito[]): Promise<void>
    obtenerPrecioCafe(nombreCafe: string, tuesteCafe: string, origenCafe: string, pesoCafe: number, nombretienda: string): Promise<number>;
    vaciarCarrito(aliasusuario: string): Promise<void>;
    getPedidos(aliasusuario: string): Promise<Pedido[]>;
}