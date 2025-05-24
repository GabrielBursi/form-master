import { Label } from '@radix-ui/react-label'
import { Separator } from '@radix-ui/react-select'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'
import { QuestionnaireFormData } from '@/schemas/form'

export const QuestionnairePreview = ({
	formData,
}: {
	formData: QuestionnaireFormData
}) => {
	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold">{formData.title}</h2>
				{formData.description && (
					<p className="text-muted-foreground mt-2">{formData.description}</p>
				)}
			</div>

			<Separator />

			<div className="space-y-6">
				{formData.questions.map((question, index) => (
					<Card key={index}>
						<CardHeader>
							<div className="flex justify-between items-start">
								<div>
									<CardTitle className="text-lg">
										{question.title}
										{question.required && (
											<span className="text-destructive ml-1">*</span>
										)}
									</CardTitle>
								</div>
								<Badge variant={question.required ? 'default' : 'outline'}>
									{question.required ? 'Obrigatória' : 'Opcional'}
								</Badge>
							</div>
						</CardHeader>
						<CardContent>
							{question.type === 'multiple_choice' && question.alternatives && (
								<div className="space-y-2">
									{question.alternatives.map((alt, altIndex) => (
										<div key={altIndex} className="flex items-center gap-2">
											<input
												type="radio"
												disabled
												id={`preview-${index}-${altIndex}`}
											/>
											<Label htmlFor={`preview-${index}-${altIndex}`}>
												{alt.text}
												{alt.isCorrect && (
													<span className="text-green-500 ml-2">(Correta)</span>
												)}
											</Label>
										</div>
									))}
								</div>
							)}

							{question.type === 'open_ended' && (
								<Textarea disabled placeholder="Resposta do respondente..." />
							)}

							{question.type === 'scale' && (
								<div className="flex justify-between items-center mt-2">
									<span>{question.minValue ?? 0}</span>
									<div className="flex-1 px-4">
										<div className="h-2 bg-muted rounded-full"></div>
									</div>
									<span>{question.maxValue ?? 10}</span>
								</div>
							)}

							{question.type === 'boolean' && (
								<div className="flex gap-4">
									<div className="flex items-center gap-2">
										<input type="radio" disabled id={`preview-yes-${index}`} />
										<Label htmlFor={`preview-yes-${index}`}>Sim</Label>
									</div>
									<div className="flex items-center gap-2">
										<input type="radio" disabled id={`preview-no-${index}`} />
										<Label htmlFor={`preview-no-${index}`}>Não</Label>
									</div>
								</div>
							)}
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}
