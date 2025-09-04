import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { Authreq } from "../middleware/auth.js";
import z from "zod";

const prisma = new PrismaClient({ log: ['warn', 'error'] });

//schema validation 
const upsertschema = z.object({
    answers:z.array(
        z.object({
            questionId:z.number().int().positive(),
            value:z.string().min(1)
        })
    ).min(1)
});

export async function upsertResponse(req:Authreq,res:Response){
    if(!req.userId){
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const parsed = upsertschema.parse(req.body);
    if(!parsed){
        return res.status(400).json({ error: "The data is not in valid form"});
    
    }
    const {answers} = parsed;
    try{
        await prisma.$transaction(
            answers.map((a)=>
                prisma.resposnses.upsert({
                    where:{
                        userId_questionId: {
                            userId: req.userId!,
                            questionId: a.questionId,
                        },
                    },
                    create:{
                        userId:req.userId!,
                        questionId:a.questionId,
                        value:a.value
                    },
                    update:{
                        value:a.value,
                        submittedAt:new Date()
                    },
                })
            )
        );
        return res.json({ok:true});
    }catch(err){
        console.error('Error upserting responses:', err);
        return res.status(500).json({ error: 'Failed to submit responses' });
    }
}
export async function getResponses(req:Authreq,res:Response){
    if(!req.userId){
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try{
        const response = await prisma.resposnses.findMany({
            where:{userId:req.userId},
            include:{
                questions:{
                    select:{id:true,title:true,description:true}
                }
            },
            orderBy:{questionId:"asc"}
        });
        return res.json({response});
    }catch(err){
        return console.log(err);
    }
}