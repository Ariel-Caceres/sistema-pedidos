import type { CarritoRepositorio } from "../../services/carritoRepositorio.ts"
import type { CarritoItem } from "../../entities/Carrito.ts"

export async function verCarrito(
    usuarioId: number,
    carritoRepo: CarritoRepositorio
): Promise<CarritoItem[]> {
    const usuarioCart = await carritoRepo.obtenerPorUsuario(usuarioId)
    if (!usuarioCart) {
        throw new Error("No se encontro el carrito");

    }
    return await carritoRepo.obtenerPorUsuario(usuarioId)
}
