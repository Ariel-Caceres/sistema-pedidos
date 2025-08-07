import { describe, it, expect, vi } from "vitest"
import type { ProductoRepositorio } from "../../services/productoRepositorio.ts"
import { listarProductos } from "../Productos/listarPorductos.ts"

describe("listarProductos", () => {
    const producto1 = {
        id: "123",
        nombre: "Producto A",
        descripcion: "desc A",
        precio: 100,
        stock: 5,
        imagenUrl: "a.png",
        disponible: true,
        creadoEn: new Date()
    }

    const producto2 = {
        id: "456",
        nombre: "Producto B",
        descripcion: "desc B",
        precio: 200,
        stock: 3,
        imagenUrl: "b.png",
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

    it("debería devolver todos los productos", async () => {
        const mockRepo = crearMockRepo({
            listarTodos: vi.fn().mockResolvedValue([producto1, producto2])
        })

        const resultado = await listarProductos(mockRepo)

        expect(mockRepo.listarTodos).toHaveBeenCalled()
        expect(resultado).toEqual([producto1, producto2])
    })

    it("debería devolver un array vacío si no hay productos", async () => {
        const mockRepo = crearMockRepo({
            listarTodos: vi.fn().mockResolvedValue([])
        })

        const resultado = await listarProductos(mockRepo)

        expect(resultado).toEqual([])
        expect(mockRepo.listarTodos).toHaveBeenCalled()
    })
})
