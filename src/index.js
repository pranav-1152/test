import dotenv from "dotenv";
import connectDB from "./db/index.js";
import express from "express"
import { app } from "./app.js"
import { Project } from './models/project.model.js'

dotenv.config({
  path: './.env'
})


connectDB()
  .then(() => {
    // if this want 
    // app.on("error", (error)=> {log(error)} throw error) 
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.log("MONGODB CONNECTION FAILED !!!", error);
  });
