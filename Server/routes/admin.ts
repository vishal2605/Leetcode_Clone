import  mongoose from 'mongoose';
import express from 'express';
import {User,Problems,Admin,Tag} from '../db';
import jwt from 'jsonwebtoken';
import  {SECRET} from '../middleware/auth';
import {authenticateJwt} from '../middleware/auth';
import z from 'zod';
import Response from 'express';
const router= express.Router();

const loginInput=z.object({
  username:z.string(),
  password:z.string()
});
const signUpInput=z.object({
    name:z.string(),
    username:z.string(),
    password:z.string()
})
router.get('/me', authenticateJwt, async (req, res) => {
  const adminId=await req.headers["adminId"];
  const admin = await Admin.findOne({ _id:adminId });
    if (!admin) {
      res.status(403).json({msg: "Admin doesnt exist"})
      return
    }
    res.json(admin.username);
});
router.post('/signup',async (req,res)=>{
    let parsedInput=signUpInput.safeParse(req.body);
    if(!parsedInput.success){
      return res.status(403).json({
        msg:"Parsing Error"
      });
    }
    const username=parsedInput.data.username;
    const password=parsedInput.data.password;
    const name=parsedInput.data.name;
    const admin = await Admin.findOne({username,password});
    console.log("admin signup");
    if (admin) {
      res.status(403).json({ message: 'Admin already exists' });
    } else {
      const obj={username:username,password:password,name:name};
      const newAdmin = new Admin(obj);
      newAdmin.save();
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Admin created successfully', token });
    }
});
    router.post('/login',async (req,res)=>{
        let parsedInput=loginInput.safeParse(req.body);
        if(!parsedInput.success){
          return res.status(403).json({
              msg:"Parsing Error"
          });
        }
        const username=parsedInput.data.username;
        const password=parsedInput.data.password;
        const admin = await Admin.findOne({username,password});
        if (admin){
            const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
            res.json({ message: 'Logged in successfully', token });
        } else{
            res.status(403).json({ message: 'Invalid username or password' });
        }
    });
    router.get('/problemSetAll',async(req,res)=>{
        const problems=await Problems.find({});
        res.json({problems});
    });

    router.post('/problem',authenticateJwt, async(req,res)=>{
      const problem = new Problems(req.body);
      await problem.save();
      const tag=req.body.tag;
      console.log(req.body);
      const checkTag= await Tag.find({tag:tag});
      if(checkTag && checkTag.length!=undefined){
        const putTag=await Tag.findOneAndUpdate({tag:tag,length:checkTag.length+1});
      }
      else{
        const obj={tag:problem.tag,length:1}
        const newTag=new Tag(obj);
        await newTag.save();
      }
      res.json({message:'Problem created successfully',problemId:problem.id });
    });
    router.put('/problems/:problemId',authenticateJwt, async (req,res)=>{
      const problem=await Problems.findByIdAndUpdate(req.params.problemId,req.body);
      if(problem){
        res.json({message:'Problem is Updated successfully'});
      }
      else{
        res.status(404).json({message:'Problem not found'});
      }
    });
    router.get('/tag',authenticateJwt, async (req,res) => {
      const tag=Tag.find({});
      res.json({tag});
    })
    router.get('/problems/:problemId',authenticateJwt, async (req,res)=>{
      const problem = await Problems.findById(req.params.problemId);
      if(problem){
        res.json(problem);
      }
      else{
        res.status(404).json("Questions not found");
      }
    });
  
export default router;