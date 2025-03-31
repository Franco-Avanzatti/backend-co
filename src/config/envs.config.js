import dotenv from "dotenv";

dotenv.config();

const envsConfig = {
  PORT: process.env.PORT || 4000,
  MONGO_URL: process.env.MONGO_URI,
  SESSION_SECRET: process.env.SESSION_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default envsConfig;