import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log("MongoDB Connected Successfully ✅");
      console.log(`Server running at http://localhost:${PORT}`);
    });

  })
  .catch((error) => {
    console.log("MongoDB Connection Failed ❌", error.message);
  });
