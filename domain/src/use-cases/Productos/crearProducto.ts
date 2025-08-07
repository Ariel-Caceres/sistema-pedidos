import type { Producto } from "../../entities/Producto.ts"
import type { ProductoRepositorio } from "../../services/productoRepositorio.ts"

type ProductoSinId = Omit<Producto, "id">

interface CrearProductoParams {
    nombre: string
    descripcion: string
    precio: number
    stock: number
    imagenUrl?: string
}

export async function crearProducto(
    data: CrearProductoParams,
    productoRepo: ProductoRepositorio
): Promise<Producto> {
    const producto: ProductoSinId = {
        ...data,
        disponible: true,
    }

    return await productoRepo.crear(producto)
}

