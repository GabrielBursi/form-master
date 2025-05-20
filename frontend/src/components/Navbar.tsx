import { Link, useLocation } from 'react-router-dom'
import { Button } from './ui/button'
import { useAuth } from '@/context/AuthContext'

export const Navbar = () => {
	const location = useLocation()
	const { user, logout } = useAuth()

	const isAuthPage =
		location.pathname.startsWith('/login') ||
		location.pathname.startsWith('/register')

	return (
		<header className="border-b">
			<div className="container mx-auto flex items-center justify-between h-16 px-4">
				<Link to="/" className="font-bold text-xl">
					FormMaster
				</Link>

				{!isAuthPage && (
					<div className="flex items-center gap-4">
						{user ? (
							<>
								<span className="text-sm">Olá, {user.name}</span>
								<Button size="sm" variant="outline" onClick={logout}>
									Logout
								</Button>
							</>
						) : (
							<>
								<Link to="/login">
									<Button size="sm">Entrar</Button>
								</Link>
								<Link to="/register">
									<Button size="sm" variant="outline">Cadastrar</Button>
								</Link>
							</>
						)}
					</div>
				)}
			</div>
		</header>
	)
}
