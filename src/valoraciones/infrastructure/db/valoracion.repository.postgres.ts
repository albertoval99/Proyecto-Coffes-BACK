import Cafe from "../../../cafes/domain/Cafe";
import { executeQuery } from "../../../context/db/postgres.db";
import CafePedido from "../../../pedidos/domain/CafePedido";
import Valoracion from "../../domain/Valoracion";
import ValoracionRepository from "../../domain/valoracion.repository";

export default class ValoracionRepositoryPostgres implements ValoracionRepository {
    async comprobarSiHayValoracion(nombrecafe: string, tuestecafe: string, origencafe: string, pesocafe: number, nombretienda: string, aliasusuario: string): Promise<boolean> {
        const query = `
            SELECT * 
            FROM valoraciones 
            WHERE nombrecafe = $1 
            AND tuestecafe = $2 
            AND origencafe = $3 
            AND pesocafe = $4
            AND nombretienda = $5 
            AND aliasusuario = $6
        `;
        const values = [nombrecafe, tuestecafe, origencafe, pesocafe, nombretienda, aliasusuario];
        const result = await executeQuery(query, values);
        return result.length > 0; // Si tiene al menos una fila, existe valoración
    }

    async insertarValoracion(nombrecafe: string, tuestecafe: string, origencafe: string, pesocafe: number, nombretienda: string, aliasusuario: string, valoracion: number): Promise<void> {
        const query = `
            INSERT INTO valoraciones 
            (nombrecafe, tuestecafe, origencafe, pesocafe, nombretienda, aliasusuario, valoracion)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        const values = [nombrecafe, tuestecafe, origencafe, pesocafe, nombretienda, aliasusuario, valoracion];
        try {
            console.log("Ejecutando consulta INSERT con valores:", values);
            await executeQuery(query, values); // Para solo ejecutar una vez,q sino duplicados
            //console.log("✅ Inserción exitosa");
        } catch (error) {
            console.error("❌ Error al insertar valoración:", error);
        }
    }

    async actualizarValoracion(nombrecafe: string, tuestecafe: string, origencafe: string, pesocafe: number, nombretienda: string, aliasusuario: string, valoracion: number): Promise<void> {
        const query = `
            UPDATE valoraciones
            SET valoracion = $1
            WHERE nombrecafe = $2 
            AND tuestecafe = $3
            AND origencafe = $4 
            AND pesocafe = $5
            AND nombretienda = $6
            AND aliasusuario = $7
        `;
        const values = [valoracion, nombrecafe, tuestecafe, origencafe, pesocafe, nombretienda, aliasusuario];
        try {
            // Si existe, actualiza la valoración, de lo contrario no hace nada
            const result = await executeQuery(query, values);
            if (result.rowCount === 0) {
                console.log("❌ No se encontró ninguna valoración para actualizar.");
            } else {
                console.log("✅ Valoración actualizada con éxito.");
            }
        } catch (error) {
            console.error("❌ Error al actualizar valoración:", error);
        }
    }

    async obtenerCafesDePedidoById(idPedido: number): Promise<CafePedido[]> {
        const query = `
            SELECT 
                nombrecafe,
                tuestecafe,
                origencafe,
                pesocafe,
                nombretienda,
                cantidad,
                precio
            FROM cafes_pedidos 
            WHERE idPedido = $1
        `;
        const values = [idPedido];
        const result = await executeQuery(query, values);

        const cafes: CafePedido[] = result.map((row: any) => ({
            nombrecafe: row.nombrecafe,
            tuestecafe: row.tuestecafe,
            origencafe: row.origencafe,
            pesocafe: row.pesocafe,
            nombretienda: row.nombretienda,
            cantidad: row.cantidad
        }));

        return cafes;
    }

    async gestionarValoracionesDelPedido(idPedido: number, aliasusuario: string, valoraciones: Valoracion[]): Promise<void> {

        // Esto devuelve un array de cafés del pedido
        const cafesDelPedido = await this.obtenerCafesDePedidoById(idPedido);

        // Filtramos los cafés duplicados del pedido
        const cafesUnicos = cafesDelPedido.filter((cafe, index, cafesPedido) => {
            return index === cafesPedido.findIndex((t) => (
                t.nombrecafe === cafe.nombrecafe &&
                t.tuestecafe === cafe.tuestecafe &&
                t.origencafe === cafe.origencafe &&
                t.pesocafe === cafe.pesocafe &&
                t.nombretienda === cafe.nombretienda
            ));
        });

        // Ahora procesamos las valoraciones solo para los cafés únicos
        for (let valoracion of valoraciones) {
            // Aquí verificamos si el café tiene que ser valorado
            const cafePedido = cafesUnicos.find(cafe =>
                cafe.nombrecafe === valoracion.nombrecafe
                && cafe.tuestecafe === valoracion.tuestecafe
                && cafe.origencafe === valoracion.origencafe
                && cafe.pesocafe === valoracion.pesocafe
                && cafe.nombretienda === valoracion.nombreTienda
            );

            if (cafePedido) {
                // Verificamos si ya existe una valoración para este café y usuario
                const existeValoracion = await this.comprobarSiHayValoracion(
                    valoracion.nombrecafe,
                    valoracion.tuestecafe,
                    valoracion.origencafe,
                    valoracion.pesocafe,
                    valoracion.nombreTienda,
                    aliasusuario
                );

                if (!existeValoracion) {
                    // Si no existe la valoración, la insertamos
                    await this.insertarValoracion(
                        valoracion.nombrecafe,
                        valoracion.tuestecafe,
                        valoracion.origencafe,
                        valoracion.pesocafe,
                        valoracion.nombreTienda,
                        aliasusuario,
                        valoracion.valoracion
                    );
                } else {
                    // Si ya existe la valoración, la actualizamos
                    await this.actualizarValoracion(
                        valoracion.nombrecafe,
                        valoracion.tuestecafe,
                        valoracion.origencafe,
                        valoracion.pesocafe,
                        valoracion.nombreTienda,
                        aliasusuario,
                        valoracion.valoracion
                    );
                }
            }
        }
    }
}