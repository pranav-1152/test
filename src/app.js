import express from 'express';
import path from 'path';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set("views", path.join(process.cwd(), "src/views"));

// Routes
import projectRoutes from './routes/project.routes.js';

app.use(projectRoutes);

export { app };
