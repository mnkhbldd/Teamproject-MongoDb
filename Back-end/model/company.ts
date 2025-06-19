import mongoose, { Schema } from "mongoose";

const socialMediaSchema = new Schema({
  instagram: { type: String },
  Facebook: { type: String },
  website: { type: String },
});

const locationSchema = new Schema({
  type: {
    type: String,
    enum: ["Point"],
    default: "Point",
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
  address: {
    type: String,
  },
});

const companySchema = new Schema(
  {
    user: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    location: locationSchema,
    phoneNumber: { type: String, required: true },
    category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    socialMedia: [socialMediaSchema],
    images: [{ type: String }],
    pricing: { type: String },
    companyLogo: { type: String },
    companyCoverImage: { type: String },
  },
  { timestamps: true }
);

companySchema.index({ location: "2dsphere" });

const CompanyModel = mongoose.model("Company", companySchema);

export default CompanyModel;
