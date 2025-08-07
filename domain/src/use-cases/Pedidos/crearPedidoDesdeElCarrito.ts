import type { PedidoRepositorio } from "../../services/pedidosRepositorio"
import type { CarritoRepositorio } from "../../services/carritoRepositorio"
import type { Pedido, PedidoItem, EstadoPedido } from "../../entities/Pedido"

export async function crearPedidoDesdeCarrito(
    usuarioId: number,
    carritoRepo: CarritoRepositorio,
    pedidoRepo: PedidoRepositorio
): Promise<Pedido> {
    const itemsCarrito = await carritoRepo.obtenerPorUsuario(usuarioId)
    if (itemsCarrito.length === 0) {
        throw new Error("El carrito está vacío")
    }

    const itemsPedido: PedidoItem[] = itemsCarrito.map(({ productoId, cantidad }) => ({
        productoId,
        cantidad,
        precioUnitario: 0,
    }))

    const nuevoPedido: Omit<Pedido, "id"> = {
        usuarioId,
        items: itemsPedido,
        estado: "pendiente",
        fecha: new Date(),
    }

    const pedidoCreado = await pedidoRepo.crear(nuevoPedido)

    await carritoRepo.vaciar(usuarioId)

    return pedidoCreado
}
