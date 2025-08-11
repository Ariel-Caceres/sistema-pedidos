
import express from "express";
import cors from "cors";
import userRoutes from "./infraestructure/http/userRoutes";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());

app.use("/usuarios", userRoutes);

app.get("/", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
    console.log(`Backend escuchando en http://localhost:${PORT}`);
});
