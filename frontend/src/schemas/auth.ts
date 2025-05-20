
import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
	password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export const registerSchema = z
	.object({
		name: z
			.string()
			.min(3, 'Nome deve ter pelo menos 3 caracteres')
			.max(100, 'Nome muito longo')
			.transform((value) => {
				return value
					.trim()
					.split(' ')
					.map(
						(word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
					)
					.join(' ');
			}),
		phone: z
			.string()
			.min(14, 'Telefone inválido')
			.max(15, 'Telefone inválido')
			.regex(
				/^\(\d{2}\)\s\d{5}-\d{4}$/,
				'Formato inválido. Use (00) 00000-0000'
			),
		email: z
			.string()
			.min(1, 'Email é obrigatório')
			.email('Formato de email inválido'),
		profession: z.string().min(1, 'Selecione uma profissão'),
		password: z
			.string()
			.min(8, 'Senha deve ter pelo menos 8 caracteres')
			.regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
			.regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
			.regex(/\d/, 'Senha deve conter pelo menos um número')
			.regex(
				/[^A-Za-z0-9]/,
				'Senha deve conter pelo menos um caractere especial'
			),
		confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'As senhas não coincidem',
		path: ['confirmPassword'],
	});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
