import { Request, Response } from 'express';
import User from '../models/User';
import { generateToken } from '../utils/jwt';
import { LoginInput, RegisterInput } from '../schemas/auth';

export const register = async (req: Request, res: Response): Promise<Response> => {
	try {
		const userData: RegisterInput = req.body;

		const existingUser = await User.findOne({ email: userData.email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: 'Email já está em uso',
			});
		}

		const user = new User({
			name: userData.name,
			email: userData.email,
			password: userData.password,
			phone: userData.phone,
			profession: userData.profession,
		});

		await user.save();

		const token = generateToken(user.id);

		return res.status(201).json({
			success: true,
			message: 'Usuário registrado com sucesso',
			token,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				phone: user.phone,
				profession: user.profession,
			},
		});
	} catch (error) {
		console.error('Erro ao registrar usuário:', error);
		return res.status(500).json({
			success: false,
			message: 'Erro ao registrar usuário',
		});
	}
};

export const login = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { email, password }: LoginInput = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({
				success: false,
				message: 'Email ou senha inválidos',
			});
		}

		const isPasswordValid = await user.comparePassword(password);
		if (!isPasswordValid) {
			return res.status(401).json({
				success: false,
				message: 'Email ou senha inválidos',
			});
		}

		const token = generateToken(user.id);

		return res.status(200).json({
			success: true,
			message: 'Login realizado com sucesso',
			token,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				phone: user.phone,
				profession: user.profession,
			},
		});
	} catch (error) {
		console.error('Erro ao fazer login:', error);
		return res.status(500).json({
			success: false,
			message: 'Erro ao fazer login',
		});
	}
};
