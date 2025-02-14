import Cafe from "./Cafe";

export default interface CafeRepository {
    crearCafe(cafe: Cafe): Promise<Cafe>;
    filter(nombre: string | null, tueste: string | null, precioMin: number | null, precioMax: number | null, origen: string | null, nombreTienda: string | null, pagina: number, limite: number, ordenPrecio: 'asc' | 'desc'): Promise<Cafe[]>;
}