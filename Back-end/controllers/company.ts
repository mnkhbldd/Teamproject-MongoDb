import { Request, Response } from "express";
import CompanyModel from "../model/company";

interface RequestWithUserId extends Request {
  userId: string;
}

export const createCompany = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { name, description, location, phoneNumber, category } = req.body;

  const userId = req.userId;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "userId is required" })
      .end();
  }

  try {
    const newCompany = await CompanyModel.create({
      user: userId,
      name,
      description,
      location,
      phoneNumber,
      category,
    });
    return res.status(200).json({ success: true, newCompany }).end();
  } catch (error) {
    console.error(error, "err");
    return res.status(400).json({ success: false, message: error }).end();
  }
};

export const getCompanys = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const companies = await CompanyModel.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, companies }).end();
  } catch (error) {
    console.error(error, "err");
    return res.status(400).json({ success: false, message: error }).end();
  }
};

export const getCompanysByUser = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const userId = req.userId;
  try {
    const companies = await CompanyModel.find({ user: userId }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ success: true, companies }).end();
  } catch (error) {
    console.error(error, "err");
    return res.status(400).json({ success: false, message: error }).end();
  }
};