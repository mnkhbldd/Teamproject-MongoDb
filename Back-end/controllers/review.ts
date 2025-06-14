import { Request, Response } from "express";
import ReviewModel from "../model/review";
import CompanyModel from "../model/company";

export const createReview = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { companyId, name, starCount, comment } = req.body;
    const userId = (req as any).userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "User ID is required",
      });
      return;
    }

    // Ensure the userId is a string
    const review = await ReviewModel.create({
      company: companyId,
      user: userId.toString(),
      name,
      starCount,
      comment,
    });

    await CompanyModel.findByIdAndUpdate(
      companyId,
      { $push: { reviews: review._id } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const getReviewsByCompany = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { companyId } = req.params;

    const reviews = await ReviewModel.find({ company: companyId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};
