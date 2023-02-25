import { useState } from "react";
import "./form.css";

function Form({ addTodo }) {
	const [todoText, setTodoText] = useState("");

	const handleFormSubmit = (e) => {
		e.preventDefault();
		if (!todoText.trim()) return;
		addTodo(todoText.trim());
		setTodoText("");
	};

	return (
		<form className="input-form" onSubmit={handleFormSubmit}>
			<input
				type="text"
				className="todo-input"
				placeholder="Create a new todo..."
				autoComplete="off"
				value={todoText}
				onChange={(e) => {
					setTodoText(e.target.value);
				}}
			/>
			<button type="submit" className="todo-submit-btn" title="Add todo in list">
				📌
			</button>
		</form>
	);
}

export default Form;
