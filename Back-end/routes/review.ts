import express from "express";
import { Request, Response } from "express";
import { createReview, getReviewsByCompany } from "../controllers/review";
import { verifyClerkToken } from "../middleware/checkClerkToken";

export const reviewsRouter = express.Router();

reviewsRouter.post(
  "/create-review",
  verifyClerkToken,
  async (req: Request, res: Response) => {
    try {
      await createReview(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

reviewsRouter.get(
  "/reviews/:companyId",
  async (req: Request, res: Response) => {
    try {
      await getReviewsByCompany(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

export default reviewsRouter;
