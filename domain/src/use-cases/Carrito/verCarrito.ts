import type { CarritoRepositorio } from "../../services/carritoRepositorio.ts"
import type { CarritoItem } from "../../entities/Carrito.ts"

export async function verCarrito(
    usuarioId: number,
    carritoRepo: CarritoRepositorio
): Promise<CarritoItem[]> {
    return await carritoRepo.obtenerPorUsuario(usuarioId)
}
