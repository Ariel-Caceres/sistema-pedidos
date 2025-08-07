import type { PedidoRepositorio } from "../../services/pedidosRepositorio"
import type { Pedido } from "../../entities/Pedido"

export async function listarPedidosPorUsuario(
    usuarioId: string,
    pedidoRepo: PedidoRepositorio
): Promise<Pedido[]> {
    return await pedidoRepo.listarPorUsuario(usuarioId)
}
