import Cafe from "./Cafe";

export default interface CafeRepository {
    crearCafe(cafe:Cafe):Promise<Cafe>;
    filter(nombre:string,tueste:string,precio:number,origen:string,peso:number,nombreTienda:string,pagina:number):Promise<Cafe[]>;
}