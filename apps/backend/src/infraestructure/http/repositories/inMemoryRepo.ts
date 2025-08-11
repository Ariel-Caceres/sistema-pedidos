// InMemoryUsuarioRepo.ts
import type { Usuario } from "../../../../../../src/entities/Usuario";
import type { UsuarioRepository } from "../../../../../../src/services/usuarioRepositorio";

export class InMemoryUsuarioRepo implements UsuarioRepository {
    private usuarios: Map<string, Usuario> = new Map();

    async buscarPorEmail(email: string): Promise<Usuario | null> {
        for (const u of this.usuarios.values()) {
            if (u.email === email) return u;
        }
        return null;
    }

    async buscarPorId(id: string): Promise<Usuario | null> {
        return this.usuarios.get(id) ?? null;
    }

    async registrar(usuario: Usuario): Promise<void> {
        this.usuarios.set(usuario.id, usuario);
    }

    async listarTodos(): Promise<Usuario[]> {
        return Array.from(this.usuarios.values());
    }
}
