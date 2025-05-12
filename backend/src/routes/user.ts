import express from 'express';
import { authenticate } from '../middlewares/auth';
import { getCurrentUser } from '../controllers/user';

export const userRouter = express.Router();

userRouter.get('/me', authenticate as express.RequestHandler, getCurrentUser);

