import { describe, it, expect, vi } from "vitest"
import { loginUsuario } from "../Auth/loguearUsuario.ts"
import type { UsuarioRepository } from "../../services/usuarioRepositorio.ts"
import type { Usuario } from "../../entities/Usuario.ts"

describe("loginUsuario", () => {
    const usuarioEjemplo: Usuario = {
        id: "1",
        nombre: "Juan Pérez",
        email: "juan@example.com",
        contraseña: "123456",
        rol: "cliente"
    }

    const mockRepo: UsuarioRepository = {
        buscarPorEmail: vi.fn(),
        // registrar: vi.fn(),
        // buscarPorId: vi.fn(),
        // listarTodos: vi.fn()
    }

    it("debería retornar el usuario si email y contraseña son correctos", async () => {
        vi.mocked(mockRepo.buscarPorEmail).mockResolvedValue(usuarioEjemplo)

        const result = await loginUsuario(
            usuarioEjemplo.email,
            usuarioEjemplo.contraseña,
            mockRepo
        )

        expect(result).toEqual(usuarioEjemplo)
    })

    it("debería retornar null si el usuario no existe", async () => {
        vi.mocked(mockRepo.buscarPorEmail).mockResolvedValue(null)

        const result = await loginUsuario(
            usuarioEjemplo.email,
            usuarioEjemplo.contraseña,
            mockRepo
        )

        expect(result).toBeNull()
    })

    it("debería retornar null si la contraseña es incorrecta", async () => {
        vi.mocked(mockRepo.buscarPorEmail).mockResolvedValue(usuarioEjemplo)

        const result = await loginUsuario(
            usuarioEjemplo.email,
            "contraseñaIncorrecta",
            mockRepo
        )

        expect(result).toBeNull()
    })
})
