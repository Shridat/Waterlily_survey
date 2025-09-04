import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { upsertResponse,getResponses } from "../controllers/responseController.js";

const r = Router();

r.post("/submit",requireAuth,upsertResponse);
r.get('/responses',requireAuth,getResponses);
export default r;