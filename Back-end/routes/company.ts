import express from "express";
import { createCompany } from "../controllers/company";

export const companyRouter = express.Router();

companyRouter.post("/create-company", createCompany);

export default companyRouter;
