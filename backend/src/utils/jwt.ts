import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/database';

export const generateToken = (userId: string): string => {
	return jwt.sign({ id: userId }, JWT_SECRET, {
		expiresIn: '7d',
	});
};
