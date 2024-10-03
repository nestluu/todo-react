import s from './App.module.scss'

export const Todo = ({ todo, i, deleteTodo, toggleComplete }) => {
	return (
		<div className={!!todo.done ? `${s.todo} ${s.complete}` : `${s.todo}`}>
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
