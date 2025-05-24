import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { RootLayout } from './Layout'
import { Home } from './pages/Home'
import { Register } from './pages/Register'
import { QuestionnaireBuilder } from './pages/QuestionnaireBuilder'
import { NotFound } from './pages/NotFound'
import { Login } from './pages/Login'
import { AuthProvider, useAuth } from './context/AuthContext'
import { FormDetailPage } from './pages/FormDetails'

const ProtectedRoute = () => {
	const { user } = useAuth()

	if (!user) {
		return <Navigate to="/login" replace />
	}

	return <Outlet />
}

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<RootLayout />}>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/" element={<Home />} />
						<Route element={<ProtectedRoute />}>
							<Route path="/forms/new" element={<QuestionnaireBuilder />} />
							<Route path="/forms/:id/edit" element={<QuestionnaireBuilder />} />
							<Route path="/forms/:id" element={<FormDetailPage />} />
						</Route>
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App
