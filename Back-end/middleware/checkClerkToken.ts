// middleware/verifyClerkToken.ts
import { verifyToken } from "@clerk/backend";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();


export const verifyClerkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing token" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    (req as any).userId = payload.sub; // end user id iig hadgalj bga

    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid token", error: err.message });
  }
};
