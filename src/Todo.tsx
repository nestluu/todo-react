import { ITodo } from './App'
import s from './App.module.scss'

interface Props {
	todo: ITodo
	i: number
	deleteTodo: (i: number) => void
	toggleComplete: (i: number) => void
}

export const Todo: React.FC<Props> = ({
	todo,
	i,
	deleteTodo,
	toggleComplete,
}) => {
	const done = !!todo.done
	return (
		<div
			// style={{ backgroundColor: todo.done ? 'rgb(235, 235, 235)' : 'white' }}
			className={`${s.todo} ${done ? s.complete : ''}`}
		>
			<div className='div'>{`${i + 1}. ${todo.text}`}</div>
			<div className={s.right}>
				<img
					onClick={() => toggleComplete(i)}
					width='20px'
					src='./complite.png'
					alt='complete'
				/>
				<img
					onClick={() => deleteTodo(i)}
					width='20px'
					src='./delete.png'
					alt='delete'
				/>
			</div>
		</div>
	)
}
