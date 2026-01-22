import express from 'express'
// import cookieParser from "cookieParser";
const app = express();
import path from 'path'




app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set("views", path.join(process.cwd(), "src/views"));

// import Routes 
import projectRoutes  from './routes/project.routes.js'
import checkUserRoute from './routes/project.routes.js'
import findUserRoutes from './routes/project.routes.js' 
import findUserIdRoutes from './routes/project.routes.js'
import getTotalRequestsCountRoute from './routes/project.routes.js'
import dashboardRoutes from './routes/project.routes.js'
import requestRoutes from './routes/project.routes.js'

app.use(projectRoutes);
app.use(checkUserRoute);
app.use(findUserRoutes);
app.use(findUserIdRoutes);
app.use(getTotalRequestsCountRoute)
app.use(dashboardRoutes);
app.use(requestRoutes);

export { app }