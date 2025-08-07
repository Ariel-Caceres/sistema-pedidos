import { describe, it, expect, vi, beforeEach } from "vitest";
import { crearPedidoDesdeCarrito } from "../../../src/use-cases/Pedidos/crearPedidoDesdeCarrito.ts";
import type { CarritoRepositorio } from "../../../src/services/carritoRepositorio.ts";
import type { PedidoRepositorio } from "../../../src/services/pedidosRepositorio.ts";
import type { Pedido } from "../../../src/entities/Pedido.ts";

describe("crearPedidoDesdeCarrito", () => {
    const usuarioId = 1;
    let mockCarritoRepo: CarritoRepositorio;
    let mockPedidoRepo: PedidoRepositorio;

    beforeEach(() => {
        mockCarritoRepo = {
            obtenerPorUsuario: vi.fn(),
            vaciar: vi.fn(),
            agregar: vi.fn(),
            quitar: vi.fn(),
        };
        mockPedidoRepo = {
            crear: vi.fn(),
            obtenerPorUsuario: vi.fn(),
            cambiarEstado: vi.fn(),
            buscarPorId: vi.fn(),
            actualizar: vi.fn(),
            listarPorUsuario: vi.fn(),
            listarTodos: vi.fn(),
        };
        vi.clearAllMocks();
    });

    it("lanza error si el carrito está vacío", async () => {
        (mockCarritoRepo.obtenerPorUsuario as any).mockResolvedValue([]);
        await expect(
            crearPedidoDesdeCarrito(usuarioId, mockCarritoRepo, mockPedidoRepo)
        ).rejects.toThrow("El carrito está vacío");
    });

    it("crea un pedido si el carrito tiene productos", async () => {
        const mockItemsCarrito = [
            { productoId: "abc123", cantidad: 2 },
            { productoId: "xyz789", cantidad: 1 },
        ];

        (mockCarritoRepo.obtenerPorUsuario as any).mockResolvedValue(mockItemsCarrito);
        (mockPedidoRepo.crear as any).mockImplementation(async (pedidoSinId: any) => ({
            ...pedidoSinId,
            id: 99,
        }));

        const resultado = await crearPedidoDesdeCarrito(
            usuarioId,
            mockCarritoRepo,
            mockPedidoRepo
        );

        expect(mockCarritoRepo.obtenerPorUsuario).toHaveBeenCalledWith(usuarioId);
        expect(mockPedidoRepo.crear).toHaveBeenCalledWith({
            usuarioId,
            items: [
                { productoId: "abc123", cantidad: 2, precioUnitario: 0 },
                { productoId: "xyz789", cantidad: 1, precioUnitario: 0 },
            ],
            estado: "pendiente",
            fecha: expect.any(Date),
        });
        expect(mockCarritoRepo.vaciar).toHaveBeenCalledWith(usuarioId);
        expect(resultado).toMatchObject({
            id: 99,
            usuarioId,
            items: [
                { productoId: "abc123", cantidad: 2, precioUnitario: 0 },
                { productoId: "xyz789", cantidad: 1, precioUnitario: 0 },
            ],
            estado: "pendiente",
            fecha: expect.any(Date),
        });
    });
});
