import cors from "cors";
import categories from "./routes/categories";
import foods from "./routes/foods";
import auth from "./routes/auth";
import users from "./routes/users";
import carts from "./routes/carts";
import mongoose from "mongoose";
import express from "express";
mongoose.set("strictQuery", false);

const app = express();

app.use(
  cors({
    exposedHeaders: ["x-auth-token"],
  })
);
app.use(express.json());
app.use("/api/categories", categories);
app.use("/api/auth", auth);
app.use("/api/foods", foods);
app.use("/api/users", users);
app.use("/api/carts", carts);

mongoose
  .connect("mongodb://127.0.0.1:27017/foods")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB...", err));

app.listen(8000, () => console.log("Listening on port 8000"));
