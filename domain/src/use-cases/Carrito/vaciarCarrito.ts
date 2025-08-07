import type { CarritoRepositorio } from "../../services/carritoRepositorio"

export async function vaciarCarrito(
    usuarioId: number,
    carritoRepo: CarritoRepositorio
) {
    return await carritoRepo.vaciar(usuarioId)
}
