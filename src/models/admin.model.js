import mongoose from "mongoose";


const Adminschema = new mongoose.Schema(
  {
    adminName: {
      type: String,
      lowercase: true,
      trim: true,
      require: true
    },
    password:{
      require: true
    }
  }
);

export const admin = mongoose.model("admin", Adminschema)