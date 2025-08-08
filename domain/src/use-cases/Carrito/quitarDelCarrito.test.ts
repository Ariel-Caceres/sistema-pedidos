import { describe, it, expect, vi } from "vitest"
import { quitarDelCarrito } from "../Carrito/quitarDelCarrito.ts"
import type { CarritoRepositorio } from "../../services/carritoRepositorio.ts"

describe("quitarDelCarrito", () => {
    const usuarioId = 1
    const productoId = 2

    it("debería quitar un producto del carrito", async () => {
        const mockRepo: CarritoRepositorio = {
            agregar: vi.fn(),
            quitar: vi.fn().mockResolvedValue(undefined),
            obtenerPorUsuario: vi.fn(),
            vaciar: vi.fn()
        }

        await quitarDelCarrito(usuarioId, productoId, mockRepo)

        expect(mockRepo.quitar).toHaveBeenCalledWith(usuarioId, productoId)
    })

    it("debería lanzar error si el producto no existe en el carrito", async () => {
        const mockRepo: CarritoRepositorio = {
            agregar: vi.fn(),
            quitar: vi.fn().mockImplementation(() => {
                throw new Error("Producto no encontrado en el carrito")
            }),
            obtenerPorUsuario: vi.fn(),
            vaciar: vi.fn()
        }

        await expect(
            quitarDelCarrito(usuarioId, productoId, mockRepo)
        ).rejects.toThrow("Producto no encontrado en el carrito")
    })
})
