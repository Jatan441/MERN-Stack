import express from "express";
import { requireSignIn, isAdmin } from "../Middlewares/authMiddleware.js";
import {
  createProductController,
  getProductController,
  getSingleProductController,
  ProductPhotoController,
  deleteProductController,
  updateProductController,
} from "../Controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();

// Routes

// create product || Post
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// update product || put
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// get products
router.get("/get-product", getProductController);

// get single products
router.get("/get-product/:slug", getSingleProductController);

// get product photo
router.get("/product-photo/:pid", ProductPhotoController);

// delete product
router.delete("/delete-product/:pid", deleteProductController);

export default router;
