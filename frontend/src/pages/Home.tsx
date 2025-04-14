import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { FileText, User, CheckCircle } from 'lucide-react'
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card'

export const Home = () => {
	const navigate = useNavigate()

	return (
		<div className="space-y-12 py-8">
			<motion.div
				className="text-center space-y-4"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<h1 className="text-4xl font-bold">FormMaster</h1>
				<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
					Plataforma dinâmica para criação de perfis e questionários
					personalizados
				</p>
			</motion.div>

			<motion.div
				className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.3, duration: 0.5 }}
			>
				<Card className="h-full">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<User className="h-5 w-5" /> Cadastro de Perfil
						</CardTitle>
						<CardDescription>
							Crie seu perfil completo com dados pessoais, endereços e
							preferências
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<ul className="space-y-2">
								<li className="flex items-center gap-2 text-sm">
									<CheckCircle className="h-4 w-4 text-green-500" />
									Dados pessoais com validação
								</li>
								<li className="flex items-center gap-2 text-sm">
									<CheckCircle className="h-4 w-4 text-green-500" />
									Múltiplos endereços e contatos
								</li>
								<li className="flex items-center gap-2 text-sm">
									<CheckCircle className="h-4 w-4 text-green-500" />
									Preferências e interesses personalizados
								</li>
							</ul>
							<Button className="w-full" onClick={() => navigate('/register')}>
								Iniciar Cadastro
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card className="h-full">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<FileText className="h-5 w-5" /> Criação de Questionários
						</CardTitle>
						<CardDescription>
							Elabore questionários personalizados com diferentes tipos de
							perguntas
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<ul className="space-y-2">
								<li className="flex items-center gap-2 text-sm">
									<CheckCircle className="h-4 w-4 text-green-500" />
									Diferentes tipos de perguntas
								</li>
								<li className="flex items-center gap-2 text-sm">
									<CheckCircle className="h-4 w-4 text-green-500" />
									Alternativas dinâmicas com drag & drop
								</li>
								<li className="flex items-center gap-2 text-sm">
									<CheckCircle className="h-4 w-4 text-green-500" />
									Preview e edição de questionários
								</li>
							</ul>
							<Button
								className="w-full"
								onClick={() => navigate('/questionnaire-builder')}
							>
								Criar Questionário
							</Button>
						</div>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	)
}
