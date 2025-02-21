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
}