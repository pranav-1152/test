import { Router } from "express";
import { createUser, checkUser, findUser, findUserId, getTotalRequestsCount, renderDashboard } from '../controllers/project.controller.js'

const router = Router()




router.post('/api/dashboard', createUser);
router.get('/dasboard', checkUser )
router.get('/api/dashboard', findUser );
router.get("/api/dashboard/count", getTotalRequestsCount);
router.get('/api/dashboard/:id', findUserId)
router.get("/admin/dashboard", renderDashboard);



export default router