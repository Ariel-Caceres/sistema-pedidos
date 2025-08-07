
import type { UsuarioRepository } from "../../services/usuarioRepositorio.ts"
import type { Usuario } from "../../entities/Usuario.ts"

export async function loginUsuario(
    email: string,
    contraseña: string,
    usuarioRepo: UsuarioRepository
): Promise<Usuario | null> {
    const usuario = await usuarioRepo.buscarPorEmail(email);

    if (!usuario) return null;

    if (usuario.contraseña !== contraseña) return null;

    return usuario;
}
