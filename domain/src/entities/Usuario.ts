export interface Usuario {
    id: string;
    nombre: string;
    email: string;
    contraseña: string;
    rol: 'cliente' | 'admin' | 'cocinero';
}