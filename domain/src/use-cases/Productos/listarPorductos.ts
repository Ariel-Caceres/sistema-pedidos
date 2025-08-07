import type { ProductoRepositorio } from "../../services/productoRepositorio"
import type { Producto } from "../../entities/Producto"

export async function listarProductos(productoRepo: ProductoRepositorio): Promise<Producto[]> {
    return await productoRepo.listarTodos()
}