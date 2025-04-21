import { Reorder } from 'framer-motion'
import { GripVertical, XCircle, PlusCircle } from 'lucide-react'
import { useState } from 'react'
import {
	useFieldArray,
	Controller,
	useFormContext,
	FieldArrayWithId,
	UseFieldArrayRemove,
} from 'react-hook-form'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Input } from './ui/input'
import { QuestionnaireFormData } from '@/schema'
import { Label } from './ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select'
import { Switch } from './ui/switch'

export const QuestionItem = ({
	index,
	remove,
}: {
	index: number
	remove: UseFieldArrayRemove
}) => {
	const {
		control,
		register,
		watch,
		clearErrors,
		unregister,
		formState: { errors },
	} = useFormContext<QuestionnaireFormData>()

	const questionType = watch(`questions.${index}.type`)

	const alternatives = useFieldArray<QuestionnaireFormData>({
		control,
		name: `questions.${index}.alternatives`,
	})

	const [dragAlternativeIndex, setDragAlternativeIndex] = useState<
		number | null
	>(null)

	const handleDragAlternativeStart = (altIndex: number) => {
		setDragAlternativeIndex(altIndex)
	}

	const handleDragAlternativeEnd = () => {
		setDragAlternativeIndex(null)
	}

	const handleReorderAlternatives = (
		newOrder: FieldArrayWithId<QuestionnaireFormData>[]
	) => {
		if (dragAlternativeIndex === null) return

		const draggingAlt = alternatives.fields[dragAlternativeIndex]

		newOrder.forEach((alt, altIndex) => {
			if (alt === draggingAlt) {
				alternatives.move(dragAlternativeIndex, altIndex)
				setDragAlternativeIndex(altIndex)
			}
		})
	}

	return (
		<Card className="mb-4">
			<CardHeader className="pb-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<div className="cursor-move p-1">
							<GripVertical className="h-5 w-5 text-muted-foreground" />
						</div>
						<CardTitle className="text-lg">Pergunta {index + 1}</CardTitle>
					</div>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => remove(index)}
						className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
					>
						<XCircle className="h-5 w-5" />
					</Button>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div>
					<Label htmlFor={`question-title-${index}`}>Pergunta</Label>
					<Input
						id={`question-title-${index}`}
						{...register(`questions.${index}.title`)}
						placeholder="Digite sua pergunta"
						className="mt-1"
					/>
					{errors.questions?.[index]?.title && (
						<p className="text-destructive text-sm mt-1">
							{errors.questions[index].title.message}
						</p>
					)}
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<Label htmlFor={`question-type-${index}`}>Tipo da pergunta</Label>
						<Controller
							control={control}
							name={`questions.${index}.type`}
							render={({ field }) => (
								<Select
									value={field.value}
									onValueChange={(ev) => {
										field.onChange(ev)

										clearErrors(`questions.${index}`)

										if (ev !== 'multiple_choice') {
											unregister(`questions.${index}.alternatives`, {
												keepDirty: false,
												keepTouched: false,
											})
										}
										if (ev === 'multiple_choice') {
											alternatives.append({ text: '', isCorrect: false })
											alternatives.append({ text: '', isCorrect: false })
										}
									}}
								>
									<SelectTrigger id={`question-type-${index}`} className="mt-1">
										<SelectValue placeholder="Selecione o tipo" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="multiple_choice">
											Múltipla escolha
										</SelectItem>
										<SelectItem value="open_ended">Resposta aberta</SelectItem>
										<SelectItem value="scale">Escala</SelectItem>
										<SelectItem value="boolean">Sim/Não</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
						{errors.questions?.[index]?.type && (
							<p className="text-destructive text-sm mt-1">
								Tipo não encontrado
							</p>
						)}
					</div>
					<div className="flex items-center justify-end space-x-2">
						<Label htmlFor={`question-required-${index}`}>Obrigatória</Label>
						<Controller
							control={control}
							name={`questions.${index}.required`}
							render={({ field }) => (
								<Switch
									id={`question-required-${index}`}
									checked={!!field.value}
									onCheckedChange={field.onChange}
								/>
							)}
						/>
						{errors.questions?.[index]?.required && (
							<p className="text-destructive text-sm mt-1">
								{errors.questions[index].required.message}
							</p>
						)}
					</div>
				</div>

				{questionType === 'multiple_choice' && (
					<div className="mt-4">
						<div className="flex justify-between items-center mb-2">
							<Label>Alternativas</Label>
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={() => {
									alternatives.append({ text: '', isCorrect: false })
								}}
							>
								<PlusCircle className="h-4 w-4 mr-1" />
								Adicionar alternativa
							</Button>
						</div>

						<Reorder.Group
							axis="y"
							values={alternatives.fields}
							onReorder={handleReorderAlternatives}
							className="space-y-2"
						>
							{alternatives.fields.map((alt, altIndex) => (
								<Reorder.Item
									key={alt.id}
									value={alt}
									className="flex flex-col gap-2"
									onDragStart={() => handleDragAlternativeStart(altIndex)}
									onDragEnd={handleDragAlternativeEnd}
								>
									<div className="flex items-center gap-2 p-2 border rounded-md">
										<div className="cursor-move p-1">
											<GripVertical className="h-4 w-4 text-muted-foreground" />
										</div>
										<Input
											{...register(
												`questions.${index}.alternatives.${altIndex}.text`
											)}
											className="flex-1"
											placeholder="Texto da alternativa"
										/>

										<div className="flex items-center gap-2">
											<Label
												htmlFor={`correct-${index}-${altIndex}`}
												className="text-sm whitespace-nowrap"
											>
												Correta
											</Label>
											<Controller
												control={control}
												name={`questions.${index}.alternatives.${altIndex}.isCorrect`}
												render={({ field }) => (
													<Switch
														id={`correct-${index}-${altIndex}`}
														checked={!!field.value}
														onCheckedChange={field.onChange}
													/>
												)}
											/>
										</div>

										<Button
											type="button"
											variant="ghost"
											size="icon"
											onClick={() => alternatives.remove(altIndex)}
											className="text-destructive hover:bg-destructive/10"
										>
											<XCircle className="h-4 w-4" />
										</Button>
									</div>
									{errors.questions?.[index]?.alternatives?.[altIndex]?.text
										?.message && (
										<p className="text-destructive text-sm mt-1">
											{
												errors.questions[index].alternatives[altIndex].text
													.message
											}
										</p>
									)}
									{errors.questions?.[index]?.alternatives?.[altIndex]
										?.isCorrect?.message && (
										<p className="text-destructive text-sm mt-1">
											{
												errors.questions[index].alternatives[altIndex].isCorrect
													.message
											}
										</p>
									)}
								</Reorder.Item>
							))}
						</Reorder.Group>
					</div>
				)}

				{questionType === 'scale' && (
					<div className="grid grid-cols-2 gap-4 mt-4">
						<div>
							<Label htmlFor={`min-value-${index}`}>Valor mínimo</Label>
							<Input
								id={`min-value-${index}`}
								type="number"
								{...register(`questions.${index}.minValue`, {
									valueAsNumber: true,
								})}
								className="mt-1"
								defaultValue={0}
							/>
							{errors.questions?.[index]?.minValue && (
								<p className="text-destructive text-sm mt-1">
									{errors.questions[index]?.minValue.message}
								</p>
							)}
						</div>
						<div>
							<Label htmlFor={`max-value-${index}`}>Valor máximo</Label>
							<Input
								id={`max-value-${index}`}
								type="number"
								{...register(`questions.${index}.maxValue`, {
									valueAsNumber: true,
								})}
								className="mt-1"
								defaultValue={10}
							/>
							{errors.questions?.[index]?.maxValue && (
								<p className="text-destructive text-sm mt-1">
									{errors.questions[index]?.maxValue.message}
								</p>
							)}
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
