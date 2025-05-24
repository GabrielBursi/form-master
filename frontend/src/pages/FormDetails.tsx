import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { FormServices } from '@/services/FormServices'
import { QuestionnaireResponse } from '@/types/form'
import { Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { QuestionnairePreview } from '@/components/QuestionnairePreview'
import { QuestionnaireFormData } from '@/schemas/form'

export const FormDetailPage: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	const [formData, setFormData] = useState<QuestionnaireFormData | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!id) {
			navigate('/')
			return
		}

		; (async () => {
			const result = await FormServices.GetById(id)
			if (result instanceof Error) {
				toast.error('Não foi possível carregar o questionário.')
				navigate('/')
				return
			}
			const { questionnaire } = result as QuestionnaireResponse
			setFormData({
				title: questionnaire.title,
				description: questionnaire.description,
				questions: questionnaire.questions,
			})
			setLoading(false)
		})()
	}, [id, navigate])

	if (loading) {
		return (
			<div className="flex items-center justify-center h-full">
				<Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
			</div>
		)
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.3 }}
			className="p-6"
		>
			<Card>
				<CardHeader>
					<CardTitle>Visualizar Questionário</CardTitle>
				</CardHeader>
				<CardContent>
					{formData && <QuestionnairePreview formData={formData} />}
				</CardContent>
			</Card>
		</motion.div>
	)
}
