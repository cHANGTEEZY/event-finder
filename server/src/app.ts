import express from "express";
import { errorHandler } from "./middlewares/errorHandler.ts";

const app = express();

app.use(express.json());

// Routes

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
