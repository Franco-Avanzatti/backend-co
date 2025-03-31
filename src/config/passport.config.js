import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../persistence/mongo/models/User.models.js";
import dotenv from "dotenv";

dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([(req) => req.cookies.jwt]), // Extrae el token de la cookie 'jwt'
  secretOrKey: process.env.JWT_SECRET, // Clave secreta para verificar el token
};

// Estrategia para validar el JWT
passport.use(
  "jwt",
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, user); // Usuario encontrado
      }
      return done(null, false); // Usuario no encontrado
    } catch (error) {
      return done(error, false); // Error en la validación
    }
  })
);

export default function initializePassport() {
  passport.initialize();
}