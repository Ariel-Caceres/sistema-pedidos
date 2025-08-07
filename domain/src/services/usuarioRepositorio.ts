
import type { Usuario } from "../entities/Usuario";

export interface UsuarioRepository {
    buscarPorEmail(email: string): Promise<Usuario | null>;
}
