import { useState } from "react";
import {v4 as randomUUID} from "uuid"
import "./App.css";

import Form from "./components/Input-section-form/form.jsx";
import ThemeButton from "./components/Theme-button/theme-btn";
import TodoContainer from "./components/Todos/todo-container";

let initialTodos = [];
let initialTodoId = +localStorage.getItem("todoId") || 1;
if (localStorage.getItem("todos")) {
	initialTodos = JSON.parse(localStorage.getItem("todos"));
}
function App() {
	const [todos, setTodos] = useState(initialTodos);
	const [view, setView] = useState("all");

	localStorage.setItem("todos", JSON.stringify(todos));

	const handleAddTodo = (todoText) => {
		setTodos([
			...todos,
			{
				text: todoText,
				completed: false,
				id: randomUUID(),
			},
		]);
		if (view !== "all") setView("active");
	};

	const handleTodoStatus = (todoId) => {
		setTodos(
			todos.map((todo) => {
				if (todo.id !== todoId) return todo;
				return { ...todo, completed: !todo.completed };
			})
		);
	};

	const handleSingleTodoDelete = (todoId) => {
		setTodos(
			todos.filter((todo) => {
				if (todo.id !== todoId) return true;
			})
		);
	};
	const handleDeleteCompletedTodos = async () => {
		if (view === "active") {
			setView("completed");
			await new Promise((res) =>
				setTimeout(() => {
					res();
				}, 100)
			);
		}
		const confirmDelete = confirm("This will delete all your completed todos. Are you sure?");
		if (!confirmDelete) return;
		setTodos(
			todos.filter((todo) => {
				return !todo.completed;
			})
		);
	};
	return (
		<>
			<section className="input-section" aria-label="Todo input section">
				<div className="input-section__wrapper">
					<div className="input-section__control-area">
						<h1 className="input-section__heading">TODO</h1>
						<ThemeButton />
					</div>
					<Form addTodo={handleAddTodo} />
				</div>
			</section>
			<section className="todo-section" aria-label="Todo section for todos">
				<TodoContainer
					todos={todos}
					handleSingleTodoDelete={handleSingleTodoDelete}
					deleteCompletedTodos={handleDeleteCompletedTodos}
					handleTodoStatus={handleTodoStatus}
					view={view}
					setView={setView}
				/>
			</section>
		</>
	);
}

export default App;
