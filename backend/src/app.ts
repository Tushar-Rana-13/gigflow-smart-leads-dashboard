import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import leadRoutes from "./routes/lead.routes";

import errorMiddleware from "./middleware/error.middleware";
import notFoundMiddleware from "./middleware/notFound.middleware";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("GigFlow API Running");
});

app.use("/api/auth", authRoutes);

app.use("/api/leads", leadRoutes);

// Not Found Middleware
app.use(notFoundMiddleware);

// Error Middleware
app.use(errorMiddleware);

export default app;