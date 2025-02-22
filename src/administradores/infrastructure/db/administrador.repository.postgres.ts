import Administrador from "../../domain/Administrador";
import AdminRepository from "../../domain/administrador.repository";
import { executeQuery } from "../../../context/db/postgres.db";
import Pedido from "../../../pedidos/domain/Pedido";

export default class AdministradorRepositoryPostgres implements AdminRepository {
    async login(administrador: Administrador): Promise<Administrador> {
        const query = 'SELECT * FROM administradores WHERE email = $1';
        const values = [administrador.email];

        const result = await executeQuery(query, values);

        if (result.length === 0) throw new Error("Administrador no encontrado")

        return {
            alias: result[0].alias,
            password: result[0].password,
            nombreTienda: result[0].nombretienda,
            email: result[0].email
        };
    }
    async getAdminByAlias(alias: string): Promise<Administrador> {
        const query = 'SELECT * FROM administradores WHERE alias = $1';
        const values = [alias];

        const result = await executeQuery(query, values);

        return {
            alias: result[0].alias,
            password: result[0].password,
            nombreTienda: result[0].nombretienda,
            email: result[0].email
        }
    }

    async actualizar(administrador: Administrador): Promise<Administrador> {
        let query = "UPDATE administradores SET ";
        let indiceValor = 1;
        let camposActualizados = false;
        const values = [];

        if (administrador.nombreTienda !== "") {
            query += `nombretienda = $${indiceValor}`;
            values.push(administrador.nombreTienda)
            indiceValor++;
            camposActualizados = true;
            if (administrador.email) {
                query += ", ";
            }
        }

        if (administrador.email !== "") {
            query += `email = $${indiceValor}`;
            values.push(administrador.email)
            indiceValor++;
            camposActualizados = true;
        }

        if (!camposActualizados) {
            throw new Error('No hay campos para actualizar');
        }

        query += ` WHERE alias = $${indiceValor}`;
        values.push(administrador.alias);

        query += " RETURNING *";

        const result = await executeQuery(query, values);


        return {
            alias: result[0].alias,
            password: result[0].password,
            nombreTienda: result[0].nombreTienda,
            email: result[0].email
        };
    }

    async getTodosPedidosRealizados(): Promise<Pedido[]> {
        const query = `
        SELECT u.nombre, 
            u.apellidos, 
            u.alias, 
            u.email, 
            p.id AS pedido_id, 
            p.fecha AS fecha_pedido, 
            p.direccion
        FROM usuarios u
        INNER JOIN pedidos p ON u.alias = p.aliasUsuario
        `;
        //INNER JOIN xq asi saco solo los usuarios que tengan pedidos
        const result = await executeQuery(query);
        return result;
    }
}