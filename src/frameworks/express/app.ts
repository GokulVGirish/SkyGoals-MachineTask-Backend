import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import appData from "../../entities/applicationConfig";
import errorHandler from "./middlewares/errorHandler";
import customersRouter from "./routes/route";

dotenv.config();
const app = express();

app.use(express.json());
// appData.CLIENT_ORIGIN; must ise this as origin value
app.use(
  cors({
    origin: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS,PATCH",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);
app.use(`/api`,customersRouter)

app.use(errorHandler)

export default app;

