import type { Pedido, PedidoItem, EstadoPedido } from "../entities/Pedido"

export interface PedidoRepositorio {
    crear(pedido: Omit<Pedido, "id">): Promise<Pedido>
    buscarPorId(id: string): Promise<Pedido | null>
    actualizar(id: string, pedido: Pedido): Promise<void>
    listarPorUsuario(usuarioId: string): Promise<Pedido[]>
    listarTodos(): Promise<Pedido[]>
}