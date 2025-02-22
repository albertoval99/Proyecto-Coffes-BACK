import Valoracion from "../domain/Valoracion";
import ValoracionRepository from "../domain/valoracion.repository";

export default class ValoracionUseCases {
    private valoracionRepository: ValoracionRepository;

    constructor(valoracionRepository: ValoracionRepository) {
        this.valoracionRepository = valoracionRepository;
    }

    async gestionarValoracionesDelPedido(idPedido: number, aliasusuario: string, valoraciones: Valoracion[]): Promise<void> {
        if (!idPedido) throw new Error("No se encuentra el id del pedido");
        if (!aliasusuario) throw new Error("No se encuentra el alias del usuario");
        if (!valoraciones) throw new Error("No se encuentran valoraciones");
        return this.valoracionRepository.gestionarValoracionesDelPedido(idPedido,aliasusuario, valoraciones);
    }
}