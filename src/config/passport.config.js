//Backend-co\src\config\passport.config.js
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
//import User from '../models/User.model.js';
import User from '../persistence/mongo/models/User.models.js';
import dotenv from 'dotenv';

dotenv.config();

// Opciones de configuración de la estrategia JWT
const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([(req) => req.cookies.jwt]), // Obtención desde la cookie 'jwt'
  secretOrKey: process.env.JWT_SECRET, // Clave secreta para la verificación del token
};

// Función que inicializa la estrategia Passport
export default function initializePassport() {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        // Buscar usuario por el id del JWT
        const user = await User.findById(jwt_payload.id);
        if (user) {
          return done(null, user); // El usuario existe y se pasa a la siguiente parte del flujo
        }
        return done(null, false); // Si no se encuentra el usuario, fallar el proceso
      } catch (error) {
        return done(error, false); // Error al intentar encontrar el usuario
      }
    })
  );
}
