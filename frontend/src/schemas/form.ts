import { z } from 'zod';

export const alternativeSchema = z.object({
	text: z.string().min(1, 'O texto da alternativa é obrigatório'),
	isCorrect: z.boolean().default(false).optional(),
});

export const questionSchema = z.object({
	title: z.string().min(3, 'A pergunta deve ter pelo menos 3 caracteres'),
	type: z.enum(['multiple_choice', 'open_ended', 'scale', 'boolean']),
	required: z.boolean().default(true).optional(),
	alternatives: z.array(alternativeSchema).optional(),
	minValue: z.number().optional(),
	maxValue: z.number().optional(),
});

export const questionnaireSchema = z.object({
	title: z.string().min(3, 'O título do questionário é obrigatório'),
	description: z.string().optional(),
	questions: z.array(questionSchema),
});

export const updateQuestionnaireSchema = questionnaireSchema.partial();

export type QuestionnaireFormData = z.infer<typeof questionnaireSchema>;
export type UpdateQuestionnaireData = z.infer<typeof updateQuestionnaireSchema>;
export type Alternative = z.infer<typeof alternativeSchema>;
export type Question = z.infer<typeof questionSchema>;
