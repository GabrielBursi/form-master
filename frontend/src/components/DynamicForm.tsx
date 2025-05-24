import { useState, useEffect, useCallback } from 'react'
import {
	useForm,
	FormProvider,
	useFieldArray,
	FieldArrayWithId,
	FieldErrors,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Reorder } from 'framer-motion'
import { PlusCircle, ChevronRight, ChevronLeft, Save } from 'lucide-react'

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { QuestionItem } from './QuestionItem'
import { QuestionnairePreview } from './QuestionnairePreview'
import { toast } from 'sonner'
import { QuestionnaireFormData, questionnaireSchema } from '@/schemas/form'

export const DynamicForm = () => {
	const form = useForm<QuestionnaireFormData>({
		resolver: zodResolver(questionnaireSchema),
		defaultValues: {
			title: '',
			description: '',
			questions: [],
		},
		mode: 'onChange',
	})

	const {
		control,
		register,
		handleSubmit,
		trigger,
		formState: { errors },
	} = form

	const questions = useFieldArray<QuestionnaireFormData>({
		control,
		name: 'questions',
	})

	const [currentStep, setCurrentStep] = useState(0)
	const [draggingIndex, setDraggingIndex] = useState<null | number>(null)

	const steps = [
		{
			title: 'Informações básicas',
			description: 'Defina o título e descrição do seu questionário',
		},
		{
			title: 'Perguntas',
			description: 'Adicione e configure as perguntas do seu questionário',
		},
		{
			title: 'Pré-visualização',
			description: 'Veja como seu questionário ficará para os respondentes',
		},
	]

	useEffect(() => {
		const savedData = sessionStorage.getItem('questionnaire-form')
		if (savedData) {
			try {
				form.reset(JSON.parse(savedData))
			} catch (error) {
				console.error('Erro ao carregar dados salvos:', error)
			}
		}
	}, [form])

	useEffect(() => {
		const subscription = form.watch((value) => {
			sessionStorage.setItem('questionnaire-form', JSON.stringify(value))
		})
		return () => subscription.unsubscribe()
	}, [form])

	const handleDragStart = (index: number) => {
		setDraggingIndex(index)
	}

	const handleDragEnd = () => {
		setDraggingIndex(null)
	}

	const handleReorder = (
		newOrder: FieldArrayWithId<QuestionnaireFormData>[]
	) => {
		if (draggingIndex === null) return

		const draggingQuestion = questions.fields[draggingIndex]

		newOrder.forEach((question, index) => {
			if (question === draggingQuestion) {
				questions.move(draggingIndex, index)
				setDraggingIndex(index)
			}
		})
	}

	const handleAddQuestion = () => {
		questions.append({
			title: '',
			type: 'multiple_choice',
			required: true,
			alternatives: [
				{ text: '', isCorrect: false },
				{ text: '', isCorrect: false },
			],
		})
	}

	const onSubmit = async (data: QuestionnaireFormData) => {
		console.log('Questionário finalizado:', data)

		sessionStorage.removeItem('questionnaire-form')
		alert('Questionário salvo com sucesso!')
	}

	const formatErrors = useCallback(
		(errors: FieldErrors<QuestionnaireFormData>) => {
			const errorMessages: string[] = []

			if (errors.title?.message) {
				errorMessages.push(`Título: ${errors.title.message}`)
			}

			if (errors.questions && Array.isArray(errors.questions)) {
				errors.questions.forEach((questionError, qIndex) => {
					if (!questionError) return

					if ('title' in questionError && questionError.title?.message) {
						errorMessages.push(
							`Pergunta ${qIndex + 1}: ${questionError.title.message}`
						)
					}

					if (
						'alternatives' in questionError &&
						Array.isArray(questionError.alternatives)
					) {
						questionError.alternatives.forEach((altError, aIndex) => {
							if (!altError) return

							if ('text' in altError && altError.text?.message) {
								errorMessages.push(
									`Pergunta ${qIndex + 1}, Alternativa ${aIndex + 1}: ${altError.text.message}`
								)
							}
						})
					}
				})
			}

			return errorMessages
		},
		[]
	)

	const showErrors = (errors: FieldErrors<QuestionnaireFormData>) => {
		const formatedErros = formatErrors(errors)
		if (formatedErros.length > 0) {
			toast('Corrija os erros abaixo:', {
				description: (
					<ul className="list-disc pl-4 mt-2 space-y-1">
						{formatedErros.map((message, i) => (
							<li key={i} className="text-sm text-black">
								{message}
							</li>
						))}
					</ul>
				),
				duration: 5000,
			})
		}
	}

	const nextStep = () => {
		setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
	}

	const prevStep = () => {
		setCurrentStep((prev) => Math.max(prev - 1, 0))
	}

	const canAdvance = async () => {
		if (currentStep === 0) {
			return trigger(['title', 'description'])
		}
		if (currentStep === 1) {
			return trigger('questions')
		}
		return true
	}

	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-col space-y-1">
				<h1 className="text-3xl font-bold">Criação de Questionário</h1>
				<p className="text-muted-foreground">
					Elabore seu questionário personalizado adicionando diferentes tipos de
					perguntas
				</p>
			</div>

			<Tabs value={String(currentStep)} className="w-full">
				<TabsList className="grid grid-cols-3">
					{steps.map((step, index) => (
						<TabsTrigger
							key={index}
							value={String(index)}
							disabled={index > currentStep}
							onClick={() => {
								if (index <= currentStep) {
									setCurrentStep(index)
								}
							}}
							className="relative"
						>
							<span className="flex items-center gap-2">
								<span className="hidden md:inline">{step.title}</span>
								<span className="md:hidden">Etapa {index + 1}</span>
							</span>
						</TabsTrigger>
					))}
				</TabsList>

				<FormProvider {...form}>
					<form className="mt-6">
						<Card>
							{steps[currentStep] && (
								<CardHeader>
									<CardTitle>{steps[currentStep].title}</CardTitle>
									<p className="text-muted-foreground">
										{steps[currentStep].description}
									</p>
								</CardHeader>
							)}

							<CardContent>
								{currentStep === 0 && (
									<div className="space-y-4">
										<div>
											<Label htmlFor="title">Título do questionário</Label>
											<Input
												id="title"
												{...register('title')}
												placeholder="Ex: Pesquisa de satisfação"
												className="mt-1"
											/>
											{errors.title && (
												<p className="text-destructive text-sm mt-1">
													{errors.title.message}
												</p>
											)}
										</div>

										<div>
											<Label htmlFor="description">Descrição (opcional)</Label>
											<Textarea
												id="description"
												{...register('description')}
												placeholder="Descreva o objetivo do seu questionário"
												className="mt-1"
												rows={4}
											/>
										</div>
									</div>
								)}

								{currentStep === 1 && (
									<div>
										<div className="flex justify-between items-center mb-4">
											<h3 className="text-lg font-medium">
												Perguntas ({questions.fields.length})
											</h3>
											<Button type="button" onClick={handleAddQuestion}>
												<PlusCircle className="h-4 w-4 mr-2" />
												Adicionar pergunta
											</Button>
										</div>

										{questions.fields.length === 0 ? (
											<div className="text-center p-8 border border-dashed rounded-md">
												<p className="text-muted-foreground">
													Adicione perguntas ao seu questionário
												</p>
												<Button
													type="button"
													variant="outline"
													onClick={handleAddQuestion}
													className="mt-4"
												>
													<PlusCircle className="h-4 w-4 mr-2" />
													Adicionar primeira pergunta
												</Button>
											</div>
										) : (
											<Reorder.Group
												axis="y"
												values={questions.fields}
												onReorder={handleReorder}
												className="space-y-4"
											>
												{questions.fields.map((question, index) => (
													<Reorder.Item
														key={question.id}
														value={question}
														className={`border rounded-md ${
															draggingIndex === index
																? 'border-primary bg-primary/5'
																: ''
														}`}
														onDragStart={() => handleDragStart(index)}
														onDragEnd={handleDragEnd}
													>
														<QuestionItem
															index={index}
															remove={questions.remove}
														/>
													</Reorder.Item>
												))}
											</Reorder.Group>
										)}
									</div>
								)}

								{currentStep === 2 && (
									<QuestionnairePreview formData={form.getValues()} />
								)}
							</CardContent>

							<CardFooter className="flex justify-between">
								<div>
									{currentStep > 0 && (
										<Button type="button" variant="outline" onClick={prevStep}>
											<ChevronLeft className="h-4 w-4 mr-2" />
											Voltar
										</Button>
									)}
								</div>

								<div>
									{currentStep < steps.length - 1 ? (
										<Button
											type="button"
											onClick={async () => {
												const valid = await canAdvance()
												if (valid) nextStep()
												else showErrors(errors)
											}}
										>
											Continuar
											<ChevronRight className="h-4 w-4 ml-2" />
										</Button>
									) : (
										<Button
											type="button"
											onClick={handleSubmit(onSubmit, showErrors)}
										>
											<Save className="h-4 w-4 mr-2" />
											Finalizar questionário
										</Button>
									)}
								</div>
							</CardFooter>
						</Card>
					</form>
				</FormProvider>
			</Tabs>
		</div>
	)
}
