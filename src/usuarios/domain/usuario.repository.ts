import Usuario from './Usuario';

export default interface UsuarioRepository {
    registro(usuario:Usuario):Promise<Usuario>;
    login(usuario: Usuario): Promise<Usuario>;
    getUserByAlias(alias:string):Promise<Usuario>;
    actualizar(usuario:Usuario):Promise<Usuario>;
    
}