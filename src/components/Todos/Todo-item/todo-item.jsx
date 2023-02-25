import "./todo-item.css";
import iconCross from "./assets/icon-cross.svg";
import iconCheck from "./assets/icon-check.svg";

function TodoItem({ todo, deleteTodo, changeTodoStatus }) {
	const handleChangeTodoStatus = () => {
		changeTodoStatus(todo.id);
	};
	return (
		<div className="todo-item">
			<TodoCheckbox completed={todo.completed} changeStatus={handleChangeTodoStatus} />
			<p className="todo-item__todo-text">{todo.text}</p>
			<div className="remove-btn-container">
				<button
					className="remove-btn-container__btn"
					title="Remove the todo"
					onClick={() => {
						deleteTodo(todo.id);
					}}
				>
					<img src={iconCross} alt="" />
				</button>
			</div>
		</div>
	);
}

function TodoCheckbox({ completed, changeStatus }) {
	const todoLabel = completed ? "Mark todo as incomplete" : "Mark todo as complete";
	return (
		<div className="todo-item__checkbox-container" data-checked={completed}>
			<label className="todo-item-checkbox-label" title={todoLabel}>
				<img src={iconCheck} className="todo-item-checkbox-label__img" alt="" />
				<input
					type="checkbox"
					className="todo-item-checkbox"
					aria-label={todoLabel}
					value="todo-done"
					checked={completed}
					onChange={changeStatus}
				/>
			</label>
		</div>
	);
}

export default TodoItem;
