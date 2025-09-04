import { Router } from 'express';
import { login,signup,me,logout } from '../controllers/authController.js';
const r = Router();
r.post('/signup', signup);
r.post('/login', login);
r.get('/me', me);
r.post('/logout', logout);
export default r;