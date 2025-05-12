import { Response } from 'express';
import User from '../models/User';
import { AuthRequest } from '../middlewares/auth';

export const getCurrentUser = async (req: AuthRequest, res: Response): Promise<Response> => {
	try {
		if (!req.user?.id) {
			return res.status(401).json({
				success: false,
				message: 'Não autorizado',
			});
		}

		const user = await User.findById(req.user.id).select('-password');
		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'Usuário não encontrado',
			});
		}

		return res.status(200).json({
			success: true,
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				phone: user.phone,
				profession: user.profession,
			},
		});
	} catch (error) {
		console.error('Erro ao buscar usuário:', error);
		return res.status(500).json({
			success: false,
			message: 'Erro ao buscar usuário',
		});
	}
};
