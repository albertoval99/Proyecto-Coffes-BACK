import Cafe from "../../cafes/domain/Cafe";
import Usuario from "../../usuarios/domain/Usuario";


export default interface CarritoRepository{
    isCafeEnCarrito(nombre:string,tueste:string,origen:string,peso:number,nombretienda:string):Promise<Cafe>;
    addCafeAlCarrito(nombre:string,tueste:string,origen:string,peso:number,nombretienda:string,alias:string):Promise<Cafe[]>;
}