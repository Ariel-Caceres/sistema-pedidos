import type { PedidoRepositorio } from "../../services/pedidosRepositorio.ts"
import type { EstadoPedido } from "../../entities/Pedido.ts"
import type { Pedido } from "../../entities/Pedido.ts"

export async function cambiarEstadoPedido(
    pedidoId: number,
    nuevoEstado: EstadoPedido,
    pedidoRepo: PedidoRepositorio
): Promise<Pedido> {
    const pedido = await pedidoRepo.buscarPorId(pedidoId)
    if (!pedido) {
        throw new Error("Pedido no encontrado")
    }
    const actualizado = await pedidoRepo.cambiarEstado(pedidoId, nuevoEstado);
    return actualizado;
}
