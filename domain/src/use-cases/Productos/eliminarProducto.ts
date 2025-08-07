import type { ProductoRepositorio } from "../../services/productoRepositorio.ts"

export async function eliminarProducto(id: string, productoRepo: ProductoRepositorio) {
    const producto = await productoRepo.buscarPorId(id)
    if (!producto) throw new Error("Producto no encontrado")

    await productoRepo.eliminar(id)
}