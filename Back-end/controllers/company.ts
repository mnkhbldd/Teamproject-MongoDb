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

interface GetCompaniesQuery {
  q?: string;
  categories?: string[] | string;
  lat?: string;
  lng?: string;
  maxDistance?: string;
}

export const getCompanies = async (
  req: Request<unknown, unknown, unknown, GetCompaniesQuery>,
  res: Response
): Promise<Response> => {
  const { q, categories, lat, lng, maxDistance } = req.query;

  try {
    const filter: Record<string, any> = {};

    // 🔍 Full-text search
    if (q) {
      const regex = new RegExp(q, "i");
      filter.$or = [
        { name: regex },
        { phoneNumber: regex },
        { "socialMedia.facebook": regex },
        { "socialMedia.instagram": regex },
        { "socialMedia.website": regex },
        { "location.address": regex },
      ];
    }

    // 🎯 Category filter
    if (categories) {
      const categoryArray = Array.isArray(categories)
        ? categories
        : [categories];
      filter.category = {
        $in: categoryArray.map((id) => new mongoose.Types.ObjectId(id)),
      };
    }

    // 📍 Location-based filter using $geoNear
    if (lat && lng) {
      const lngNum = parseFloat(lng);
      const latNum = parseFloat(lat);
      const distance = parseFloat(maxDistance || "5000");

      const companies = await CompanyModel.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [lngNum, latNum],
            },
            distanceField: "distance",
            spherical: true,
            maxDistance: distance,
            query: filter,
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: {
            path: "$category",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ]);

      return res.status(200).json({ success: true, companies });
    }

    const companies = await CompanyModel.find(filter)
      .populate("category")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, companies });
  } catch (error) {
    console.error("❌ Error fetching companies:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error });
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
