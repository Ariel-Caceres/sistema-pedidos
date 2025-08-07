import type { ProductoRepositorio } from "../../services/productoRepositorio"

interface ActualizarProductoParams {
    id: string
    nombre?: string
    descripcion?: string
    precio?: number
    stock?: number
    imagenUrl?: string
}

export async function actualizarProducto(
    data: ActualizarProductoParams,
    productoRepo: ProductoRepositorio
) {
    const productoExistente = await productoRepo.buscarPorId(data.id)
    if (!productoExistente) throw new Error("Producto no encontrado")

    const actualizado = { ...productoExistente, ...data }
    return await productoRepo.actualizar(data.id, actualizado)
}
