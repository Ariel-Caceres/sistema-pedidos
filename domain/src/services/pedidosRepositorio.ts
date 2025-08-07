import type { Pedido, PedidoItem, EstadoPedido } from "../entities/Pedido.ts"

export interface PedidoRepositorio {
    crear(pedido: Omit<Pedido, "id">): Promise<Pedido>
    buscarPorId(id: number): Promise<Pedido | null>
    actualizar(id: number, pedido: Pedido): Promise<void>
    listarPorUsuario(usuarioId: number): Promise<Pedido[]>
    listarTodos(): Promise<Pedido[]>
    cambiarEstado: (id: number, estado: string) => Promise<Pedido>
    obtenerPorUsuario: (usuarioId: number) => Promise<Pedido[]>
}