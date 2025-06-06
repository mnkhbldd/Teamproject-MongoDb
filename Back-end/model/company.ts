import mongoose, { Schema } from "mongoose";

const socialMediaSchema = new mongoose.Schema({
  instagram: { type: String },
  Facebook: { type: String },
  website: { type: String },
});

const locationSchema = new mongoose.Schema({
  coordinate: {
    type: [Number],
  },
  address: {
    type: String,
  },
});

const companySchema = new mongoose.Schema({
  user: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  location: [locationSchema],
  phoneNumber: { type: Number },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  socialMedia: [socialMediaSchema],
  images: [{ type: String }],
  companyLogo: String,
  companyCoverImage: String,
});

const CompanyModel = mongoose.model("Company", companySchema);

export default CompanyModel;
