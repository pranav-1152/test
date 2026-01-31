import { Project } from "../models/project.model.js";


// CREATE PROJECT / USER
const createUser = async (req, res) => {
  try {
    const body = req.body;

    if (
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
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    await Project.create(body);

    return res.status(201).json({
      success: true,
      message: "Project created successfully"
    });

  } catch (error) {
    console.error("Create User Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while creating project"
    });
  }
};



// CHECK USERS (SIMPLE VIEW)
const checkUser = async (req, res) => {
  try {
    const allProjects = await Project.find().lean();

    let html = `<h2>Projects List</h2><ul>`;

    allProjects.forEach(project => {
      html += `<li>${project.companyName} - ${project.companyType}</li>`;
    });

    html += `</ul>`;

    res.send(html);

  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading projects");
  }
};



// GET ALL USERS API
const findUser = async (req, res) => {
  try {
    const allProjects = await Project.find();

    return res.status(200).json({
      success: true,
      data: allProjects
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch data"
    });
  }
};



// GET USER BY ID
const findUserId = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.json(project);

  } catch (error) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
};



// TOTAL REQUEST COUNT
const getTotalRequestsCount = async (req, res) => {
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



// ADMIN DASHBOARD
const renderDashboard = async (req, res) => {
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

    const activities = recentProjects.map(p => {
      if (p.status === "generated") return `✔ DPR generated for ${p.companyName}`;
      if (p.status === "pending") return `⏳ DPR pending approval for ${p.companyName}`;
      if (p.status === "rejected") return `❌ Request rejected for ${p.companyName}`;
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
    console.error("Dashboard Error:", error.message);
    res.status(500).send("Dashboard loading failed");
  }
};



// EXPORTS
export {
  createUser,
  checkUser,
  findUser,
  findUserId,
  getTotalRequestsCount,
  renderDashboard
};
