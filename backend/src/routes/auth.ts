import express from 'express';
import { login, register } from '../controllers/auth';
import { validate } from '../middlewares/validate';
import { loginSchema, registerSchema } from '../schemas/auth';

export const authRouter = express.Router();

authRouter.post('/register', validate(registerSchema) as express.RequestHandler, register);

authRouter.post('/login', validate(loginSchema) as express.RequestHandler, login);

