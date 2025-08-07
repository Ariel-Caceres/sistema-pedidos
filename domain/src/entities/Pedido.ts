
export interface PedidoItem {
    productoId: number;
    cantidad: number;
    precioUnitario: number;
}

export type EstadoPedido = 'pendiente' | 'preparando' | 'listo' | 'entregado';

export interface Pedido {
    id: number;
    usuarioId: number;
    items: PedidoItem[];
    estado: EstadoPedido;
    fecha: Date;
}
