import Cafe from "../../cafes/domain/Cafe";
import Usuario from "../../usuarios/domain/Usuario";


export default interface CarritoRepository{
    isCafeEnCarrito(nombrecafe:string,tuestecafe:string,origencafe:string,pesocafe:number,nombretienda:string):Promise<boolean>;
    addCafeAlCarrito(nombrecafe:string,tuestecafe:string,origencafe:string,pesocafe:number,nombretienda:string,aliasusuario:string):Promise<Cafe[]>;
    //borrarCafeDelPedido(idCafe:string, cantidad:number): Promise<Usuario>;
}