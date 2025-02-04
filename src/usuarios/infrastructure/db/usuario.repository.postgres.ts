import Usuario from "../../domain/Usuario";
import UsuarioRepository from "../../domain/usuario.repository";
import { executeQuery } from "../../../context/db/postgres.db";

export default class UsuarioRepositoryPostgres implements UsuarioRepository {

    async registro(usuario: Usuario): Promise<Usuario> {

        const query = 'insert into usuarios (alias, password, fechanacimiento, email) values ($1, $2, $3, $4) returning *';
        const values = [usuario.alias, usuario.password, usuario.fechaNacimiento,usuario.email];

        const rows = await executeQuery(query, values);

        return {
            alias: rows[0].alias,
            password: rows[0].password,
            fechaNacimiento:rows[0].fechanacimiento,
            email:rows[0].email
        };
    }

    async getUserByAlias(alias: string): Promise<Usuario> {
        const query = 'SELECT * FROM usuarios WHERE alias = $1';
        const values = [alias];

        const result = await executeQuery(query, values);

        return {
            alias: result.rows[0].alias,
            password: result.rows[0].password,
            fechaNacimiento:result.rows[0].fechanacimiento,
            email:result.rows[0].email
            
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
            fechaNacimiento:result[0].fechanacimiento,
            email:result[0].email

        }
    }

    // async actualizar(usuario: Usuario): Promise<Usuario> {
    //     const query="UPDATE usuarios SET alias=$1,password=$2,fechanacimiento=$3,email=$4 WHERE alias=$5 returning *";
    //     const values=[usuario.alias,usuario.password,usuario.fechaNacimiento,usuario.email,usuario.alias];
    //     const result= await executeQuery(query,values);

    //     if (result.length === 0) throw new Error("Usuario no encontrado")
    
    //     return {
    //         alias: result[0].alias,
    //         password: result[0].password,
    //         fechaNacimiento: result[0].fechanacimiento,
    //         email: result[0].email
    //     };
    // }
}