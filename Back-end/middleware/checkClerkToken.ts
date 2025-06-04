// middleware/verifyClerkToken.ts
import { NextFunction, Request, Response } from "express";
import { createClerkClient } from "@clerk/backend";
import jwt from "jsonwebtoken";

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

interface RequestWithUserId extends Request {
  userId: string;
}

export const verifyClerkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const sessionToken = authHeader?.replace("Bearer ", "");
    if (!sessionToken) {
      res.status(401).json({
        success: false,
        message: "Authentication token missing",
      });
      return;
    }

    const decoded: any = jwt.decode(sessionToken);
    const sessionId = decoded?.sid;
    console.log(sessionId, "token");
    if (!sessionId) {
      res.status(401).json({
        success: false,
        message: "Invalid session token",
      });
      return;
    }

    const session = await clerk.sessions.verifySession(sessionId, sessionToken);
    const userId = session.userId;

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
