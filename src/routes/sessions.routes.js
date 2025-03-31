import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import User from "../persistence/mongo/models/User.models.js";

const router = Router();

// Ruta para registrar usuarios
router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password, role } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: "error", message: "El usuario ya existe" });
    }

    // Crear el usuario (el middleware `pre("save")` encriptará la contraseña)
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      age,
      password, // Contraseña en texto plano, será encriptada por el middleware
      role: role || "user",
    });

    res.status(201).json({ status: "ok", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Error interno del servidor" });
  }
});

// Ruta para login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ status: "error", message: "Usuario no encontrado" });
    }

    // Comparar la contraseña enviada con la almacenada
    console.log("Contraseña enviada:", password);
    console.log("Contraseña almacenada:", user.password);
    const isMatch = bcrypt.compareSync(password, user.password);
    console.log("Comparación:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ status: "error", message: "Contraseña incorrecta" });
    }

    // Generar el token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Enviar el token en una cookie
    res.cookie("jwt", token, { httpOnly: true }).json({ status: "ok", message: "Login exitoso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Error interno del servidor" });
  }
});

// Ruta para obtener el usuario actual
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
    // Profe en producción, nunca se debe devolver la contraseña. Acá la dejo para verificar que ande bien
  res.json({ status: "ok", user: req.user });
});

// Ruta para logout
router.post("/logout", (req, res) => {

    res.clearCookie("jwt").json({ status: "ok", message: "Logout exitoso" });
  });

export default router;