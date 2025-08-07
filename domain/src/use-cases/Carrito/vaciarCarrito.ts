import type { CarritoRepositorio } from "../../services/carritoRepositorio.ts"

export async function vaciarCarrito(
    usuarioId: number,
    carritoRepo: CarritoRepositorio
) {
    return await carritoRepo.vaciar(usuarioId)
}
