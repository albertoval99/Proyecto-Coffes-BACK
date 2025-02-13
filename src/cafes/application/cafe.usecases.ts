import Cafe from '../domain/Cafe';
import CafeRepository from '../domain/cafe.repository';
export default class CafeUseCases {
    private cafeRepository: CafeRepository;

    constructor(cafeRepository: CafeRepository) {
        this.cafeRepository = cafeRepository;
    }

    async crearCafe(cafe: Cafe): Promise<Cafe> {
        if (cafe.nombre === "" || cafe.tueste === "" || cafe.precio === 0 || cafe.peso === 0 || cafe.origen === "" || cafe.nombreTienda === "") {
            throw new Error("No puede haber campos vacios")
        }
        return this.cafeRepository.crearCafe(cafe);
    }

    async filter(nombre: string | null, tueste: string | null, precioMin: number | null, precioMax: number | null, origen: string | null, peso: number | null, nombreTienda: string | null, pagina: number, limite: number, ordenPrecio: 'asc' | 'desc'): Promise<Cafe[]> {
        if (pagina < 1) {
            throw new Error('La página debe ser mayor o igual a 1');
        }

        if (ordenPrecio !== 'asc' && ordenPrecio !== 'desc') {
            throw new Error('El valor de ordenPrecio debe ser "asc" o "desc"');
        }

        if (precioMin !== null && precioMax !== null && precioMin > precioMax) {
            throw new Error('El precio mínimo no puede ser mayor que el precio máximo');
        }

        return this.cafeRepository.filter(nombre, tueste, precioMin, precioMax, origen, peso, nombreTienda, pagina, limite, ordenPrecio);
    }

}