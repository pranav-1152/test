import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  workingDays: {
    type: Number,
    default: 300
  },
  kgToTon: {
    type: Number,
    default: 1000
  },
  croreValue: {
    type: Number,
    default: 10000000
  }
});

export const Settings = mongoose.model("Settings", settingsSchema);
