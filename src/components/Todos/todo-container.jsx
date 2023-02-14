import { useState } from "react";
import "./todo-container.css";

import TodoItem from "./Todo-item/todo-item";

function TodoContainer({
	todos,
	handleSingleTodoDelete,
	deleteCompletedTodos,
	handleTodoStatus,
	view,
	setView,
}) {
	let todosList = null;

	todosList = todos.filter((todo) => {
		if (view === "completed") return todo.completed;
		if (view === "active") return !todo.completed;
		return true; // i.e. include all todo
	});

	const handleViewChange = (newView) => {
		if (view === newView) return;
		setView(newView);
	};

	const remainingTodos = todosList.filter((todo) => !todo.completed);
	return (
		<div className="todo-container">
			<ul className="todo-list">
				{todosList.map((todo) => {
					return (
						<TodoItem
							todo={todo}
							deleteTodo={handleSingleTodoDelete}
							changeTodoStatus={handleTodoStatus}
							key={todo.id}
						/>
					);
				})}
			</ul>
			<div className="todo-action-container">
				<p className="todo-remaining-text">
					{remainingTodos.length === 1 ? "1 item" : `${remainingTodos.length} items`} left
				</p>
				<div className="todo-action-container__filter-action">
					<button
						className="todo-action-container__filter-btn"
						data-active={view === "all"}
						title="Show all todos"
						onClick={() => handleViewChange("all")}
					>
						All
					</button>
					<button
						className="todo-action-container__filter-btn"
						data-active={view === "active"}
						title="Show active todos"
						onClick={() => handleViewChange("active")}
					>
						Active
					</button>
					<button
						className="todo-action-container__filter-btn"
						data-active={view === "completed"}
						title="Show completed todos"
						onClick={() => handleViewChange("completed")}
					>
						Completed
					</button>
				</div>
				<button
					className="todo-action-container__btn"
					title="Delete all completed todos"
					onClick={deleteCompletedTodos}
				>
					Clear Completed
				</button>
			</div>
		</div>
	);
}
export default TodoContainer;
