import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FileText, User, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card'
import { useAuth } from '@/context/AuthContext'

export const Home = () => {
	const navigate = useNavigate()
	const { user } = useAuth()

	const [forms] = useState([
	])

	if (!user) {
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
						Plataforma dinâmica para criação de perfis e questionários personalizados
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
								Crie seu perfil completo com dados pessoais, endereços e preferências
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className="space-y-2 text-sm">
								<li className="flex items-center gap-2">
									<CheckCircle className="h-4 w-4 text-green-500" /> Dados pessoais com validação
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle className="h-4 w-4 text-green-500" /> Múltiplos endereços e contatos
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle className="h-4 w-4 text-green-500" /> Preferências e interesses personalizados
								</li>
							</ul>
							<Button className="mt-4 w-full" onClick={() => navigate('/register')}>
								Iniciar Cadastro
							</Button>
						</CardContent>
					</Card>

					<Card className="h-full">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<FileText className="h-5 w-5" /> Criação de Questionários
							</CardTitle>
							<CardDescription>
								Elabore questionários personalizados com diferentes tipos de perguntas
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className="space-y-2 text-sm">
								<li className="flex items-center gap-2">
									<CheckCircle className="h-4 w-4 text-green-500" /> Diferentes tipos de perguntas
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle className="h-4 w-4 text-green-500" /> Alternativas dinâmicas com drag & drop
								</li>
								<li className="flex items-center gap-2">
									<CheckCircle className="h-4 w-4 text-green-500" /> Preview e edição de questionários
								</li>
							</ul>
							<Button
								className="mt-4 w-full"
								onClick={() => navigate('/questionnaire-builder')}
							>
								Criar Questionário
							</Button>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		)
	}

	return (
		<div className="py-8">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="mb-6 text-center"
			>
				<h2 className="text-2xl font-semibold">Seus Formulários</h2>
			</motion.div>

			{forms.length === 0 ? (
				<p className="text-center text-muted-foreground">
					Você ainda não possui formulários.{' '}
					<Button variant="link" onClick={() => navigate('/questionnaire-builder')}>
						Crie o primeiro agora
					</Button>
				</p>
			) : (
				<div className="grid md:grid-cols-3 gap-6">
					{forms.map((form) => (
						<Card
							key={form.id}
							className="cursor-pointer"
							onClick={() => navigate(`/forms/${form.id}`)}
						>
							<CardHeader>
								<CardTitle>{form.title}</CardTitle>
								<CardDescription>
									Criado em {new Date(form.createdAt).toLocaleDateString()}
								</CardDescription>
							</CardHeader>
						</Card>
					))}
				</div>
			)}
		</div>
	)
}
