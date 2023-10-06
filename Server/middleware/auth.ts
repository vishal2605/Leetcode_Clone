import jwt from 'jsonwebtoken';
import express ,{Request,Response,NextFunction} from 'express';
import { User } from '../db';

export const SECRET="ilarin";

export const authenticateJwt =(req:Request,res:Response,next:NextFunction)=>{
    const authHeader=req.headers.authorization;
    if(authHeader){
        const token=authHeader.split(' ')[1];
        jwt.verify(token,SECRET,(err,user)=>{
            if(err){
                return res.sendStatus(403);
            }
            if(typeof user==='string'){
                return res.sendStatus(403);
            }
            if(!user){
                return res.sendStatus(403);
            }
            req.headers["adminId"]=user._id;
            next();
        })
    }
    else{
        res.sendStatus(401);
    }
}