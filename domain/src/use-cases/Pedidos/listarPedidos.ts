import type { PedidoRepositorio } from "../../services/pedidosRepositorio"
import type { Pedido } from "../../entities/Pedido"

export async function listarPedidos(
    pedidoRepo: PedidoRepositorio
): Promise<Pedido[]> {
    return await pedidoRepo.listarTodos()
}
