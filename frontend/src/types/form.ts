import { QuestionnaireFormData } from "@/schemas/form"

interface Questionnaire extends QuestionnaireFormData {
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
