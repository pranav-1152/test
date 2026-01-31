import { Router } from "express";

import {
  createUser,
  checkUser,
  findUser,
  findUserId,
  getTotalRequestsCount,
  renderDashboard
} from '../controllers/project.controller.js';

import {
  renderRequestsPage,
  approveProject,
  rejectProject,
  deleteUserId
} from '../controllers/request.controller.js';

const router = Router();

// USER / API ROUTES
router.post('/api/dashboard', createUser);
router.get('/api/dashboard', findUser);
router.get('/api/dashboard/count', getTotalRequestsCount);
router.get('/api/dashboard/:id', findUserId);

// AUTH / CHECK
router.get('/dashboard', checkUser);

// ADMIN ROUTES
router.get('/admin/dashboard', renderDashboard);
router.get('/admin/requests', renderRequestsPage);
router.post('/admin/requests/:id/approve', approveProject);
router.post('/admin/requests/:id/reject', rejectProject);
router.delete('/admin/requests/:id', deleteUserId);

export default router;
