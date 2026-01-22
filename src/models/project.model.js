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
      type: Boolean,
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
      type: Number
    },
    maturityOfFruitOrVegetable: {
      type: String
    },
    sizes: {
      type: String
    },
    costOfRawMaterial: {
      type: Number
    },
    wastageInTransport: {
      type: Number
    },
    yieldPercentage: {
      type: Number
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
      type: Number
    },
    processWaterCost: {
      type: Number
    },
    factoryBuildingType: {
      type: String, // own or rented
    },
    costOfConstruction: {
      type: Number
    },
    landPreparation: {
      type: String
    },
    manpowerRequirement: {
      type: Number
    },
    manpowerCost: {
      type: Number
    },
    expectedYieldPercentage: {
      type: Number
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
      type: Number
    },
    packagingMachineryCost: {
      type: Number
    },
    packagingCostPerUnit: {
      type: Number
    },
    electrificationCost: {
      type: Number
    },
    otherChemicalsAdditivesCost: {
      type: Number
    },
    otherPeripherals: { type: String },
    depreciation: {
      type: Number
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
