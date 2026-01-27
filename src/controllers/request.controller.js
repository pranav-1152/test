import {Project} from "../models/project.model.js";

export const renderRequestsPage = async (req, res) => {
  try {
    // ===== QUERY PARAMS =====
    const page = parseInt(req.query.page) || 1;
    const limit = 10; // records per page
    const skip = (page - 1) * limit;

    const search = req.query.search || "";
    const status = req.query.status || "";

    // ===== FILTER OBJECT =====
    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { companyName: { $regex: search, $options: "i" } },
        { productManufactured: { $regex: search, $options: "i" } }
      ];
    }

    // ===== DB QUERIES =====
    const [requests, total] = await Promise.all([
      Project.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Project.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / limit);

    // ===== RENDER =====
    res.render("requests", {
      requests,
      currentPage: page,
      totalPages,
      search,
      status
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to load requests");
  }
};


export const approveProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project approved", project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const rejectProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project rejected", project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteUserId = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json({ message: "Request deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

