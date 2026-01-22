import {Project} from "../models/project.model.js";

export const renderRequestsPage = async (req, res) => {
  try {
    const requests = await Project.find()
      .sort({ createdAt: -1 })
      .lean();

    res.render("requests", { requests });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to load requests");
  }
};

