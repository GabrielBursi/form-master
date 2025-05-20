import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { RootLayout } from './Layout'
import { Home } from './pages/Home'
import { Register } from './pages/Register'
import { QuestionnaireBuilder } from './pages/QuestionnaireBuilder'
import { NotFound } from './pages/NotFound'
import { Login } from './pages/Login'
import { AuthProvider, useAuth } from './context/AuthContext'
import { PropsWithChildren } from 'react'

const ProtectedRoute = ({ children }: PropsWithChildren) => {
	const { user } = useAuth()

	if (!user) {
		return <Navigate to="/login" replace />
	}

	return children
}

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />

					<Route element={<ProtectedRoute><RootLayout /></ProtectedRoute>}>
						<Route path="/" element={<Home />} />
						<Route path="/questionnaire-builder" element={<QuestionnaireBuilder />} />
					</Route>

					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App
