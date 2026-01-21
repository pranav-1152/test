import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true
    },

    companyType: {
      type: String,
      required: true
    },

    address: {
      type: String,
      required: true
    },

    productManufactured: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "approved", "generated", "rejected"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

export const Project = mongoose.model("Project", ProjectSchema);
