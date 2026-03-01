import { Router } from "express";
import { Settings } from "../models/settings.model.js";
import { calculateValues } from "../services/calculation.service.js";
import { Product } from "../models/product.model.js";
import { calculateProductMix } from "../services/productMix.service.js";

// Controllers
import {
  createUser,
  checkUser,
  findUser,
  findUserId,
  getTotalRequestsCount,
  renderDashboard
} from "../controllers/project.controller.js";

import {
  renderRequestsPage,
  approveProject,
  rejectProject,
  deleteUserId
} from "../controllers/request.controller.js";

/* =========================================================
   IMPORTANT: FIRST create router object
========================================================= */
const router = Router();

/* =========================================================
   PRODUCT MIX ROUTES
========================================================= */

// Open product mix page
router.get("/product-mix", (req, res) => {
  res.render("product-mix");
});

// Calculate product mix (Excel logic → backend)
router.post("/product-mix/calculate", async (req, res) => {
  const result = await calculateProductMix(req.body);
  res.render("product-mix", { mix: result });
});

/* =========================================================
   PRODUCT ENTRY ROUTES
========================================================= */

// OPEN CATEGORY PAGE (fruits / vegetables / etc)
router.get("/products/:category", async (req, res) => {

  const products = await Product.find({
    category: req.params.category
  });

  // totals calculation
  let totalTons = 0;
  let totalRM = 0;
  let totalSelling = 0;

  products.forEach(p => {
    totalTons += p.finalOutputTPD || 0;
    totalRM += p.rmCostCrore || 0;
    totalSelling += p.sellingCrore || 0;
  });

  const totalKg = totalTons * 1000;
  const totalKgYear = totalKg * 300;
  const totalProfit = totalSelling - totalRM;

  res.render("product-entry", {
    category: req.params.category,
    products,
    totals: {
      totalTons,
      totalKg,
      totalKgYear,
      totalRM,
      totalSelling,
      totalProfit
    }
  });
});

// SAVE PRODUCT
router.post("/products/add", async (req, res) => {

  const data = req.body;

  // calculate Excel formulas in backend
  const calc = await calculateValues(data);

  await Product.create({
    ...data,
    ...calc
  });

  res.redirect(`/products/${data.category}`);
});

/* =========================================================
   MASTER DPR PAGE
========================================================= */

router.get("/dpr/master-sheet", async (req, res) => {

  const products = await Product.find();

  // group products by category
  const fruits = products.filter(p => p.category === "fruits");
  const vegetables = products.filter(p => p.category === "vegetables");
  const rootcrops = products.filter(p => p.category === "root-crops");
  const dryfruits = products.filter(p => p.category === "dry-fruits");

  // totals
  let totalTons = 0;
  let totalRM = 0;
  let totalSelling = 0;

  products.forEach(p => {
    totalTons += p.finalOutputTPD || 0;
    totalRM += p.rmCostCrore || 0;
    totalSelling += p.sellingCrore || 0;
  });

  const totalKg = totalTons * 1000;
  const totalKgYear = totalKg * 300;
  const totalProfit = totalSelling - totalRM;

  res.render("master-dpr", {
    fruits,
    vegetables,
    rootcrops,
    dryfruits,
    totals: {
      totalTons,
      totalKg,
      totalKgYear,
      totalRM,
      totalSelling,
      totalProfit
    }
  });
});

/* =========================================================
   ADMIN SETTINGS
========================================================= */

router.get("/admin/settings", async (req, res) => {

  let settings = await Settings.findOne();

  if (!settings) {
    settings = await Settings.create({});
  }

  res.render("admin-settings", { settings });
});

router.post("/admin/settings/update", async (req, res) => {

  const { workingDays, kgToTon, croreValue } = req.body;

  await Settings.updateOne(
    {},
    {
      workingDays,
      kgToTon,
      croreValue
    }
  );

  res.redirect("/admin/settings");
});

/* =========================================================
   WEBSITE PAGES
========================================================= */

// HOME PAGE
router.get("/", (req, res) => {
  res.render("index", {
    title: "Digital Consultant"
  });
});

router.get("/about", (req, res) => {
  res.render("about");
});

/* =========================================================
   ADMIN LOGIN
========================================================= */

router.get("/admin-login", (req, res) => {
  res.render("admin-login");
});

router.get("/admin", (req, res) => {
  res.render("admin-login");
});

router.post("/admin-login", (req, res) => {

  const { email, password } = req.body;

  if (email === "abcd@email.com" && password === "1234") {
    req.session.user = email;
    res.redirect("/dashboard");
  } else {
    res.send("Invalid Email or Password ❌");
  }

});

/* =========================================================
   DASHBOARD
========================================================= */

router.get("/dashboard", checkUser, renderDashboard);
router.get("/admin/dashboard", checkUser, renderDashboard);
router.get("/admin/requests", renderRequestsPage);

/* =========================================================
   API ROUTES
========================================================= */

router.post("/api/dashboard", createUser);
router.get("/api/dashboard", findUser);
router.get("/api/dashboard/count", getTotalRequestsCount);
router.get("/api/dashboard/:id", findUserId);

/* =========================================================
   ADMIN ACTIONS
========================================================= */

router.post("/admin/requests/:id/approve", approveProject);
router.post("/admin/requests/:id/reject", rejectProject);
router.delete("/admin/requests/:id", deleteUserId);

/* ========================================================= */

export default router;
