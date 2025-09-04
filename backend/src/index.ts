import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import surveyRoutes from './routes/surveyRoutes.js';
import responseRoutes from './routes/responseRoutes.js';
const app = express();

app.use(cors({origin:process.env.CORS_ORIGIN,credentials:true}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api',surveyRoutes);
app.use('/api',responseRoutes);

const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`))