import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import { Button } from '../components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const loginSchema = z.object({
	email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
	password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export const Login = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
	})

	const onSubmit = async (data: LoginFormValues) => {
		try {
			setIsSubmitting(true)
			console.log('Dados de login:', data)
		} catch (error) {
			console.error('Erro no login:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className="flex items-center justify-center min-h-[80vh]">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-md"
			>
				<Card>
					<CardHeader className="space-y-1">
						<CardTitle className="text-2xl text-center">
							Bem-vindo ao FormMaster
						</CardTitle>
						<CardDescription className="text-center">
							Entre com suas credenciais para continuar
						</CardDescription>
					</CardHeader>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<div className="relative">
									<Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
									<Input
										id="email"
										placeholder="nome@exemplo.com"
										type="email"
										className="pl-10"
										{...register('email')}
									/>
								</div>
								{errors.email && (
									<p className="text-sm text-red-500 mt-1">
										{errors.email.message}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<Label htmlFor="password">Senha</Label>
								</div>
								<div className="relative">
									<LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
									<Input
										id="password"
										type={showPassword ? 'text' : 'password'}
										className="pl-10 pr-10"
										placeholder="*********"
										{...register('password')}
									/>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										className="absolute right-0 top-0 h-full px-3"
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? (
											<EyeOff className="h-4 w-4" />
										) : (
											<Eye className="h-4 w-4" />
										)}
										<span className="sr-only">
											{showPassword ? 'Esconder senha' : 'Mostrar senha'}
										</span>
									</Button>
								</div>
								{errors.password && (
									<p className="text-sm text-red-500 mt-1">
										{errors.password.message}
									</p>
								)}
							</div>
						</CardContent>

						<CardFooter className="flex flex-col space-y-4">
							<Button className="w-full" type="submit" disabled={isSubmitting}>
								{isSubmitting ? 'Entrando...' : 'Entrar'}
							</Button>
							<div className="text-center text-sm">
								Não tem uma conta?{' '}
								<Link to="/register" className="text-primary hover:underline">
									Cadastre-se
								</Link>
							</div>
						</CardFooter>
					</form>
				</Card>
			</motion.div>
		</div>
	)
}
