export interface CarritoItem {
    productoId: string;
    cantidad: number;
}

export interface Carrito {
    usuarioId: string;
    items: CarritoItem[];
}