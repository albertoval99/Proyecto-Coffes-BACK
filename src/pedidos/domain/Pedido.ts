export default interface Pedido{
    id:string;
    direccion:string;
    fechaPedido:Date;
    aliasusuario:string;
    tarjeta:string;
    fechaCaducidad:Date;
    cvv:number;
}