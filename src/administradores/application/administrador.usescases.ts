import Administrador from "../domain/Administrador";
import AdminRepository from "../domain/administrador.repository";
import { compare, hash } from "../../context/security/encrypter";

export default class AdministradorUseCases{
    private adminRepository:AdminRepository;

    constructor(adminRepository:AdminRepository){
        this.adminRepository=adminRepository;
    }

    async login(admin: Administrador): Promise<Administrador> {
        if (!admin.alias) throw new Error("Falta alias"); 
        if (!admin.password) throw new Error("Falta password"); 
    
        const adminDB = await this.adminRepository.login(admin);
        if (!adminDB) throw new Error("Admin no encontrado");
    
        const iguales = await compare(admin.password, adminDB.password); 
        if (iguales) {
          return adminDB; 
        } else {
          throw new Error("Admin/contraseña no es correcto"); 
        }
      }

     async getAdminByAlias(alias: string): Promise<Administrador> {
        const admin=await this.adminRepository.getAdminByAlias(alias);
        if(!admin)throw new Error("Administrador no encontrado");
        return admin;
     }
}