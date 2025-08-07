import type { Producto } from "../entities/Producto.ts"

export interface ProductoRepositorio {
    crear(producto: Omit<Producto, "id">): Promise<Producto>
    buscarPorId(id: string): Promise<Producto | null>
    actualizar(id: string, data: Partial<Producto>): Promise<Producto>
    eliminar(id: string): Promise<void>
    listarTodos(): Promise<Producto[]>
}
