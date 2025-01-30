import Cafe from '../domain/Cafe';
import CafeRepository from '../domain/cafe.repository';
export default class CafeUseCases{
    private cafeRepository:CafeRepository;

    constructor(cafeRepository:CafeRepository){
        this.cafeRepository=cafeRepository;
    }

    async crearCafe(cafe: Cafe): Promise<Cafe> {
        if (cafe.nombre === "" || cafe.tueste === "" || cafe.precio === 0 || cafe.peso === 0 || cafe.origen ==="" || cafe.aliasAdmin==="" || cafe.nombreTienda==="") {
            throw new Error("No puede haber campos vacios")
        }
        return this.cafeRepository.crearCafe(cafe);
    }
}