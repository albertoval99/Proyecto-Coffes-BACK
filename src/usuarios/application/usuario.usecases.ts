import Usuario from "../domain/Usuario";
import UsuarioRepository from "../domain/usuario.repository";
import { compare, hash } from "../../context/security/encrypter";

export default class UsuarioUseCases {
    private usuarioRepository: UsuarioRepository;

    constructor(usuarioRepository: UsuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    async registro(usuario: Usuario): Promise<Usuario> {
        if (!usuario.alias) throw new Error("Falta alias");
        if (!usuario.password) throw new Error("Falta password");
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