import Administrador from "../../domain/Administrador";
import AdminRepository from "../../domain/administrador.repository";
import { executeQuery } from "../../../context/db/postgres.db";

export default class AdministradorRepositoryPostgres implements AdminRepository {
    async login(administrador: Administrador): Promise<Administrador> {
        const query = 'SELECT * FROM administradores WHERE alias = $1';
        const values = [administrador.alias];

        const result = await executeQuery(query, values);

        if (result.length === 0) throw new Error("Administrador no encontrado")
        
            return {
            alias: result[0].alias,
            password: result[0].password,
            nombreTienda: result[0].nombretienda
        };
    }
    async getAdminByAlias(alias: string): Promise<Administrador> {
        const query = 'SELECT * FROM administradores WHERE alias = $1';
        const values = [alias];

        const result = await executeQuery(query, values);

        return {
            alias: result[0].alias,
            password: result[0].password,
            nombreTienda: result[0].nombretienda
        }
    }
}