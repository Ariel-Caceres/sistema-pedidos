import type { PedidoRepositorio } from "../../services/pedidosRepositorio"
import type { EstadoPedido } from "../../entities/Pedido"

export async function cambiarEstadoPedido(
    pedidoId: string,
    nuevoEstado: EstadoPedido,
    pedidoRepo: PedidoRepositorio
): Promise<void> {
    const pedido = await pedidoRepo.buscarPorId(pedidoId)
    if (!pedido) {
        throw new Error("Pedido no encontrado")
    }

    pedido.estado = nuevoEstado
    await pedidoRepo.actualizar(pedidoId, pedido)
}
