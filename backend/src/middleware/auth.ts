import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export type Authreq = Request & {userId?:number}

export function requireAuth(req:Authreq, res:Response, next:NextFunction){
    try{
        const token = req.cookies?.token;
        if(!token) return res.status(401).json({error:'Unauthorized'});
        const payload = jwt.verify(token,process.env.JWT_SECRET as string) as {uid:number};
        req.userId = payload.uid;
        next();
    }catch{
        return res.status(401).json({ error: 'Unauthorized' });
    }
}