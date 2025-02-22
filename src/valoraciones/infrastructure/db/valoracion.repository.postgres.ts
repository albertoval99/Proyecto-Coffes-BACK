import Valoracion from "../../domain/Valoracion";
import ValoracionRepository from "../../domain/valoracion.repository";

export default class ValoracionRepositoryPostgres implements ValoracionRepository{
    async comprobarSiHayValoracion(nombrecafe: string, tuestecafe: string, origencafe: string, pesocafe: number, preciocafe: number, nombretienda: string, aliasusuario: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async insertarValoracion(nombrecafe: string, tuestecafe: string, origencafe: string, pesocafe: number, preciocafe: number, nombretienda: string, aliasusuario: string, valoracion: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async actualizarValoracion(nombrecafe: string, tuestecafe: string, origencafe: string, pesocafe: number, preciocafe: number, nombretienda: string, aliasusuario: string, valoracion: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async gestionarValoracionesDelPedido(idPedido: number, valoraciones: Valoracion[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
}