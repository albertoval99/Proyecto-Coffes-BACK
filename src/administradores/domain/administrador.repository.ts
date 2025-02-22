import Pedido from "../../pedidos/domain/Pedido";
import Administrador from "./Administrador";

export default interface AdminRepository{
    login(administrador: Administrador): Promise<Administrador>;
    getAdminByAlias(alias:string):Promise<Administrador>;
    actualizar(administrador: Administrador):Promise<Administrador>;
    getTodosPedidosRealizados():Promise<Pedido[]>;
}