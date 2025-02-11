import Usuario from "../../domain/Usuario";
import UsuarioRepository from "../../domain/usuario.repository";
import { executeQuery } from "../../../context/db/postgres.db";

export default class UsuarioRepositoryPostgres implements UsuarioRepository {

    async registro(usuario: Usuario): Promise<Usuario> {

        const query = 'insert into usuarios (nombre,apellidos,alias, password, fechanacimiento, email, imagen) values ($1, $2, $3, $4, $5,$6,$7) returning *';
        const values = [usuario.nombre, usuario.apellidos, usuario.alias, usuario.password, usuario.fechaNacimiento, usuario.email, usuario.imagen];

        const rows = await executeQuery(query, values);

        return {
            nombre: rows[0].nombre,
            apellidos: rows[0].apellidos,
            alias: rows[0].alias,
            password: rows[0].password,
            fechaNacimiento: rows[0].fechanacimiento,
            email: rows[0].email,
            imagen: rows[0].imagen
        };
    }

    async getUserByAlias(alias: string): Promise<Usuario> {
        const query = 'SELECT * FROM usuarios WHERE alias = $1';
        const values = [alias];

        const result = await executeQuery(query, values);

        return {
            nombre: result.rows[0].nombre,
            apellidos: result.rows[0].apellidos,
            alias: result.rows[0].alias,
            password: result.rows[0].password,
            fechaNacimiento: result.rows[0].fechanacimiento,
            email: result.rows[0].email,
            imagen: result.rows[0].imagen

        }
    }

    async login(usuario: Usuario): Promise<Usuario> {
        const query = 'SELECT * FROM usuarios WHERE email = $1';
        const values = [usuario.email];

        const result = await executeQuery(query, values);
        if (result.length === 0) throw new Error("Usuario no encontrado");

        return {
            nombre: result[0].nombre,
            apellidos: result[0].apellidos,
            alias: result[0].alias,
            password: result[0].password,
            fechaNacimiento: result[0].fechanacimiento,
            email: result[0].email,
            imagen: result[0].imagen

        }
    }

    async actualizar(usuario: Usuario): Promise<Usuario> {
        const query = "UPDATE usuarios SET email=$1,nombre=$2,fechanacimiento=$3,apellidos=$4,imagen=$5 WHERE alias=$6 returning *";
        const values = [usuario.email, usuario.nombre, usuario.fechaNacimiento, usuario.apellidos, usuario.imagen, usuario.alias];
        console.log("Actualizando usuario con alias:", usuario.alias);
        const result = await executeQuery(query, values);


        if (result.length === 0) throw new Error("Usuario no encontrado")

        return {
            alias: usuario.alias,
            email: result[0].email,
            nombre: result[0].nombre,
            fechaNacimiento: result[0].fechanacimiento,
            apellidos: result[0].apellidos,
            imagen: result[0].imagen

        };
    }
}