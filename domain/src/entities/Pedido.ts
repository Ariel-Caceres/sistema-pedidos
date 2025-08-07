
export interface PedidoItem {
    productoId: string;
    cantidad: number;
    precioUnitario: number;
}

export type EstadoPedido = 'pendiente' | 'preparando' | 'listo' | 'entregado';

export interface Pedido {
    id: string;
    usuarioId: string;
    items: PedidoItem[];
    estado: EstadoPedido;
    fecha: Date;
}
