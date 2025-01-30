import Cafe from "../../domain/Cafe";
import CafeRepository from "../../domain/cafe.repository";
import { executeQuery } from '../../../context/db/postgres.db';

export default class CafeRepositoryPostgres implements CafeRepository{

    async crearCafe(cafe: Cafe): Promise<Cafe> {
        
        const query="INSERT INTO cafes (nombre,tueste,precio,origen,aliasAdmin) VALUES ($1,$2,$3,$4,$5) returning *";
        const values=[cafe.nombre,cafe.tueste,cafe.precio,cafe.origen,cafe.aliasAdmin];

        const rows= await executeQuery(query,values);

        return {
            nombre: rows[0].nombre,
            tueste:rows[0].tueste,
            precio:rows[0].precio,
            origen:rows[0].origen,
            nombreTienda:rows[0].nombreTienda,
            aliasAdmin:rows[0].aliasAdmin
        };
    }

}