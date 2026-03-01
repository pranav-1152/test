import { Settings } from "../models/settings.model.js";

export const calculateValues = async (data) => {

  const settings = await Settings.findOne();

  const kgToTon = settings.kgToTon;       // 1000
  const days = settings.workingDays;      // 300
  const crore = settings.croreValue;      // 10000000

  // Raw material Rs per ton
  const rsPerTon = data.costPerKg * kgToTon;

  // Raw material for production
  const rawMaterialForProduction = data.rawMaterialTPD;

  // Final output tons/day
  const finalOutputTPD =
    (data.rawMaterialTPD * data.yieldPercent) / 100;

  // Selling price per ton
  const sellingPriceTon =
    data.sellingPriceKg * kgToTon;

  // RM cost in crores
  const rmCostCrore =
    (data.rawMaterialTPD * rsPerTon) / crore;

  // Selling value in crores
  const sellingCrore =
    (finalOutputTPD * sellingPriceTon) / crore;

  // Profit
  const profit = sellingCrore - rmCostCrore;

  return {
    rsPerTon,
    rawMaterialForProduction,
    finalOutputTPD,
    sellingPriceTon,
    rmCostCrore,
    sellingCrore,
    profit
  };
};
