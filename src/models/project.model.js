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
    previousProcessKnowledge: {
      type: String,
      required: true,
    },

    marketSurveyDone: {
      type: String,
      required: true,
    },

    projectSize: {
      type: String, // TPD / Rupees
      required: true,
    },

    croppingPatternStudy: {
      type: String,
      required: true,
    },

    harvestingTime: {
      type: String,
      required: true,
    },

    distanceFromRawMaterial: {
      type: String,
      required: true,
    },
    // ===== OPTIONAL FIELDS =====
    logisticsCost: {
      type: String
    },
    maturityOfFruitOrVegetable: {
      type: String
    },
    sizes: {
      type: String
    },
    costOfRawMaterial: {
      type: String
    },
    wastageInTransport: {
      type: String
    },
    yieldPercentage: {
      type: String
    },
    acceptableBlemishes: {
      type: String
    },
    testsRequired: {
      type: String
    },
    processTechnologyUsed: {
      type: String
    },
    powerRequired: {
      type: String
    },
    energyCost: {
      type: String
    },
    processWaterCost: {
      type: String
    },
    factoryBuildingType: {
      type: String, // own or rented
    },
    costOfConstruction: {
      type: String
    },
    landPreparation: {
      type: String
    },
    manpowerRequirement: {
      type: String
    },
    manpowerCost: {
      type: String
    },
    expectedYieldPercentage: {
      type: String
    },
    expectedYieldWithQuality: {
      type: String
    },
    wasteTreatment: {
      type: String
    },
    factoryCleaningFrequency: {
      type: String
    },
    cleaningChemicalsCost: {
      type: String
    },
    packagingMachineryCost: {
      type: String
    },
    packagingCostPerUnit: {
      type: String
    },
    electrificationCost: {
      type: String
    },
    otherChemicalsAdditivesCost: {
      type: String
    },
    otherPeripherals: { type: String },
    depreciation: {
      type: String
    },
    profitAndLossStatement: {
      type: String
    },
    cashFlow: {
      type: String
    },
    projectedBalanceSheetFiveYears: {
      type: String
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
