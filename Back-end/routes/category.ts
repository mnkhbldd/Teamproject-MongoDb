import express from "express";
import { createCategory, getCategories } from "../controllers/category";
import { verifyClerkToken } from "../middleware/checkClerkToken";

const categoryRouter = express.Router();

categoryRouter.get("/", getCategories).post("/", createCategory);

// categoryRouter.use(verifyClerkToken);
// categoryRouter;

export default categoryRouter;
