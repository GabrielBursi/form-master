import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'

export const NotFound = () => {
	const navigate = useNavigate()

	return (
		<div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
			<h1 className="text-6xl font-bold mb-4">404</h1>
			<h2 className="text-2xl font-semibold mb-6">Página não encontrada</h2>
			<p className="text-muted-foreground mb-8 max-w-md">
				A página que você está procurando não existe ou foi removida.
			</p>
			<Button onClick={() => navigate('/')}>Voltar para Home</Button>
		</div>
	)
}
