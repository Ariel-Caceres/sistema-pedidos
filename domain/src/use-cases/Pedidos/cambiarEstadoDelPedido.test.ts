import { describe, it, expect, vi, beforeEach } from "vitest";
import { cambiarEstadoPedido } from "../../../src/use-cases/Pedidos/cambiarEstadoDelPedido.ts";
import type { PedidoRepositorio } from "../../../src/services/pedidosRepositorio.ts";
import type { Pedido } from "../../../src/entities/Pedido.ts";

describe("cambiarEstadoDelPedido", () => {
    const mockPedidoRepo: PedidoRepositorio = {
        crear: vi.fn(),
        obtenerPorUsuario: vi.fn(),
        cambiarEstado: vi.fn(),
        buscarPorId: vi.fn(),
        actualizar: vi.fn(),
        listarPorUsuario: vi.fn(),
        listarTodos: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("lanza error si el pedido no existe", async () => {
        (mockPedidoRepo.buscarPorId as any).mockResolvedValue(null);

        await expect(() =>
            cambiarEstadoPedido(1, "entregado", mockPedidoRepo)
        ).rejects.toThrow("Pedido no encontrado");

        expect(mockPedidoRepo.buscarPorId).toHaveBeenCalledWith(1);
        expect(mockPedidoRepo.cambiarEstado).not.toHaveBeenCalled();
    });

    it("cambia el estado del pedido si existe", async () => {
        const pedidoExistente: Pedido = {
            id: 1,
            usuarioId: 123,
            items: [],
            estado: "pendiente",
            fecha: new Date(),
        };

        (mockPedidoRepo.buscarPorId as any).mockResolvedValue(pedidoExistente);
        (mockPedidoRepo.cambiarEstado as any).mockResolvedValue({
            ...pedidoExistente,
            estado: "entregado"
        });

        const resultado = await cambiarEstadoPedido(1, "entregado", mockPedidoRepo);

        expect(mockPedidoRepo.buscarPorId).toHaveBeenCalledWith(1);
        expect(mockPedidoRepo.cambiarEstado).toHaveBeenCalledWith(1, "entregado");

        expect(resultado.estado).toBe("entregado");
    });
});
