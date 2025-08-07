import { describe, it, expect, vi, beforeEach } from "vitest"
import { listarPedidosPorUsuario } from "../../../src/use-cases/Pedidos/listarPedidosPorUsuario.ts"
import type { PedidoRepositorio } from "../../../src/services/pedidosRepositorio.ts"
import type { Pedido } from "../../../src/entities/Pedido.ts"

describe("listarPedidosPorUsuario", () => {
    const mockPedidoRepo: PedidoRepositorio = {
        crear: vi.fn(),
        obtenerPorUsuario: vi.fn(),
        cambiarEstado: vi.fn(),
        buscarPorId: vi.fn(),
        actualizar: vi.fn(),
        listarPorUsuario: vi.fn(),
        listarTodos: vi.fn(),
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("devuelve los pedidos solo del usuario indicado", async () => {
        const usuarioId = 42
        const pedidosMock: Pedido[] = [
            {
                id: 1,
                usuarioId,
                items: [],
                estado: "pendiente",
                fecha: new Date(),
            },
            {
                id: 2,
                usuarioId,
                items: [],
                estado: "entregado",
                fecha: new Date(),
            },
        ]

            ; (mockPedidoRepo.listarPorUsuario as any).mockResolvedValue(pedidosMock)

        const resultado = await listarPedidosPorUsuario(usuarioId, mockPedidoRepo)

        expect(mockPedidoRepo.listarPorUsuario).toHaveBeenCalledWith(usuarioId)
        expect(resultado).toEqual(pedidosMock)
    })
})
