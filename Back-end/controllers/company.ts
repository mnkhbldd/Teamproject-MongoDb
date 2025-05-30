import { Request, Response } from "express";
import CompanyModel from "../model/company";

interface RequestWithUserId extends Request {
  userId: string;
}

export const createCompany = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const userId = req.userId;
  const {
    name,
    description,
    location,
    phoneNumber,
    category,
    socialMedia,
    images,
    companyLogo,
    companyCoverImage,
    reviews,
  } = req.body;

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
      socialMedia,
      images,
      companyLogo,
      companyCoverImage,
      reviews,
    });
    return res.status(200).json({ success: true, newCompany }).end();
  } catch (error) {
    console.error(error, "err");
    return res.status(400).json({ success: false, message: error }).end();
  }
};

export const getCompanies = async (
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

export const getCompaniesByUser = async (
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

export const updateCompany = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const userId = req.userId;
  const companyId = req.params.companyId;
  try {
    const company = await CompanyModel.findOneAndUpdate(
      { user: userId, _id: companyId },
      req.body,
      { new: true }
    );
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" })
        .end();
    }
    return res.status(200).json({ success: true, company }).end();
  } catch (error) {
    console.error(error, "err");
    return res.status(400).json({ success: false, message: error }).end();
  }
};

export const deleteCompany = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const userId = req.userId;
  const companyId = req.params.companyId;
  try {
    const company = await CompanyModel.findOneAndDelete({
      user: userId,
      _id: companyId,
    });
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" })
        .end();
    }
    return res.status(200).json({ success: true, company }).end();
  } catch (error) {
    console.error(error, "err");
    return res.status(400).json({ success: false, message: error }).end();
  }
};
