import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { getQuestions } from "../controllers/surveyController.js";

const r = Router();
r.get('/survey',requireAuth,getQuestions);
export default r;