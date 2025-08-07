import type { CarritoRepositorio } from "../../services/carritoRepositorio"
import type { CarritoItem } from "../../entities/Carrito"

export async function verCarrito(
    usuarioId: number,
    carritoRepo: CarritoRepositorio
): Promise<CarritoItem[]> {
    return await carritoRepo.obtenerPorUsuario(usuarioId)
}
