import { describe, it, expect } from "vitest"
import { registrarUsuario } from "./registrarUsuario.ts"

describe("registrarUsuario", () => {
    it("debería crear un usuario con datos correctos", () => {
        const nombre = "Juan"
        const email = "juan@mail.com"
        const contraseña = "1234"

        const usuario = registrarUsuario(nombre, email, contraseña)

        expect(usuario).toBeDefined()
        expect(usuario.id).toBeTypeOf("string")
        expect(usuario.nombre).toBe(nombre)
        expect(usuario.email).toBe(email)
        expect(usuario.contraseña).toBe(contraseña)
        expect(usuario.rol).toBe("cliente")
    })
})
