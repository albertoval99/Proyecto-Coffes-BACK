import Cafe from "./Cafe";

export default interface CafeRepository {
    crearCafe(cafe:Cafe):Promise<Cafe>;
}