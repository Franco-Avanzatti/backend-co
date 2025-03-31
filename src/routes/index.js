//Backend-co\src\routes\index.js
import { Router } from "express";
import productsRouter from "./products.routes.js";
import cartsRouter from "./carts.routes.js";

const router = Router();

// Ruta base para /api
router.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la API" });
});

// Rutas específicas
router.use("/products", productsRouter);
router.use("/carts", cartsRouter);

export default router;