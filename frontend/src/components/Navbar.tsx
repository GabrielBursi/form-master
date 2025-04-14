import { Link, useLocation } from 'react-router-dom'
import { Button } from './ui/button'

export const Navbar = () => {
	const location = useLocation()

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
						<Link to="login">
							<Button size="sm">Entrar</Button>
						</Link>
					</div>
				)}
			</div>
		</header>
	)
}
