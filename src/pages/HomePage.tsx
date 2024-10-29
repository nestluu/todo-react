import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import {
	addTodo,
	clearTrash,
	deleteDoneTasks,
	setActiveTab,
} from '../store/todos/todoSlice'
import { Todo } from '../Todo'
import s from './../App.module.scss'

export const HomePage: React.FC = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const todos = useAppSelector(state => state.todos.todos)
	const activeTab = useAppSelector(state => state.todos.activeTab)

	const [text, setText] = useState('')

	useEffect(() => {
		if (localStorage.getItem('loggedIn') === 'false') {
			navigate('/login')
		}
	}, [navigate])

	const createTodo = () => {
		if (text.trim()) {
			dispatch(addTodo(text))
			setText('')
		}
	}

	const handleLogout = () => {
		localStorage.setItem('loggedIn', 'false')
		navigate('/login')
	}

	const filteredTodos = todos.filter(todo => {
		switch (activeTab) {
			case 'current':
				return !todo.done && !todo.trash
			case 'done':
				return todo.done && !todo.trash
			case 'trash':
				return todo.trash
			case 'all':
			default:
				return !todo.trash
		}
	})

	return (
		<div className={s.app}>
			<h1>Список задач на сегодня</h1>

			<ul className={s.tabs}>
				<li
					onClick={() => dispatch(setActiveTab('current'))}
					className={activeTab === 'current' ? s.active : ''}
				>
					Текущие дела: {todos.filter(todo => !todo.done && !todo.trash).length}
				</li>
				<li
					onClick={() => dispatch(setActiveTab('all'))}
					className={activeTab === 'all' ? s.active : ''}
				>
					Все дела: {todos.filter(todo => !todo.trash).length}
				</li>
				<li
					onClick={() => dispatch(setActiveTab('done'))}
					className={activeTab === 'done' ? s.active : ''}
				>
					Выполненные дела:{' '}
					{todos.filter(todo => todo.done && !todo.trash).length}
				</li>
				<li
					onClick={() => dispatch(setActiveTab('trash'))}
					className={activeTab === 'trash' ? s.active : ''}
				>
					Корзина: {todos.filter(todo => todo.trash).length}
				</li>
			</ul>

			<div className={s['tasks-list']}>
				{filteredTodos.length ? (
					filteredTodos.map((todo, i) => <Todo key={i} todo={todo} i={i} />)
				) : (
					<h2>Список задач пуст</h2>
				)}
			</div>

			<div className={s['add-task']}>
				<p className={s['add-task-title']}>Добавить новую задачу</p>
				<input
					value={text}
					onChange={e => setText(e.target.value)}
					className={s['add-task-input']}
					type='text'
					placeholder='текст задачи'
				/>
				<p className={s['add-task-text']}>
					Что делаем, сколько времени делаем, какой результат получаем
				</p>
				<button className={s['add-task-btn']} onClick={createTodo}>
					Добавить
				</button>
			</div>
			<div className={s.btns}>
				<button
					className={s.delete}
					onClick={() => dispatch(deleteDoneTasks())}
				>
					Удалить выполненные
				</button>
				<button onClick={() => dispatch(clearTrash())}>Очистить корзину</button>

				<button onClick={handleLogout}>Выйти</button>
			</div>
		</div>
	)
}
