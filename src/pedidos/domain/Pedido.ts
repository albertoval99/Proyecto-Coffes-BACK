import CafePedido from './CafePedido';
export default interface Pedido{
    id:number;
    direccion:string;
    fechaPedido:Date;
    aliasusuario:string;
    tarjeta:string;
    fechaCaducidad:Date;
    cvv:number;
    cafes: CafePedido[];
}