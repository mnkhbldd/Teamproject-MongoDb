import { Request, Response } from "express";

import categoryModel from "../model/category";
import mongoose from "mongoose";
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
    categoryIds,
    socialMedia,
    images,
    companyLogo,
    pricing,
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
      pricing,
    });
    return res.status(200).json({ success: true, newCompany }).end();
  } catch (error) {
    console.error(error, "err");
    return res.status(400).json({ success: false, message: error }).end();
  }
};

interface GetCompaniesQuery {
  q?: string;
  categories?: string[] | string;
}

export const getCompanies = async (
  req: Request<unknown, unknown, unknown, GetCompaniesQuery>,
  res: Response
): Promise<Response> => {
  const { q, categories } = req.query;

  try {
    const filter: Record<string, unknown> = {};

    // Text search
    if (q) {
      const searchRegex = new RegExp(q, "i");
      filter.$or = [
        { name: searchRegex },
        { phoneNumber: searchRegex },
        { "socialMedia.Facebook": searchRegex },
        { "socialMedia.instagram": searchRegex },
        { "socialMedia.website": searchRegex },
        { "location.address": searchRegex },
      ];
    }

    // Category filter
    if (categories) {
      const categoryArray = Array.isArray(categories)
        ? categories
        : [categories];

      const categoryObjectIds = categoryArray.map(
        (id) => new mongoose.Types.ObjectId(id)
      );

      filter.category = { $in: categoryObjectIds };
    }

    // Fetch and populate categories
    const companies = await CompanyModel.find(filter)
      .populate("category") // <-- this line populates the category field
      .sort({ createdAt: -1 });

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
