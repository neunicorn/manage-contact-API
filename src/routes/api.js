import express from "express";
import userController from "../controller/user-controller.js";
import { auth } from "../middlewares/auth-middleware.js";

export const userRouter = new express.Router();

userRouter.use(auth);

userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);
