import Administrador from "./Administrador";

export default interface AdminRepository{
    login(administrador: Administrador): Promise<Administrador>;
    getAdminByAlias(alias:string):Promise<Administrador>;
}