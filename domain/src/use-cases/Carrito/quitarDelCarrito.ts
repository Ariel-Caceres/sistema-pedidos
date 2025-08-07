import type { CarritoRepositorio } from "../../services/carritoRepositorio"

export async function quitarDelCarrito(
    usuarioId: number,
    productoId: number,
    carritoRepo: CarritoRepositorio
) {
    return await carritoRepo.quitar(usuarioId, productoId)
}
