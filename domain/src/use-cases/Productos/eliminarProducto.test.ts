import { describe, it, expect, vi } from "vitest"
import type { ProductoRepositorio } from "../../services/productoRepositorio.ts"
import { eliminarProducto } from "./eliminarProducto.ts"

describe("eliminarProducto", () => {
    const producto = {
        id: "123",
        nombre: "Test",
        descripcion: "desc",
        precio: 100,
        stock: 10,
        imagenUrl: "test.png",
        disponible: true,
        creadoEn: new Date()
    }

    const crearMockRepo = (overrides: Partial<ProductoRepositorio> = {}): ProductoRepositorio => ({
        crear: vi.fn(),
        buscarPorId: vi.fn(),
        actualizar: vi.fn(),
        eliminar: vi.fn(),
        listarTodos: vi.fn(),
        ...overrides
    })

    it("debería eliminar el producto si existe", async () => {
        const mockRepo = crearMockRepo({
            buscarPorId: vi.fn().mockResolvedValue(producto),
            eliminar: vi.fn().mockResolvedValue(undefined)
        })

        await eliminarProducto("123", mockRepo)

        expect(mockRepo.buscarPorId).toHaveBeenCalledWith("123")
        expect(mockRepo.eliminar).toHaveBeenCalledWith("123")
    })

    it("debería lanzar error si el producto no existe", async () => {
        const mockRepo = crearMockRepo({
            buscarPorId: vi.fn().mockResolvedValue(undefined)
        })

        await expect(eliminarProducto("123", mockRepo)).rejects.toThrow("Producto no encontrado")
        expect(mockRepo.eliminar).not.toHaveBeenCalled()
    })
})
