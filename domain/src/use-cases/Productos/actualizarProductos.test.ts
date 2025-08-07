import { describe, it, expect, vi, beforeEach } from "vitest"
import { actualizarProducto } from "../../../src/use-cases/Productos/actualizarProductos.ts"
import type { Producto } from "../../../src/entities/Producto.ts"
import type { ProductoRepositorio } from "../../../src/services/productoRepositorio.ts"

describe("actualizarProducto", () => {
    let mockRepo: ProductoRepositorio

    beforeEach(() => {
        mockRepo = {
            crear: vi.fn(),
            buscarPorId: vi.fn(),
            actualizar: vi.fn(),
            eliminar: vi.fn(),
            listarTodos: vi.fn()
        }
        vi.clearAllMocks()
    })

    it("debería actualizar el producto si existe", async () => {
        const productoExistente: Producto = {
            id: "abc123",
            nombre: "Hamburguesa",
            descripcion: "Con queso",
            precio: 1500,
            imagenUrl: "img.png",
            disponible: true
        }

        const dataActualizacion = {
            id: "abc123",
            precio: 1800,
            disponible: true
        }

        const productoEsperado = {
            ...productoExistente,
            ...dataActualizacion
        }

            ; (mockRepo.buscarPorId as any).mockResolvedValue(productoExistente)
            ; (mockRepo.actualizar as any).mockResolvedValue(productoEsperado)

        const resultado = await actualizarProducto(dataActualizacion, mockRepo)

        expect(mockRepo.buscarPorId).toHaveBeenCalledWith("abc123")
        expect(mockRepo.actualizar).toHaveBeenCalledWith("abc123", productoEsperado)
        expect(resultado).toEqual(productoEsperado)
    })

    it("debería lanzar error si el producto no existe", async () => {
        ; (mockRepo.buscarPorId as any).mockResolvedValue(null)

        const data = {
            id: "inexistente",
            nombre: "Nuevo nombre"
        }

        await expect(actualizarProducto(data, mockRepo)).rejects.toThrow("Producto no encontrado")
        expect(mockRepo.actualizar).not.toHaveBeenCalled()
    })
})
