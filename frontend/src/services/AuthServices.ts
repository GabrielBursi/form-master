import { LoginInput, RegisterInput } from "@/schemas/auth"
import { formApi } from "./config"
import { ServiceReturn } from "@/types/service"
import { AuthResponse } from "@/types/auth"
import { AxiosError } from "axios"

const Login = async (body: LoginInput): ServiceReturn<AuthResponse> => {
	try {
		const { data } = await formApi.post('/auth/login', body)
		return data
	} catch (error)  {
		return new Error(error instanceof AxiosError && error.response?.data.message ? error.response.data.message : 'Houve um erro')
	}
}

const Register = async (body: RegisterInput): ServiceReturn<AuthResponse> => {
	try {
		const { data } = await formApi.post('/auth/register', body)
		return data
	} catch (error)  {
		return new Error(error instanceof AxiosError && error.response?.data.message ? error.response.data.message : 'Houve um erro')
	}
}

export const AuthServices = {
	Login, Register
} as const
