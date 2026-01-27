import { Project } from "../models/project.model.js";



const createUser = async (req, res) => {
  const body = req.body;
  console.log(body);
  if (!body ||
    !body.companyName ||
    !body.companyType ||
    !body.address ||
    !body.productManufactured ||
    !body.previousProcessKnowledge ||
    !body.marketSurveyDone ||
    !body.projectSize ||
    !body.croppingPatternStudy ||
    !body.harvestingTime ||
    !body.distanceFromRawMaterial
  ) {
    return res.status(400).json({ msg: "all field req..." })
  }

  const result = await Project.create(
    {
      companyName: body.companyName,
      companyType: body.companyType,
      address: body.address,
      productManufactured: body.productManufactured,
      previousProcessKnowledge: body.previousProcessKnowledge,
      marketSurveyDone: body.marketSurveyDone,
      projectSize: body.projectSize,
      croppingPatternStudy: body.croppingPatternStudy,
      harvestingTime: body.harvestingTime,
      distanceFromRawMaterial: body.distanceFromRawMaterial,
      logisticsCost: body.logisticsCost,
      maturityOfFruitOrVegetable: body.maturityOfFruitOrVegetable,
      sizes: body.sizes,
      costOfRawMaterial: body.costOfRawMaterial,
      wastageInTransport: body.wastageInTransport,
      yieldPercentage: body.yieldPercentage,
      acceptableBlemishes: body.acceptableBlemishes,
      testsRequired: body.testsRequired,
      processTechnologyUsed: body.processTechnologyUsed,
      powerRequired: body.powerRequired,
      energyCost: body.energyCost,
      processWaterCost: body.processWaterCost,
      factoryBuildingType: body.factoryBuildingType,
      costOfConstruction: body.costOfConstruction,
      landPreparation: body.landPreparation,
      manpowerRequirement: body.manpowerRequirement,
      manpowerCost: body.manpowerCost,
      expectedYieldPercentage: body.expectedYieldPercentage,
      expectedYieldWithQuality: body.expectedYieldWithQuality,
      wasteTreatment: body.wasteTreatment,
      factoryCleaningFrequency: body.factoryCleaningFrequency,
      cleaningChemicalsCost: body.cleaningChemicalsCost,
      packagingMachineryCost: body.packagingMachineryCost,
      packagingCostPerUnit: body.packagingCostPerUnit,
      electrificationCost: body.electrificationCost,
      otherChemicalsAdditivesCost: body.otherChemicalsAdditivesCost,
      otherPeripherals: body.otherPeripherals,
      depreciation: body.depreciation,
      profitAndLossStatement: body.profitAndLossStatement,
      cashFlow: body.cashFlow,
      projectedBalanceSheetFiveYears: body.projectedBalanceSheetFiveYears,
      status: body.status
    }
  );
  console.log("RESULT : ", result);
  return res.status(201).json({ msg: "success" })
}

const checkUser = async (req, res) => {
  const allDbUser = await Project.find({});
  const html = `<ul>
    ${allDbUser.map((project) => `<li>${project.companyName} - ${project.companyType}</li>`)
    }
  </ul>`
  res.send(html)
}

const findUser = async (req, res) => {
  try {
    const allDbUser = await Project.find({});
    return res.status(200).json(allDbUser)
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch data"
    });
  }

}

const findUserId = async (req, res) => {
  const userDb = await Project.findById(req.params.id)
  return res.json(userDb);
}

export const getTotalRequestsCount = async (req, res) => {
  try {
    const totalRequests = await Project.countDocuments();

    return res.status(200).json({
      success: true,
      totalRequests
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch count"
    });
  }
};

export const renderDashboard = async (req, res) => {
  try {
    const total = await Project.countDocuments();
    const pending = await Project.countDocuments({ status: "pending" });
    const approved = await Project.countDocuments({ status: "approved" });
    const generated = await Project.countDocuments({ status: "generated" });

    const completion = total === 0
      ? 0
      : Math.round((generated / total) * 100);

    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

        //  Recent Activity
    const activities = recentProjects.map(p => {
      if (p.status === "generated")
        return `✔ DPR generated for ${p.companyName}`;
      if (p.status === "pending")
        return `⏳ DPR pending approval for ${p.companyName}`;
      if (p.status === "rejected")
        return `❌ Request rejected for ${p.companyName}`;
      return `📄 Approved request for ${p.companyName}`;
    });

    res.render("dashboard", {
      stats: {
        total,
        pending,
        approved,
        completion
      },
      activities
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Dashboard error");
  }
};

export { createUser, checkUser, findUser, findUserId }