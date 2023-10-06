import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import  adminRouter from './routes/admin';
import userRouter from './routes/user';

const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://vishal2001lohar:Vishal123@cluster0.x3os1qm.mongodb.net/', { dbName: "problem" });


//Admin routes
app.use('/admin',adminRouter);
//User routes

app.use('/users',userRouter);


app.listen(3000, () => console.log('Server running on port 3000'));

