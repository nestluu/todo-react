import { useEffect, useState } from 'react'
import s from './App.module.scss'
import { Todo } from './Todo'

export interface ITodo {
	text: string
	done: boolean
}

function App() {
	const [todos, setTodos] = useState<ITodo[]>([])
	const [text, setText] = useState('')

	useEffect(() => {
		if (localStorage.getItem('todos')) {
			const storedTodos = localStorage.getItem('todos')
			if (storedTodos) {
				setTodos(JSON.parse(storedTodos))
			}
		}
	}, [])

	const createTodo = () => {
		setTodos(prev => {
			const updatedTasks = [...prev, { text: text, done: false }]
			localStorage.setItem('todos', JSON.stringify(updatedTasks))
			return updatedTasks
		})
		setText('')
	}

	const deleteTodo = (i: number) => {
		setTodos(prev => {
			const updatedTasks = prev.filter((_, _i) => _i !== i)
			localStorage.setItem('todos', JSON.stringify(updatedTasks))
			return updatedTasks
		})
	}

	const toggleComplete = (i: number) => {
		setTodos(prev => {
			const updatedTasks = prev.map((todo, idx) =>
				idx === i ? { ...todo, done: !todo.done } : todo
			)
			localStorage.setItem('todos', JSON.stringify(updatedTasks))
			return updatedTasks
		})
	}

	const deleteDoneTask = () => {
		setTodos(prev => {
			const updatedTasks = prev.filter(todo => todo.done !== true)
			localStorage.setItem('todos', JSON.stringify(updatedTasks))
			return updatedTasks
		})
	}

	return (
		<div className={s.app}>
			<h1>Список задач на сегодня</h1>

			<div className={s['tasks-list']}>
				{todos.length ? (
					todos.map((todo, i) => (
						<Todo
							key={i}
							todo={todo}
							i={i}
							deleteTodo={deleteTodo}
							toggleComplete={toggleComplete}
						/>
					))
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
			<button className={s.delete} onClick={deleteDoneTask}>
				Удалить выполненные
			</button>
		</div>
	)
}

export default App
