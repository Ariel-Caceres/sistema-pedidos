import { describe, it, expect, vi } from "vitest"
import { verCarrito } from "../Carrito/verCarrito.ts"
import type { CarritoRepositorio } from "../../services/carritoRepositorio.ts"

describe("verCarrito", () => {
    const usuarioId = 1

    it("debería retornar el carrito del usuario", async () => {
        const carritoMock = [
            { productoId: 1, cantidad: 2 },
            { productoId: 2, cantidad: 1 }
        ]

        const mockRepo: CarritoRepositorio = {
            agregar: vi.fn(),
            quitar: vi.fn(),
            obtenerPorUsuario: vi.fn().mockResolvedValue(carritoMock),
            vaciar: vi.fn()
        }

        const resultado = await verCarrito(usuarioId, mockRepo)

        expect(mockRepo.obtenerPorUsuario).toHaveBeenCalledWith(usuarioId)
        expect(resultado).toEqual(carritoMock)
    })

    it("debería lanzar error si no se encuentra el carrito", async () => {
        const mockRepo: CarritoRepositorio = {
            agregar: vi.fn(),
            quitar: vi.fn(),
            obtenerPorUsuario: vi.fn().mockResolvedValue(undefined),
            vaciar: vi.fn()
        }

        await expect(
            verCarrito(usuarioId, mockRepo)
        ).rejects.toThrow("No se encontro el carrito")
    })
})
