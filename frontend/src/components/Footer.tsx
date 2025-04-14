export const Footer = () => {
	return (
		<footer className="border-t py-6">
			<div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
				FormMaster - Projeto de estudo baseado no curso JStack ©{' '}
				{new Date().getFullYear()}
			</div>
		</footer>
	)
}
