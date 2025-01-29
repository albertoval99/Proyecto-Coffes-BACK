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

        const checkAliasQuery = 'SELECT * FROM usuarios WHERE alias = $1';
        const checkAliasResult = await executeQuery(checkAliasQuery, [usuario.alias]);
        if (checkAliasResult.length > 0) throw new Error('El alias ya está en uso.');

        const cifrada = hash(usuario.password);
        usuario.password = cifrada;
        return this.usuarioRepository.registro(usuario);
    }

    async getUserById(id: string): Promise<Usuario> {
        const user = await this.usuarioRepository.getUserById(id);
        if (!user) throw new Error("Usuario no encontrado");
        return user;
    }

}