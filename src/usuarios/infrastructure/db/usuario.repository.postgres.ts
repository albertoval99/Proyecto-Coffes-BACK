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
        };
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
        let query = "UPDATE usuarios SET ";
        let indiceValor = 1;
        let camposActualizados = false;
        const values = [];

        if (usuario.nombre !== "") {
            query += `nombre = $${indiceValor}`;
            values.push(usuario.nombre)
            indiceValor++;
            camposActualizados = true;
            if (usuario.email || usuario.fechaNacimiento || usuario.imagen) {
                query += ", ";
            }
        }

        if (usuario.email !== "") {
            query += `email = $${indiceValor}`;
            values.push(usuario.email)
            indiceValor++;
            camposActualizados = true;
            if (usuario.fechaNacimiento || usuario.imagen) {
                query += ", ";
            }
        }

        if (usuario.fechaNacimiento !== undefined) {
            query += `fechanacimiento = $${indiceValor}`;
            values.push(usuario.fechaNacimiento)
            indiceValor++;
            camposActualizados = true;
            if (usuario.imagen) {
                query += ", ";
            }
        }

        if (usuario.imagen !== undefined) {
            query += `imagen = $${indiceValor}`;
            values.push(usuario.imagen)
            indiceValor++;
            camposActualizados = true;
        }

        if (!camposActualizados) {
            throw new Error('No hay campos para actualizar');
        }

        query += ` WHERE alias = $${indiceValor}`;
        values.push(usuario.alias);

        query += " RETURNING *";

        const result = await executeQuery(query, values);

        return {
            alias: result[0].alias,
            email: result[0].email,
            nombre: result[0].nombre,
            fechaNacimiento: result[0].fechanacimiento,
            apellidos: result[0].apellidos,
            imagen: result[0].imagen
        };
    }





}