import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrderController,
  getAllOrderController,
  orderStatusController,
} from "../Controllers/authController.js";
import { isAdmin, requireSignIn } from "../Middlewares/authMiddleware.js";

// router object
const router = express.Router();

// routing

// REGISTER || METHOD POST
router.post("/register", registerController);

// Login || METHOD POST
router.post("/login", loginController);

// Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

// test route
router.get("/test", requireSignIn, isAdmin, testController);

// protected User route Auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(208).send({ ok: true });
});

// protected Admin route Auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(208).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

// orders
router.get("/orders", requireSignIn, getOrderController);

// all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrderController);

// orders status update
router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatusController);
export default router;
