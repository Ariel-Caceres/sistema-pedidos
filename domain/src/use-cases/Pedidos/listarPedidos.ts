import type { PedidoRepositorio } from "../../services/pedidosRepositorio.ts"
import type { Pedido } from "../../entities/Pedido.ts"

export async function listarPedidos(
    pedidoRepo: PedidoRepositorio
): Promise<Pedido[]> {
    return await pedidoRepo.listarTodos()
}
