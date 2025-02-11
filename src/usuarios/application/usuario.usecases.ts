import Usuario from "../domain/Usuario";
import UsuarioRepository from "../domain/usuario.repository";
import { compare, hash } from "../../context/security/encrypter";
import { executeQuery } from "../../context/db/postgres.db";

export default class UsuarioUseCases {
    private usuarioRepository: UsuarioRepository;

    constructor(usuarioRepository: UsuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    async registro(usuario: Usuario): Promise<Usuario> {
        if (!usuario.alias) throw new Error("Falta alias");
        if (!usuario.password) throw new Error("Falta password");

        const comprobarAlias = 'SELECT * FROM usuarios WHERE alias = $1';
        const result = await executeQuery(comprobarAlias, [usuario.alias]);
        if (result.length > 0) throw new Error('El alias ya existe');

        const cifrada = hash(usuario.password);
        usuario.password = cifrada;
        return this.usuarioRepository.registro(usuario);
    }

    async login(usuario: Usuario): Promise<Usuario> {
        if(!usuario.email) throw new Error("Falta email");
        if(!usuario.password) throw new Error("Falta password");

        const userDB= await this.usuarioRepository.login(usuario);
        if(!userDB) throw new Error("Usuario no encontrado");

        const iguales= await compare(usuario.password,userDB.password);
        if(iguales){
            return userDB;
        }else{
            throw new Error("Usuario/contraseña no es correcto");
        }
    }

    async getUserByAlias(alias: string): Promise<Usuario> {
        const user = await this.usuarioRepository.getUserByAlias(alias);
        if (!user) throw new Error("Usuario no encontrado");
        return user;
    }

     async actualizar(usuario: Usuario): Promise<Usuario> {
        return await this.usuarioRepository.actualizar(usuario);

     }

}