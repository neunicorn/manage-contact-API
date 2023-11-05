import express from "express";
import userController from "../controller/user-controller.js";
import { auth } from "../middlewares/auth-middleware.js";
import contactController from "../controller/contact-controller.js";

export const userRouter = new express.Router();

userRouter.use(auth);

// user API
userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

// contact API
userRouter.post("/api/contacts", contactController.create);
userRouter.get("/api/contacts/:contactId", contactController.get);
userRouter.put("/api/contacts/:contactId", contactController.update);
userRouter.delete("/api/contacts/:contactId", contactController.remove);
userRouter.get("/api/contacts", contactController.search);
