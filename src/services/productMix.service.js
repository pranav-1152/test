import { Product } from "../models/product.model.js";
import { Settings } from "../models/settings.model.js";

export const calculateProductMix = async (daysData) => {

  const settings = await Settings.findOne();

  const workingDays = settings.workingDays || 300;

  const products = await Product.find();

  const result = [];

  for (let p of products) {

    const days = Number(daysData[p.productName]) || 0;

    const rawMaterialCapacity = (100 * days) / workingDays;

    const rmCost = (p.rmCostCrore || 0) * days;
    const selling = (p.sellingCrore || 0) * days;

    const productionYear = (p.finalOutputTPD || 0) * days;
    const rmInputYear = (p.rawMaterialTPD || 0) * days;

    result.push({
      product: p.productName,
      days,
      rawMaterialCapacity,
      rmCost,
      selling,
      productionYear,
      rmInputYear
    });
  }

  return result;
};
