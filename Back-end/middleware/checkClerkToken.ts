// middleware/verifyClerkToken.ts
import { NextFunction, Request, Response } from "express";
import { auth } from "@clerk/nextjs/server";

interface RequestWithUserId extends Request {
  userId: string;
}

export const verifyClerkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = await auth();

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    (req as RequestWithUserId).userId = userId;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
    return;
  }
};
