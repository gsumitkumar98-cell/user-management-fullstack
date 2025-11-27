import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("User Management API running");
});

app.use("/api/users", userRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
