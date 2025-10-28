import compression from "compression";
import cors from "cors";
import express from "express";

const app = express();

// Middleware
app.use(cors()); 
app.use(compression()); // Compresses response bodies for faster delivery
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


app.get("/", (_req, res) => {
  res.send("API is running!!");
});

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;
