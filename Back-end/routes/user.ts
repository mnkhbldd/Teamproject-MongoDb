import express from "express";
import { createUser, getUsers } from "../controllers/user";

export const usersRouter = express.Router();

usersRouter.post("/create-user", createUser).get("/get-users", getUsers);

export default usersRouter;
