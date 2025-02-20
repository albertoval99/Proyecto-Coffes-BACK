import Cafe from "../../cafes/domain/Cafe";
import Usuario from "../../usuarios/domain/Usuario";
import Carrito from "../domain/Carrito";
import CarritoRepository from "../domain/carrito.repository";

export default class CarritoUseCases {
    private carritoRepository: CarritoRepository;

    constructor(carritoRepository: CarritoRepository) {
        this.carritoRepository = carritoRepository;
    }

    async addCafeAlCarrito(nombrecafe: string, tuestecafe: string, origencafe: string, pesocafe: number, nombretienda: string, aliasusuario: string): Promise<Cafe[]> {
        return await this.carritoRepository.addCafeAlCarrito(nombrecafe, tuestecafe, origencafe, pesocafe, nombretienda, aliasusuario);
    }

    async getCarrito(aliasUsuario: string): Promise<Carrito> {
        if (!aliasUsuario) throw new Error("Falta usuario");
        return await this.carritoRepository.getCarrito(aliasUsuario);
    }

    async borrarCafeCarrito(cafe: Cafe, aliasUsuario: string): Promise<Carrito> {
        if (!aliasUsuario) throw new Error("Falta usuario");
        return await this.carritoRepository.borrarCafeCarrito(cafe, aliasUsuario)
    }
    
    async getPrecioTotal(aliasUsuario: string): Promise<Carrito> {
        if (!aliasUsuario) throw new Error("Falta usuario");
        return await this.carritoRepository.getPrecioTotal(aliasUsuario);
    }
}