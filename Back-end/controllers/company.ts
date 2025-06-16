import { Request, Response } from "express";
import CompanyModel from "../model/company";
import categoryModel from "../model/category";

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
    categoryIds,
    socialMedia,
    images,
    companyLogo,
  } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "userId is required" })
      .end();
  }

  try {
    const validCategories = await categoryModel.find({
      _id: {
        $in: categoryIds,
      },
    });

    if (validCategories.length !== categoryIds.length) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid categories" })
        .end();
    }
    const newCompany = await CompanyModel.create({
      user: userId,
      name,
      description,
      location,
      phoneNumber,
      category: categoryIds,
      socialMedia,
      images,
      companyLogo,
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
  const { q } = req.query;

  let filter = {};

  if (q && typeof q === "string") {
    const searchRegex = new RegExp(q, "i");
    filter = {
      $or: [
        { name: searchRegex },
        { phoneNumber: searchRegex },
        { "socialMedia.Facebook": searchRegex },
        { "socialMedia.instagram": searchRegex },
        { "location.address": searchRegex },
      ],
    };
  }

  try {
    const companies = await CompanyModel.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, companies });
  } catch (error) {
    console.error("Get/Search error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
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

export const getCompanyById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const companyId = req.params.companyId;
  try {
    const company = await CompanyModel.findById(companyId);
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
