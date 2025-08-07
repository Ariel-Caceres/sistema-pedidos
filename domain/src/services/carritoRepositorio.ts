import type { CarritoItem } from "../entities/Carrito"

export interface CarritoRepositorio {
    agregar(
        usuarioId: number,
        productoId: number,
        cantidad: number
    ): Promise<void>

    quitar(
        usuarioId: number,
        productoId: number
    ): Promise<void>

    obtenerPorUsuario(
        usuarioId: number
    ): Promise<CarritoItem[]>

    vaciar(
        usuarioId: number
    ): Promise<void>
}
