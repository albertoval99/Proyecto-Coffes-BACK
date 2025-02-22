import ValoracionRepository from "../domain/valoracion.repository";

export default class ValoracionUseCases{
    private valoracionRepository: ValoracionRepository;

    constructor(valoracionRepository: ValoracionRepository){
        this.valoracionRepository = valoracionRepository;
    }

    async comprobarSiHayValoracion(nombrecafe: string, tuestecafe: string, origencafe: string, pesocafe: number, preciocafe: number, nombretienda: string, aliasusuario: string): Promise<boolean> {
        return true;
    }
}