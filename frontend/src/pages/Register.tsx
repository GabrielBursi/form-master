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

export const Register = () => {
	const [showPassword, setShowPassword] = useState(false)

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
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="phone">Telefone</Label>
								<div className="relative">
									<Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
									<Input
										id="phone"
										placeholder="(00) 00000-0000"
										className="pl-10"
									/>
								</div>
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
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="profession">Profissão</Label>
								<Select>
									<SelectTrigger className="w-full" id="profession">
										<SelectValue placeholder="Selecione sua profissão" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="estudante">Estudante</SelectItem>
										<SelectItem value="professor">Professor</SelectItem>
										<SelectItem value="pesquisador">Pesquisador</SelectItem>
										<SelectItem value="profissional">Profissional</SelectItem>
										<SelectItem value="outro">Outro</SelectItem>
									</SelectContent>
								</Select>
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
									/>
								</div>
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex flex-col space-y-4">
						<Button type="submit" className="w-full">
							Criar conta
						</Button>
						<div className="text-center text-sm">
							Já possui uma conta?{' '}
							<Link to="/login" className="text-primary hover:underline">
								Entrar
							</Link>
						</div>
					</CardFooter>
				</Card>
			</motion.div>
		</div>
	)
}
