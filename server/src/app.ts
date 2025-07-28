import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.ts";
import createUser from "./routes/user-details/userRoute.ts";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Routes
app.use("/api", createUser);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
