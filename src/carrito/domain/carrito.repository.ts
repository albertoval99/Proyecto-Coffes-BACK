import Cafe from "../../cafes/domain/Cafe";
import Usuario from "../../usuarios/domain/Usuario";
import Carrito from './Carrito';


export default interface CarritoRepository{
    isCafeEnCarrito(nombrecafe:string,tuestecafe:string,origencafe:string,pesocafe:number,nombretienda:string):Promise<boolean>;
    addCafeAlCarrito(nombrecafe:string,tuestecafe:string,origencafe:string,pesocafe:number,nombretienda:string,aliasusuario:string):Promise<Cafe[]>;
    getCarrito(aliasUsuario:string):Promise<Carrito>;
    borrarCafeCarrito(cafe:Cafe,aliasUsuario:String):Promise<Carrito>
    getPrecioTotal(aliasUsuario:string):Promise<Carrito>;
}