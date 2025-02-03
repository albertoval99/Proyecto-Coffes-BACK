import Usuario from "../../domain/Usuario";
import UsuarioRepository from "../../domain/usuario.repository";
import { executeQuery } from "../../../context/db/postgres.db";

export default class UsuarioRepositoryPostgres implements UsuarioRepository {

    async registro(usuario: Usuario): Promise<Usuario> {

        const query = 'insert into usuarios (alias, password) values ($1, $2) returning *';
        const values = [usuario.alias, usuario.password];

        const rows = await executeQuery(query, values);

        return {
            alias: rows[0].alias,
            password: rows[0].password,
        };
    }

    async getUserByAlias(alias: string): Promise<Usuario> {
        const query = 'SELECT * FROM usuarios WHERE alias = $1';
        const values = [alias];

        const result = await executeQuery(query, values);

        return {
            alias: result.rows[0].alias,
            password: result.rows[0].password,
        }
    }

    async login(usuario: Usuario): Promise<Usuario> {
        const query='SELECT * FROM usuarios WHERE alias = $1';
        const values=[usuario.alias];

        const result= await executeQuery(query,values);
        if(result.length===0) throw new Error("Usuario no encontrado");

        return {
            alias:result[0].alias,
            password: result[0].password,
        }
    }

    async actualizar(usuario: Usuario): Promise<Usuario> {
        const query="UPDATE usuarios SET alias='$1',password='$2' WHERE alias='$3'";
        const values=[usuario.alias,usuario.password,usuario.alias];
        const result= await executeQuery(query,values);

        return {
            alias:result[0].alias,
            password:result[0].password
        }
    }
}