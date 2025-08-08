import type { CarritoRepositorio } from "../../services/carritoRepositorio.ts"

export async function agregarAlCarrito(
    usuarioId: number,
    productoId: number,
    cantidad: number,
    carritoRepo: CarritoRepositorio
) {
    if (cantidad <= 0) {
        throw new Error("La cantidad debe ser mayor a 0");

    }


    return await carritoRepo.agregar(usuarioId, productoId, cantidad)
}
