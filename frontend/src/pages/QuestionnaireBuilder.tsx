import { Button } from '../components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../components/ui/card'

export const QuestionnaireBuilder = () => {
	return (
		<div className="max-w-3xl mx-auto">
			<h1 className="text-3xl font-bold mb-6">Criação de Questionário</h1>
			<p className="text-muted-foreground mb-8">
				Elabore seu questionário personalizado adicionando diferentes tipos de
				perguntas
			</p>

			<Card>
				<CardHeader>
					<CardTitle>Configurações do Questionário</CardTitle>
					<CardDescription>
						Defina o título e a descrição do seu questionário
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-center py-12 text-muted-foreground">
						Aqui será implementado o construtor de questionários com formulários
						dinâmicos
					</p>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button variant="outline">Voltar</Button>
					<Button>Próximo</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
