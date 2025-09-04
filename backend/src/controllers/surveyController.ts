import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { Authreq } from "../middleware/auth.js";

const prisma = new PrismaClient({ log: ['warn', 'error'] });
export async function getQuestions(req:Authreq ,res:Response){
    try{
        const questions = await prisma.questions.findMany({
            orderBy:{id:'asc'}
        });
        return res.json({questions});
    }catch(err){
        console.error('Error fetching questions:', err);
        return res.status(500).json({ error: 'Failed to fetch questions' });
    }
}