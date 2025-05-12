import { Request, RequestParamHandler } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/database';

export interface AuthRequest extends Request {
	user?: {
		id: string;
	};
}

export const authenticate: RequestParamHandler = (req: AuthRequest, res, next):  void => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			res.status(401).json({
				success: false,
				message: 'Acesso não autorizado. Token não fornecido',
			});
			return
		}

		const token = authHeader.split(' ')[1];

		const decoded = jwt.verify(token!, JWT_SECRET) as { id: string };

		req.user = {
			id: decoded.id,
		};

		next();
	} catch (error) {
		res.status(401).json({
			success: false,
			message: 'Token inválido ou expirado',
		});
	}
};
