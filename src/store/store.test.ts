import { configureStore } from '@reduxjs/toolkit'
import {
	addTodo,
	deleteDoneTasks,
	deleteTodo,
	todoReducer,
	toggleComplete,
} from '../store/todos/todoSlice'

describe('todoSlice reducer', () => {
	let store: ReturnType<typeof configureStore>

	beforeEach(() => {
		store = configureStore({
			reducer: {
				todos: todoReducer,
			},
		})
	})

	it('should add a new todo', () => {
		store.dispatch(addTodo('New Task'))
		const state = store.getState().todos
		expect(state.todos).toHaveLength(1)
		expect(state.todos[0].text).toBe('New Task')
		expect(state.todos[0].done).toBe(false)
	})

	it('should toggle complete status of a todo', () => {
		store.dispatch(addTodo('Toggle Task'))
		store.dispatch(toggleComplete(0))
		const state = store.getState().todos
		expect(state.todos[0].done).toBe(true)
	})

	it('should move a todo to the trash', () => {
		store.dispatch(addTodo('Task to be deleted'))
		store.dispatch(deleteTodo(0))
		const state = store.getState().todos
		expect(state.todos[0].trash).toBe(true)
	})

	it('should delete all completed tasks', () => {
		store.dispatch(addTodo('First Task'))
		store.dispatch(addTodo('Second Task'))
		store.dispatch(toggleComplete(0)) // Mark first task as completed

		store.dispatch(deleteDoneTasks())
		const state = store.getState().todos
		expect(state.todos).toHaveLength(1)
		expect(state.todos[0].text).toBe('Second Task')
	})
})
