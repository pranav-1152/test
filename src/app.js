
import express from "express";
import session from "express-session";
import path from "path";

const app = express();

app.use(express.static("public"));


// Body parser 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SESSION (VERY IMPORTANT)
app.use(session({
  secret: "mysecretkey",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }   // for localhost
}));

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));

// Static folder
app.use(express.static(path.join(process.cwd(), "public")));


// Routes
import projectRoutes from "./routes/project.routes.js";
app.use("/", projectRoutes);

export { app };

