import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITodo } from '../../interfaces/interfaces'

type ActiveTabType = 'current' | 'all' | 'done' | 'trash'

interface TodoState {
	todos: ITodo[]
	activeTab: ActiveTabType
}

const initialState: TodoState = {
	activeTab: 'current',
	todos: JSON.parse(localStorage.getItem('todos') || '[]'),
}

const todoSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		addTodo: (state, action: PayloadAction<string>) => {
			const newTodo: ITodo = {
				text: action.payload,
				done: false,
				trash: false,
				id: Date.now(),
			}
			state.todos.push(newTodo)
			localStorage.setItem('todos', JSON.stringify(state.todos))
		},
		deleteTodo: (state, action: PayloadAction<number>) => {
			state.todos = state.todos.map(todo =>
				todo.id === action.payload ? { ...todo, trash: true } : todo
			)
			localStorage.setItem('todos', JSON.stringify(state.todos))
		},
		clearTrash: state => {
			state.todos = state.todos.filter(todo => !todo.trash)
			localStorage.setItem('todos', JSON.stringify(state.todos))
		},
		toggleComplete: (state, action: PayloadAction<number>) => {
			state.todos = state.todos.map(todo =>
				todo.id === action.payload ? { ...todo, done: !todo.done } : todo
			)
			localStorage.setItem('todos', JSON.stringify(state.todos))
		},
		deleteDoneTasks: state => {
			state.todos = state.todos.filter(todo => !todo.done)
			localStorage.setItem('todos', JSON.stringify(state.todos))
		},
		setActiveTab: (state, action: PayloadAction<ActiveTabType>) => {
			state.activeTab = action.payload
		},
	},
})

export const {
	addTodo,
	deleteTodo,
	toggleComplete,
	deleteDoneTasks,
	setActiveTab,
	clearTrash,
} = todoSlice.actions
export const todoReducer = todoSlice.reducer
