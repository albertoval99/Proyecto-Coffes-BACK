import CafePedido from "../../pedidos/domain/CafePedido";
import Valoracion from "./Valoracion";

export default interface ValoracionRepository {
    comprobarSiHayValoracion(nombrecafe: string, tuestecafe: string, origencafe: string, pesocafe: number, nombretienda: string, aliasusuario: string): Promise<boolean>;
    insertarValoracion(nombrecafe: string, tuestecafe: string, origencafe: string, pesocafe: number, nombretienda: string, aliasusuario: string, valoracion: number): Promise<void>;
    actualizarValoracion(nombrecafe: string, tuestecafe: string, origencafe: string, pesocafe: number, nombretienda: string, aliasusuario: string, valoracion: number): Promise<void>;
    gestionarValoracionesDelPedido(idPedido: number, aliasusuario: string, valoraciones: Valoracion[]): Promise<void>;
    obtenerCafesDePedidoById(idPedido: number): Promise<CafePedido[]>;
}