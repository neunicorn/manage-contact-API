import express from "express";
import cors from "cors";
import { publicRouter } from "../routes/pubic-api.js";
import { errorMiddleware } from "../middlewares/error-middleware.js";
import { userRouter } from "../routes/api.js";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(publicRouter);
app.use(userRouter);

app.use(errorMiddleware);
