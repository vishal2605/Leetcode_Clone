import express from 'express';
import { authenticateJwt, SECRET } from "../middleware/auth";
import jwt from 'jsonwebtoken';
import { User, Problems, Admin } from "../db";
const router = express.Router();
import z from 'zod';


export default router;