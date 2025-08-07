import { crearProducto } from "..//Productos/crearProducto.ts"
import { vi, describe, it, expect } from "vitest"

describe("crearProducto", () => {
    it("debería crear un producto con ID y fecha", async () => {
        const productoRepoMock = {
            crear: vi.fn(),
        }

        const data = {
            nombre: "Sanguche de milanesa",
            descripcion: "Un sanguche god de milanesa",
            precio: 5000,
            stock: 10,
            disponible: true,
        }

        await crearProducto(data, productoRepoMock as any)

        expect(productoRepoMock.crear).toHaveBeenCalledTimes(1)

        const mockCalls = productoRepoMock.crear.mock.calls
        const arg = mockCalls[0]?.[0]

        expect(arg).toBeDefined()
        expect(arg).toMatchObject(data)

    })
})
