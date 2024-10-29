import s from './App.module.scss'
import { useAppDispatch } from './hooks/redux'
import { ITodo } from './interfaces/interfaces'
import { deleteTodo, toggleComplete } from './store/todos/todoSlice'

interface Props {
	todo: ITodo
	i: number
}

export const Todo: React.FC<Props> = ({ todo, i }) => {
	const dispatch = useAppDispatch()
	const done = !!todo.done

	return (
		<div className={`${s.todo} ${done ? s.complete : ''}`}>
			<div className='div'>{`${i + 1}. ${todo.text}`}</div>
			<div className={s.right}>
				<img
					onClick={() => dispatch(toggleComplete(todo.id))}
					width='20px'
					src='./complite.png'
					alt='complete'
				/>
				<img
					onClick={() => dispatch(deleteTodo(todo.id))}
					width='20px'
					src='./delete.png'
					alt='delete'
				/>
			</div>
		</div>
	)
}
