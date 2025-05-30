import express, { RequestHandler } from "express";
import { Request, Response } from "express";
import { createCompany } from "../controllers/company";
import { verifyClerkToken } from "../middleware/checkClerkToken";

interface RequestWithUserId extends Request {
  userId: string;
}

export const companyRouter = express.Router();

companyRouter.post(
  "/create-company",
  verifyClerkToken,
  (req: Request, res: Response) => {
    const reqWithUserId = req as RequestWithUserId;
    return createCompany(reqWithUserId, res);
  }
);

export default companyRouter;
