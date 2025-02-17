import Cafe from '../../cafes/domain/Cafe';
import Usuario from '../../usuarios/domain/Usuario';
export default interface Carrito{
    nombrecafe:string;
    tuestecafe:string;
    origencafe:string;
    pesocafe:number;
    nombretienda:string;
    aliasusuario:string;
    cantidad:number;
}