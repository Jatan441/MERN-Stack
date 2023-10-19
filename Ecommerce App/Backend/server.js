import express from "express";
import colors from "colors";
import dotEnv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoute from "./Routes/authRoute.js";
import categoryRoutes from "./Routes/categoryRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import bodyParser from "body-parser";
import cors from "cors";

// dotenv config
dotEnv.config();

// database config
connectDB();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.get("/", (req, res) => {
  return res.send({
    message: "Welcome to ecommerce App",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`.bgWhite.red);
});
