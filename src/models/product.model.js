import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

  category: String,
  productName: String,

  rawMaterialTPD: Number,
  costPerKg: Number,

  rawMaterialForProduction: Number,  

  yieldPercent: Number,
  sellingPriceKg: Number,

  rsPerTon: Number,
  finalOutputTPD: Number,
  sellingPriceTon: Number,

  rmCostCrore: Number,
  sellingCrore: Number,
  profit: Number

});

export const Product = mongoose.model("Product", productSchema);
