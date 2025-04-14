import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RootLayout } from './Layout'
import { Home } from './pages/Home'
import { Register } from './pages/Register'
import { QuestionnaireBuilder } from './pages/QuestionnaireBuilder'
import { NotFound } from './pages/NotFound'
import { Login } from './pages/Login'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<RootLayout />}>
					<Route index element={<Home />} />
					<Route path="register" element={<Register />} />
					<Route path="login" element={<Login />} />
					<Route
						path="questionnaire-builder"
						element={<QuestionnaireBuilder />}
					/>
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
