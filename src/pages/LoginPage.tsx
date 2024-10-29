import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './../App.module.scss'

const LoginPage: React.FC = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	const handleLogin = () => {
		if (username === 'admin' && password === 'admin') {
			localStorage.setItem('loggedIn', 'true')
			navigate('/home')
		} else {
			alert('Invalid credentials')
		}
	}

	return (
		<div className={s.login}>
			<h1 className={s.login__title}>
				Чтобы начать пользоваться приложением Todo, введите данные для входа
			</h1>
			<input
				className={s.login__input}
				type='text'
				placeholder='Введите логин'
				value={username}
				onChange={e => setUsername(e.target.value)}
			/>
			<input
				className={s.login__input}
				type='password'
				placeholder='Введите пароль'
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
			<button className={s.login__btn} onClick={handleLogin}>
				Войти
			</button>
		</div>
	)
}

export default LoginPage
