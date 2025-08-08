import { describe, it, expect, vi } from "vitest"
import type { CarritoRepositorio } from "../../services/carritoRepositorio.ts"
import { agregarAlCarrito } from "./agregarAlCarrito.ts"

describe("agregarAlCarrito", () => {
    const usuarioId = 2
    const productoId = 2
    const cantidad = 2

    const crearMockRepo = (overrides: Partial<CarritoRepositorio> = {}): CarritoRepositorio => ({
        obtenerPorUsuario: vi.fn(),
        vaciar: vi.fn(),
        agregar: vi.fn(),
        quitar: vi.fn(),
        ...overrides
    })

    it("debería agregar un producto al carrito", async () => {
        const mockRepo = crearMockRepo({
            agregar: vi.fn().mockResolvedValue(undefined)
        })

        await agregarAlCarrito(usuarioId, productoId, cantidad, mockRepo)

        expect(mockRepo.agregar).toHaveBeenCalledWith(usuarioId, productoId, cantidad)

    })

    it("debería lanzar error si la cantidad es inválida", async () => {
        const mockRepo = crearMockRepo()

        await expect(
            agregarAlCarrito(usuarioId, productoId, 0, mockRepo)
        ).rejects.toThrow("La cantidad debe ser mayor a 0")
    })
})
