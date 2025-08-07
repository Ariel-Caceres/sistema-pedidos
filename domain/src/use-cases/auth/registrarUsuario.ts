import type { Usuario } from "../../entities/Usuario.ts"

export function registrarUsuario(
    nombre: string,
    email: string,
    contraseña: string
): Usuario {
    return {
        id: crypto.randomUUID(),
        nombre,
        email,
        contraseña,
        rol: "cliente",
    };
}