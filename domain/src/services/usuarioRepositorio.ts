
import type { Usuario } from "../entities/Usuario.ts"

export interface UsuarioRepository {
    buscarPorEmail(email: string): Promise<Usuario | null>;
}
