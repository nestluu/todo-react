import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import LoginPage from './pages/LoginPage'

export const App: React.FC = () => {
	return (
		<Routes>
			<Route path='/login' element={<LoginPage />} />
			<Route path='/home' element={<HomePage />} />
		</Routes>
	)
}

export default App
