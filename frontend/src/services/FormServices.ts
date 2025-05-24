import { AxiosError } from "axios"
import { formApi } from "./config"
import { ServiceReturn } from "@/types/service"
import { QuestionnaireFormData, UpdateQuestionnaireData } from "@/schemas/form"
import { QuestionnaireResponse, QuestionnairesResponse } from "@/types/form"

const Create = async (body: QuestionnaireFormData): ServiceReturn<QuestionnaireResponse> => {
	try {
		const { data } = await formApi.post('/forms', body)
		return data
	} catch (error) {
		return new Error(error instanceof AxiosError && error.response?.data.message ? error.response.data.message : 'Erro ao criar questionário')
	}
}

const GetAll = async (): ServiceReturn<QuestionnairesResponse> => {
	try {
		const { data } = await formApi.get('/forms')
		return data
	} catch (error) {
		return new Error(error instanceof AxiosError && error.response?.data.message ? error.response.data.message : 'Erro ao buscar questionários')
	}
}

const GetById = async (id: string): ServiceReturn<QuestionnaireResponse> => {
	try {
		const { data } = await formApi.get(`/forms/${id}`)
		return data
	} catch (error) {
		return new Error(error instanceof AxiosError && error.response?.data.message ? error.response.data.message : 'Erro ao buscar questionário')
	}
}

const Update = async (id: string, body: UpdateQuestionnaireData): ServiceReturn<void> => {
	try {
		const { data } = await formApi.put(`/forms/${id}`, body)
		return data
	} catch (error) {
		return new Error(error instanceof AxiosError && error.response?.data.message ? error.response.data.message : 'Erro ao atualizar questionário')
	}
}

const Remove = async (id: string): ServiceReturn<void> => {
	try {
		const { data } = await formApi.delete(`/forms/${id}`)
		return data
	} catch (error) {
		return new Error(error instanceof AxiosError && error.response?.data.message ? error.response.data.message : 'Erro ao excluir questionário')
	}
}

export const FormServices = {
	Create,
	GetAll,
	GetById,
	Update,
	Remove
} as const
