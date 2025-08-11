
import type { Request, Response } from "express";
import { crearPedidoDesdeCarrito } from "@domain/use-cases/Pedidos/crearPedidoDesdeCarrito";
import { registrarUsuario as makeUsuario } from "@domain/use-cases/Auth/registrarUsuario";
import { loginUsuario as domainLogin } from "../../../../../domain/src/use-cases/Auth/loguearUsuario";
import { InMemoryUsuarioRepo } from "../../../../../apps/backend/src/infraestructure/http/repositories/inMemoryRepo";

const repo = new InMemoryUsuarioRepo();

export async function register(req: Request, res: Response) {
    try {
        const { nombre, email, contraseña } = req.body;
        if (!nombre || !email || !contraseña) return res.status(400).json({ error: "Faltan datos" });

        const usuario = makeUsuario(nombre, email, contraseña);

        await repo.registrar(usuario);

        return res.status(201).json(usuario);
    } catch (err: any) {
        return res.status(500).json({ error: err.message ?? String(err) });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { email, contraseña } = req.body;
        if (!email || !contraseña) return res.status(400).json({ error: "Faltan datos" });

        const usuario = await domainLogin(email, contraseña, repo);
        if (!usuario) return res.status(401).json({ error: "Credenciales inválidas" });

        return res.json(usuario);
    } catch (err: any) {
        return res.status(500).json({ error: err.message ?? String(err) });
    }
}
