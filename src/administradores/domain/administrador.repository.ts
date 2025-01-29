import Administrador from "./Administrador";

export default interface AdminRepository{
    login(administrador: Administrador): Promise<Administrador>;
    getAdminById(id:string):Promise<Administrador>;
}