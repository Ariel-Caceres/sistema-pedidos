import type { PedidoRepositorio } from "../../services/pedidosRepositorio.ts"
import type { Pedido } from "../../entities/Pedido.ts"

export async function listarPedidosPorUsuario(
    usuarioId: number,
    pedidoRepo: PedidoRepositorio
): Promise<Pedido[]> {
    return await pedidoRepo.listarPorUsuario(usuarioId)
}
