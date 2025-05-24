import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FileText, User, CheckCircle, Plus, Calendar, Trash2, Edit, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter
} from '@/components/ui/card'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useAuth } from '@/context/AuthContext'
import { FormServices } from '@/services/FormServices'
import { Questionnaire } from '@/types/form'



export const Home = () => {
	const navigate = useNavigate()
	const { user } = useAuth()
	const [forms, setForms] = useState<Questionnaire[]>([])
	const [loading, setLoading] = useState(true)
	const [deleteLoading, setDeleteLoading] = useState<string | null>(null)

	const loadForms = async () => {
		if (!user) {
			setLoading(false)
			return
		}

		try {
			const result = await FormServices.GetAll()

			if (result instanceof Error) {
				toast.error('Erro ao carregar formulários', {
					description: result.message
				})
				setForms([])
				return
			}

			setForms(result.questionnaires || [])
		} catch {
			toast.error('Erro inesperado', {
				description: 'Não foi possível carregar seus formulários.'
			})
			setForms([])
		} finally {
			setLoading(false)
		}
	}

	const handleDeleteForm = async (id: string, title: string) => {
		setDeleteLoading(id)

		try {
			const result = await FormServices.Remove(id)

			if (result instanceof Error) {
				toast.error(result.message, {
					description: result.message
				})
				return
			}

			toast.success('Formulário excluído', {
				description: `"${title}" foi removido com sucesso.`
			})

			setForms(prev => prev.filter(form => form._id !== id))
		} catch {
			toast.error('Erro inesperado', {
				description: 'Não foi possível excluir o formulário.'
			})
		} finally {
			setDeleteLoading(null)
		}
	}

	useEffect(() => {
		loadForms()
	}, [user])

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
								onClick={() => navigate('/forms/new')}
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
				className="flex justify-between items-center mb-6"
			>
				<div>
					<h2 className="text-3xl font-bold">Meus Formulários</h2>
					<p className="text-muted-foreground mt-1">
						Gerencie e visualize seus questionários criados
					</p>
				</div>

				<Button onClick={() => navigate('/forms/new')}>
					<Plus className="h-4 w-4 mr-2" />
					Novo Formulário
				</Button>
			</motion.div>

			{loading ? (
				<div className="flex justify-center items-center py-12">
					<Loader2 className="h-8 w-8 animate-spin" />
					<span className="ml-2">Carregando formulários...</span>
				</div>
			) : forms.length === 0 ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
					className="text-center py-12"
				>
					<FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
					<h3 className="text-xl font-semibold mb-2">Nenhum formulário encontrado</h3>
					<p className="text-muted-foreground mb-6">
						Comece criando seu primeiro formulário para coletar respostas
					</p>
					<Button onClick={() => navigate('/forms/new')}>
						<Plus className="h-4 w-4 mr-2" />
						Criar primeiro formulário
					</Button>
				</motion.div>
			) : (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
					className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					{forms.map((form, index) => (
						<motion.div
							key={form._id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
						>
							<Card className="h-full hover:shadow-lg transition-shadow">
								<CardHeader>
									<CardTitle className="line-clamp-2">
										{form.title}
									</CardTitle>
									<CardDescription className="line-clamp-3">
										{form.description || 'Sem descrição'}
									</CardDescription>
								</CardHeader>

								<CardContent>
									<div className="flex items-center gap-4 text-sm text-muted-foreground">
										<div className="flex items-center gap-1">
											<Calendar className="h-4 w-4" />
											{new Date(form.createdAt).toLocaleDateString('pt-BR')}
										</div>
										<div className="flex items-center gap-1">
											<FileText className="h-4 w-4" />
											{form.questions?.length || 0} perguntas
										</div>
									</div>
								</CardContent>

								<CardFooter className="flex justify-between">
									<div className="flex gap-2">
										<Button
											variant="outline"
											size="sm"
											onClick={() => navigate(`/forms/${form._id}/edit`)}
										>
											<Edit className="h-4 w-4 mr-1" />
											Editar
										</Button>

										<AlertDialog>
											<AlertDialogTrigger asChild>
												<Button
													variant="outline"
													size="sm"
													disabled={deleteLoading === form._id}
												>
													{deleteLoading === form._id ? (
														<Loader2 className="h-4 w-4 animate-spin" />
													) : (
														<Trash2 className="h-4 w-4 mr-1" />
													)}
													Excluir
												</Button>
											</AlertDialogTrigger>
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
													<AlertDialogDescription>
														Tem certeza que deseja excluir o formulário "{form.title}"?
														Esta ação não pode ser desfeita.
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel>Cancelar</AlertDialogCancel>
													<AlertDialogAction
														onClick={() => handleDeleteForm(form._id, form.title)}
														className="bg-destructive hover:bg-destructive/90"
													>
														Excluir
													</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										</AlertDialog>
									</div>

									<Button
										size="sm"
										onClick={() => navigate(`/forms/${form._id}`)}
									>
										Ver Detalhes
									</Button>
								</CardFooter>
							</Card>
						</motion.div>
					))}
				</motion.div>
			)}
		</div>
	)
}
