import bcrypt from "bcrypt";

const plainPassword = "password456";
const hashedPassword = bcrypt.hashSync(plainPassword, 10);

console.log("Contraseña en texto plano:", plainPassword);
console.log("Contraseña encriptada:", hashedPassword);

const isMatch = bcrypt.compareSync(plainPassword, hashedPassword);
console.log("¿Coinciden las contraseñas?", isMatch);