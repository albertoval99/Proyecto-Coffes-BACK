import Cafe from "../../cafes/domain/Cafe";
import Usuario from "../../usuarios/domain/Usuario";
import CarritoRepository from "../domain/carrito.repository";

export default class CarritoUseCases {
    private carritoRepository: CarritoRepository;

    constructor(carritoRepository: CarritoRepository) {
        this.carritoRepository = carritoRepository;
    }

    async addCafeAlCarrito(nombrecafe: string, tuestecafe: string, origencafe: string, pesocafe: number, nombretienda: string, aliasusuario: string): Promise<Cafe[]> {

        if (nombrecafe == "" || tuestecafe == "" || origencafe == "" || pesocafe == undefined || nombretienda == "") {
            throw new Error("Faltan datos del cafe");
        }
        return await this.carritoRepository.addCafeAlCarrito(nombrecafe, tuestecafe, origencafe, pesocafe, nombretienda, aliasusuario);

        
    }
}