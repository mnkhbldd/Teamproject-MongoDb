import { Request, Response } from "express";
import Category from "../model/category";

export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, group, icons } = req.body;

    if (!name || !group || !icons) {
      res
        .status(400)
        .json({ success: false, message: "Name, group and icons are required" })
        .end();
      return;
    }

    // Check if category with same name and group already exists
    const existingCategory = await Category.findOne({ name, group });
    if (existingCategory) {
      res
        .status(400)
        .json({
          success: false,
          message: "Category with this name already exists in this group",
        })
        .end();
      return;
    }

    const category = await Category.create({
      name,
      group,
      icons,
    });

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await Category.find().sort({ group: 1, name: 1 });
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
