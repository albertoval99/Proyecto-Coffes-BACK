import Cafe from '../../cafes/domain/Cafe';
import Usuario from '../../usuarios/domain/Usuario';
export default interface Carrito{
    cafe:Cafe;
    usuario:Usuario;
    cantidadCafe:number;
}