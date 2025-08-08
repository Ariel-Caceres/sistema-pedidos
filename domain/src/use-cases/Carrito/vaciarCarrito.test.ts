import { describe, it, expect, vi } from "vitest"
import { vaciarCarrito } from "../Carrito/vaciarCarrito.ts"
import type { CarritoRepositorio } from "../../services/carritoRepositorio.ts"

describe("vaciarCarrito", () => {
    const usuarioId = 1

    it("debería vaciar el carrito del usuario", async () => {
        const mockRepo: CarritoRepositorio = {
            agregar: vi.fn(),
            quitar: vi.fn(),
            obtenerPorUsuario: vi.fn(),
            vaciar: vi.fn().mockResolvedValue(undefined)
        }

        await vaciarCarrito(usuarioId, mockRepo)

        expect(mockRepo.vaciar).toHaveBeenCalledWith(usuarioId)
    })

    it("debería lanzar error si no se puede vaciar el carrito", async () => {
        const mockRepo: CarritoRepositorio = {
            agregar: vi.fn(),
            quitar: vi.fn(),
            obtenerPorUsuario: vi.fn(),
            vaciar: vi.fn().mockImplementation(() => {
                throw new Error("No se pudo vaciar el carrito")
            })
        }

        await expect(
            vaciarCarrito(usuarioId, mockRepo)
        ).rejects.toThrow("No se pudo vaciar el carrito")
    })
})
