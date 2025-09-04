import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import  jwt  from 'jsonwebtoken';
import {email, z} from 'zod';
import bcrypt from 'bcrypt';
import { error } from 'console';

const prisma = new PrismaClient({ log: ['warn', 'error'] });
//validate3 inputs
const credentialsSchema = z.object({
    email:z.string().email(),
    password:z.string().min(6,"password must be of 6 digits atleast"),
});
const COOKIE = {
  httpOnly: true,        // cookie not readable by JS
  sameSite: 'lax' as const,
  secure: false,         // set true in prod (HTTPS)
  path: '/',
};

export async function signup(req:Request, res:Response){
    const parsed = credentialsSchema.parse(req.body);
    if(!parsed) return res.status(400).json({error:'invalid inputs'});
    const {email,password} = parsed;
    const exist = await prisma.user.findUnique({where:{email}});
    if(exist) return res.status(409).json({error:'email already exist!'});
    const hash = await bcrypt.hash(password,10);
    const user = await prisma.user.create({data:{email,password:hash}});

    const token = jwt.sign({ uid: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1d' })
    res.cookie('token',token,COOKIE);
    return res.json({ok: true, user: { id: user.id, email: user.email }});
}

export async function login(req:Request,res:Response){
    const parsed = credentialsSchema.parse(req.body);
    if(!parsed) return res.status(400).json({error:'invalid inputs'});
    const {email,password} = parsed;
    const user = await prisma.user.findUnique({where:{email}});
    if(!user) return res.status(409).json({error:'User does not exist'});
    const ok = await bcrypt.compare(password,user.password);
    if(!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ uid: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
    res.cookie('token', token, COOKIE);
    return res.json({ ok: true, user: { id: user.id, email: user.email } });
}
export async function me(req:Request,res:Response){
    const token = req.cookies?.token;
    if(!token) return res.json({ user: null });
    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET as string) as {uid:number};
        const user = await prisma.user.findUnique({
            where:{id:payload.uid},
            select:{id:true,email:true,createdAt:true}
        });
         return res.json({ user });
    }catch{
        return res.json({ user: null });
    }
}
export async function logout(req:Request,res:Response){
    res.clearCookie('token',{path:'/'});
    return res.json({ok:true});
}