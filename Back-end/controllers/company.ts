import { Request, Response } from "express";
import CompanyModel from "../model/company";

export const createCompany = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { user, name, description, location, phoneNumber, category } = req.body;

  try {
    const newCompany = await CompanyModel.create({
      user,
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
  req: Request,
  res: Response
): Promise<any> => {
  const { user } = req.body;
  try {
    const companies = await CompanyModel.find({ user }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, companies }).end();
  } catch (error) {
    console.error(error, "err");
    return res.status(400).json({ success: false, message: error }).end();
  }
};
