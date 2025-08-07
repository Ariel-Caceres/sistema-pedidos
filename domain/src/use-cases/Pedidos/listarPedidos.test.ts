import { describe, it, expect, vi, beforeEach } from "vitest"
import { listarPedidos } from "../../../src/use-cases/Pedidos/listarPedidos.ts"
import type { PedidoRepositorio } from "../../../src/services/pedidosRepositorio.ts"
import type { Pedido } from "../../../src/entities/Pedido.ts"

describe("listarPedidos", () => {
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

    it("devuelve la lista completa de pedidos", async () => {
        const pedidosMock: Pedido[] = [
            {
                id: 1,
                usuarioId: 123,
                items: [],
                estado: "pendiente",
                fecha: new Date(),
            },
            {
                id: 2,
                usuarioId: 456,
                items: [],
                estado: "entregado",
                fecha: new Date(),
            },
        ]

            ; (mockPedidoRepo.listarTodos as any).mockResolvedValue(pedidosMock)

        const resultado = await listarPedidos(mockPedidoRepo)

        expect(mockPedidoRepo.listarTodos).toHaveBeenCalled()
        expect(resultado).toEqual(pedidosMock)
    })
})
