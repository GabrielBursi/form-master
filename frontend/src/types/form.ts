import { QuestionnaireFormData } from "@/schemas/form"

export interface Questionnaire extends QuestionnaireFormData {
	_id: string
	userId: string
	createdAt: string
	updatedAt: string
}

export interface QuestionnaireResponse {
	success: boolean
	message: string
	questionnaire: Questionnaire
}

export interface QuestionnairesResponse {
	success: boolean
	message: string
	questionnaires: Questionnaire[]
}
