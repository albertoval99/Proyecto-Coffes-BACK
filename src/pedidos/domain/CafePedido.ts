import Cafe from '../../cafes/domain/Cafe';
export default interface CafePedido {
    nombrecafe: string;
    tuestecafe: string;
    origencafe: string;
    pesocafe: number;
    nombretienda: string;
    cantidad: number;
    precio: number;
}