import type { CarritoRepositorio } from "../../services/carritoRepositorio.ts"

export async function agregarAlCarrito(
    usuarioId: number,
    productoId: number,
    cantidad: number,
    carritoRepo: CarritoRepositorio
) {
    return await carritoRepo.agregar(usuarioId, productoId, cantidad)
}
