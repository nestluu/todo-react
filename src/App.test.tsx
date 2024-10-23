import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'
import s from './App.module.scss'

describe('App Component', () => {
	beforeEach(() => {
		localStorage.clear()
	})
	test('создание новой задачи', () => {
		render(<App />)

		const input = screen.getByPlaceholderText('текст задачи')
		fireEvent.change(input, { target: { value: 'Моя задача' } })
		const addButton = screen.getByRole('button', { name: /Добавить/i })
		fireEvent.click(addButton)

		const task = screen.getByText(/Моя задача/i)
		expect(task).toBeInTheDocument()
	})

	test('удаление задачи', () => {
		render(<App />)

		const input = screen.getByPlaceholderText('текст задачи')
		fireEvent.change(input, { target: { value: 'Задача для удаления' } })
		const addButton = screen.getByRole('button', { name: /Добавить/i })
		fireEvent.click(addButton)

		const task = screen.getByText(/Задача для удаления/i)
		expect(task).toBeInTheDocument()

		// Находим кнопку удаления по alt-тексту изображения
		const deleteButton = screen.getAllByAltText('delete')[0] // Получаем первую иконку удаления
		fireEvent.click(deleteButton)

		expect(task).not.toBeInTheDocument()
	})

	test('отметка задачи как выполненной', () => {
		render(<App />)

		// Создаем новую задачу
		const input = screen.getByPlaceholderText(/текст задачи/i)
		fireEvent.change(input, { target: { value: 'Задача для выполнения' } })
		fireEvent.click(screen.getByText('Добавить'))

		// Отмечаем задачу как выполненную
		const task = screen.getByText(/задача для выполнения/i)
		const completeButton = screen.getByAltText(/complete/i)
		fireEvent.click(completeButton)

		// Проверяем, что задача отмечена как выполненная
		expect(task.parentElement).toHaveClass(s.complete)
	})

	test('удаление выполненных задач', () => {
		render(<App />)

		const input = screen.getByPlaceholderText('текст задачи')
		fireEvent.change(input, { target: { value: 'Задача для удаления' } })
		const addButton = screen.getByRole('button', { name: /Добавить/i })
		fireEvent.click(addButton)

		// Отмечаем задачу как выполненную
		const completeButton = screen.getByAltText('complete') // Иконка завершения задачи
		fireEvent.click(completeButton)

		// Удаляем выполненные задачи
		const deleteDoneButton = screen.getByRole('button', {
			name: /Удалить выполненные/i,
		})
		fireEvent.click(deleteDoneButton)

		expect(screen.queryByText(/Задача для удаления/i)).not.toBeInTheDocument()
	})

	test('сохранение и загрузка задач из localStorage', () => {
		const todos = [
			{ text: 'Задача 1', done: false },
			{ text: 'Задача 2', done: true },
		]
		localStorage.setItem('todos', JSON.stringify(todos))

		render(<App />)

		expect(screen.getByText(/Задача 1/i)).toBeInTheDocument()
		expect(screen.getByText(/Задача 2/i)).toBeInTheDocument()
	})
})
