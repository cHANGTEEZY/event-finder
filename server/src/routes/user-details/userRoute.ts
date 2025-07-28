import express from "express";
import { createUser } from "../../controllers/userDetails/user-detail-controller.ts";

const userRouter = express.Router();

userRouter.post("/user-detail", createUser);

export default userRouter;
