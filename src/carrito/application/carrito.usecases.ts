import Cafe from "../../cafes/domain/Cafe";
import Usuario from "../../usuarios/domain/Usuario";
import CarritoRepository from "../domain/carrito.repository";

export default class CarritoUseCases{
    private carritoRepository:CarritoRepository;

    constructor(carritoRepository:CarritoRepository){
        this.carritoRepository=carritoRepository;
    }

    async addCafeAlCarrito(cafe: Cafe, usuario: Usuario, cantidadCafe: number) {
        if(cantidadCafe<=0) throw new Error("La cantidad tiene que ser mayor que 0")
        if(!cafe) throw new Error("Falta cafe")
        if(!usuario) throw new Error("Falta usuario")        
    }
}