import { Request, Response, NextFunction, RequestParamHandler } from 'express';
import { AnyZodObject, ZodEffects, ZodError } from 'zod';

export const validate = (schema: AnyZodObject | ZodEffects<AnyZodObject>): RequestParamHandler => {
	return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			await schema.parseAsync(req.body);
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				res.status(400).json({
					success: false,
					message: 'Dados inválidos',
					errors: error.errors.map((e) => ({
						field: e.path.join('.'),
						message: e.message,
					})),
				});
				return
			}
			res.status(500).json({
				success: false,
				message: 'Erro interno do servidor',
			});
			return
		}
	};
};
