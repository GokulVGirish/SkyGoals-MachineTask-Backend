import dotenv from "dotenv"
dotenv.config()

const appData = {
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
};
export default appData