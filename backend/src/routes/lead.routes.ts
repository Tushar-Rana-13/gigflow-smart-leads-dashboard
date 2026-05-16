import express from "express";

import {
  createLead,
  getLeads,
  getSingleLead,
  updateLead,
  deleteLead,
  exportLeadsCSV,
} from "../controllers/lead.controller";

import { protect } from "../middleware/auth.middleware";

import { authorizeRoles } from "../middleware/role.middleware";

const router = express.Router();

router.get(
  "/",
  protect,
  getLeads
);

router.get(
  "/export/csv",
  protect,
  exportLeadsCSV
);

router.get(
  "/:id",
  protect,
  getSingleLead
);

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createLead
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateLead
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteLead
);

export default router;