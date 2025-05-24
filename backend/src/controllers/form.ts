import { AuthRequest } from "../middlewares/auth";
import { Response } from 'express';
import { QuestionnaireFormData, UpdateQuestionnaireData } from "../schemas/form";
import { Questionnaire } from "../models/Form";

export const createQuestionnaire = async (req: AuthRequest, res: Response): Promise<Response> => {
	try {
		const userId = req.user?.id;
		if (!userId) {
			return res.status(401).json({
				success: false,
				message: 'Não autorizado',
			});
		}

		const questionnaireData: QuestionnaireFormData = req.body;

		const questionnaire = new Questionnaire({
			...questionnaireData,
			userId,
		});

		await questionnaire.save();

		return res.status(201).json({
			success: true,
			message: 'Questionário criado com sucesso',
			questionnaire,
		});
	} catch (error) {
		console.error('Erro ao criar questionário:', error);
		return res.status(500).json({
			success: false,
			message: 'Erro ao criar questionário',
		});
	}
};

export const getQuestionnaires = async (req: AuthRequest, res: Response): Promise<Response> => {
	try {
		const userId = req.user?.id;
		if (!userId) {
			return res.status(401).json({
				success: false,
				message: 'Não autorizado',
			});
		}

		const questionnaires = await Questionnaire.find({ userId }).sort({ createdAt: -1 });

		return res.status(200).json({
			success: true,
			questionnaires,
		});
	} catch (error) {
		console.error('Erro ao buscar questionários:', error);
		return res.status(500).json({
			success: false,
			message: 'Erro ao buscar questionários',
		});
	}
};

export const getQuestionnaireById = async (req: AuthRequest, res: Response): Promise<Response> => {
	try {
		const userId = req.user?.id;
		const { id } = req.params;

		if (!userId) {
			return res.status(401).json({
				success: false,
				message: 'Não autorizado',
			});
		}

		const questionnaire = await Questionnaire.findOne({ _id: id, userId });

		if (!questionnaire) {
			return res.status(404).json({
				success: false,
				message: 'Questionário não encontrado',
			});
		}

		return res.status(200).json({
			success: true,
			questionnaire,
		});
	} catch (error) {
		console.error('Erro ao buscar questionário:', error);
		return res.status(500).json({
			success: false,
			message: 'Erro ao buscar questionário',
		});
	}
};

export const updateQuestionnaire = async (req: AuthRequest, res: Response): Promise<Response> => {
	try {
		const userId = req.user?.id;
		const { id } = req.params;

		if (!userId) {
			return res.status(401).json({
				success: false,
				message: 'Não autorizado',
			});
		}

		const updateData: UpdateQuestionnaireData = req.body;

		const questionnaire = await Questionnaire.findOneAndUpdate(
			{ _id: id, userId },
			updateData,
			{ new: true, runValidators: true }
		);

		if (!questionnaire) {
			return res.status(404).json({
				success: false,
				message: 'Questionário não encontrado',
			});
		}

		return res.status(200).json({
			success: true,
			message: 'Questionário atualizado com sucesso',
			questionnaire,
		});
	} catch (error) {
		console.error('Erro ao atualizar questionário:', error);
		return res.status(500).json({
			success: false,
			message: 'Erro ao atualizar questionário',
		});
	}
};

export const deleteQuestionnaire = async (req: AuthRequest, res: Response): Promise<Response> => {
	try {
		const userId = req.user?.id;
		const { id } = req.params;

		if (!userId) {
			return res.status(401).json({
				success: false,
				message: 'Não autorizado',
			});
		}

		const questionnaire = await Questionnaire.findOneAndDelete({ _id: id, userId });

		if (!questionnaire) {
			return res.status(404).json({
				success: false,
				message: 'Questionário não encontrado',
			});
		}

		return res.status(200).json({
			success: true,
			message: 'Questionário excluído com sucesso',
		});
	} catch (error) {
		console.error('Erro ao excluir questionário:', error);
		return res.status(500).json({
			success: false,
			message: 'Erro ao excluir questionário',
		});
	}
};
