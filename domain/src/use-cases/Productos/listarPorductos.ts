import type { ProductoRepositorio } from "../../services/productoRepositorio.ts"
import type { Producto } from "../../entities/Producto.ts"

export async function listarProductos(productoRepo: ProductoRepositorio): Promise<Producto[]> {
    return await productoRepo.listarTodos()
}