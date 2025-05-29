import mongoose from "mongoose";
import { diff } from "util";

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});
const categoryModel = mongoose.model("Category", categorySchema);

export default categoryModel;
