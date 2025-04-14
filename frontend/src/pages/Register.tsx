import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, User, Mail, LockKeyhole, Phone } from 'lucide-react'
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../components/ui/select'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const registerSchema = z
	.object({
		name: z
			.string()
			.min(3, 'Nome deve ter pelo menos 3 caracteres')
			.max(100, 'Nome muito longo')
			.transform((value) => {
				return value
					.trim()
					.split(' ')
					.map(
						(word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
					)
					.join(' ')
			}),
		phone: z
			.string()
			.min(14, 'Telefone inválido')
			.max(15, 'Telefone inválido')
			.regex(
				/^\(\d{2}\)\s\d{5}-\d{4}$/,
				'Formato inválido. Use (00) 00000-0000'
			),
		email: z
			.string()
			.min(1, 'Email é obrigatório')
			.email('Formato de email inválido'),
		profession: z.string().min(1, 'Selecione uma profissão'),
		password: z
			.string()
			.min(8, 'Senha deve ter pelo menos 8 caracteres')
			.regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
			.regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
			.regex(/\d/, 'Senha deve conter pelo menos um número')
			.regex(
				/[^A-Za-z0-9]/,
				'Senha deve conter pelo menos um caractere especial'
			),
		confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'As senhas não coincidem',
		path: ['confirmPassword'],
	})

type RegisterFormValues = z.infer<typeof registerSchema>

export const Register = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			phone: '',
			email: '',
			profession: '',
			password: '',
			confirmPassword: '',
		},
		mode: 'onChange',
	})

	const formatPhone = (value: string) => {
		if (!value) return value

		const phoneNumber = value.replace(/[^\d]/g, '')

		const phoneNumberLimited = phoneNumber.substring(0, 11)

		if (phoneNumberLimited.length <= 2) {
			return `(${phoneNumberLimited}`
		}
		if (phoneNumberLimited.length <= 7) {
			return `(${phoneNumberLimited.substring(0, 2)}) ${phoneNumberLimited.substring(2)}`
		}
		return `(${phoneNumberLimited.substring(0, 2)}) ${phoneNumberLimited.substring(2, 7)}-${phoneNumberLimited.substring(7)}`
	}

	const onSubmit = async (data: RegisterFormValues) => {
		setIsSubmitting(true)

		try {
			console.log('Dados de registro:', data)
		} catch (error) {
			console.error('Erro no registro:', error)
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
			>
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl text-center">
							Crie sua conta
						</CardTitle>
						<CardDescription className="text-center">
							Preencha seus dados básicos para criar sua conta no FormMaster
						</CardDescription>
					</CardHeader>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="name">Nome completo</Label>
									<div className="relative">
										<User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
										<Input
											id="name"
											placeholder="Seu nome completo"
											className="pl-10"
											{...register('name')}
										/>
									</div>
									{errors.name && (
										<p className="text-sm text-red-500">
											{errors.name.message}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="phone">Telefone</Label>
									<div className="relative">
										<Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
										<Controller
											name="phone"
											control={control}
											render={({ field }) => (
												<Input
													id="phone"
													placeholder="(00) 00000-0000"
													className="pl-10"
													onChange={(e) => {
														field.onChange(formatPhone(e.target.value))
													}}
													value={field.value}
												/>
											)}
										/>
									</div>
									{errors.phone && (
										<p className="text-sm text-red-500">
											{errors.phone.message}
										</p>
									)}
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<div className="relative">
										<Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
										<Input
											id="email"
											type="email"
											placeholder="nome@exemplo.com"
											className="pl-10"
											{...register('email')}
										/>
									</div>
									{errors.email && (
										<p className="text-sm text-red-500">
											{errors.email.message}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="profession">Profissão</Label>
									<Controller
										name="profession"
										control={control}
										render={({ field }) => (
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger className="w-full" id="profession">
													<SelectValue placeholder="Selecione sua profissão" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="estudante">Estudante</SelectItem>
													<SelectItem value="professor">Professor</SelectItem>
													<SelectItem value="pesquisador">
														Pesquisador
													</SelectItem>
													<SelectItem value="profissional">
														Profissional
													</SelectItem>
													<SelectItem value="outro">Outro</SelectItem>
												</SelectContent>
											</Select>
										)}
									/>
									{errors.profession && (
										<p className="text-sm text-red-500">
											{errors.profession.message}
										</p>
									)}
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="password">Senha</Label>
									<div className="relative">
										<LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
										<Input
											id="password"
											type={showPassword ? 'text' : 'password'}
											placeholder="Crie uma senha segura"
											className="pl-10 pr-10"
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
										</Button>
									</div>
									{errors.password && (
										<p className="text-sm text-red-500">
											{errors.password.message}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="confirmPassword">Confirme a senha</Label>
									<div className="relative">
										<LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
										<Input
											id="confirmPassword"
											type={showPassword ? 'text' : 'password'}
											placeholder="Confirme sua senha"
											className="pl-10"
											{...register('confirmPassword')}
										/>
									</div>
									{errors.confirmPassword && (
										<p className="text-sm text-red-500">
											{errors.confirmPassword.message}
										</p>
									)}
								</div>
							</div>
						</CardContent>
						<CardFooter className="flex flex-col space-y-4">
							<Button type="submit" className="w-full" disabled={isSubmitting}>
								{isSubmitting ? 'Criando conta...' : 'Criar conta'}
							</Button>
							<div className="text-center text-sm">
								Já possui uma conta?{' '}
								<Link to="/login" className="text-primary hover:underline">
									Entrar
								</Link>
							</div>
						</CardFooter>
					</form>
				</Card>
			</motion.div>
		</div>
	)
}
