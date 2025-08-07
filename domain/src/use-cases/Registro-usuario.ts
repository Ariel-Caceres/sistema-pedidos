import type { Usuario } from "../entities/Usuario";

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