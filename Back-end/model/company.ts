import mongoose, { Schema } from "mongoose";

const socialMediaSchema = new mongoose.Schema({
  instagram: { type: String },
  Facebook: { type: String },
  website: { type: String },
});

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  starCount: { type: Number, required: true },
  comment: { type: String, required: true },
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
  reviews: [reviewSchema],
});

const Company = mongoose.model("Company", companySchema);

export default Company;
