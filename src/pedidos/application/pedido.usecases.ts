import Cafe from '../../cafes/domain/Cafe';
import Carrito from '../../carrito/domain/Carrito';
import Pedido from '../domain/Pedido';
import PedidoRepository from '../domain/pedido.repository';

export default class PedidoUseCases {

    private pedidoRepository: PedidoRepository;

    constructor(pedidoRepository: PedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }
    
    async crearPedido(direccion: string, tarjeta: string, fechaCaducidad: string, cvv: number, aliasusuario: string): Promise<Pedido> {
        if (!direccion) throw new Error("Falta direccion");
        if (!aliasusuario) throw new Error("Falta usuario");
        if (!tarjeta) throw new Error("Falta tarjeta");
        if (!fechaCaducidad) throw new Error("Falta fecha de caducidad");
        if (!cvv) throw new Error("Falta cvv");
        return await this.pedidoRepository.crearPedido(direccion, tarjeta, fechaCaducidad, cvv,aliasusuario);
    }
     async insertarCafesenPedido(idPedido: number, carrito: Carrito[]): Promise<void> {
        if (!idPedido) throw new Error("Falta idPedido");
        if (!carrito) throw new Error("Falta carrito");

        return await this.pedidoRepository.insertarCafesenPedido(idPedido, carrito);
     }
    async vaciarCarrito(aliasusuario: string): Promise<void> {
        if (!aliasusuario) throw new Error("Falta usuario");
        return await this.pedidoRepository.vaciarCarrito(aliasusuario);
    }
    async getPedidos(aliasusuario: string): Promise<Pedido[]> {
        if (!aliasusuario) throw new Error("Falta usuario");
        return await this.pedidoRepository.getPedidos(aliasusuario);
    }
}