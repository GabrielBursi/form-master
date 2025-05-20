import axios from 'axios'

export const formApi = axios.create({
	baseURL: import.meta.env['VITE_API_URL']
})

formApi.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token')
		if (!token && !config.url?.startsWith('/auth')) {
			return Promise.reject(new Error('Rota não permitida sem token!'))
		}

		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => Promise.reject(error)
)

