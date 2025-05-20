import { User, AuthResponse } from "@/types/auth"
import { ReactNode, useState, useEffect, useContext, createContext } from "react"

interface AuthContextProps {
	user: User | null
	login: (data: AuthResponse) => void
	logout: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const stored = localStorage.getItem('user')
		if (stored) setUser(JSON.parse(stored))
	}, [])

	const login = (data: AuthResponse) => {
		localStorage.setItem('token', data.token)
		localStorage.setItem('user', JSON.stringify(data.user))
		setUser(data.user)
	}

	const logout = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('user')
		setUser(null)
	}

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) throw new Error('useAuth must be used within AuthProvider')
	return context
}
