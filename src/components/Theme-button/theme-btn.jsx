import { useState } from "react";

import "./theme-btn.css";
import iconMoon from "./assets/icon-moon.svg";
import iconSun from "./assets/icon-sun.svg";

const app = document.documentElement;
let defaultTheme;
const mediaMatch = window.matchMedia("(prefers-media-scheme: dark)");
const localTheme = localStorage.getItem("theme");

if (localTheme) {
	defaultTheme = localTheme;
} else if (mediaMatch.matches) {
	defaultTheme = "dark";
} else {
	defaultTheme = "light";
}

if (defaultTheme === "dark") app.classList.add("theme_dark");

function ThemeButton() {
	const [theme, setTheme] = useState(defaultTheme);

	const changeTheme = () => {
		if (theme == "light") {
			setTheme("dark");
			app.classList.add("theme_dark");
			localStorage.setItem("theme", "dark");
			return;
		}
		setTheme("light");
		app.classList.remove("theme_dark");
		localStorage.setItem("theme", "light");
	};

	return (
		<button className="theme-btn" title="Change app's theme" onClick={changeTheme}>
			<img src={theme == "light" ? iconMoon : iconSun} alt="" className="theme-btn__img" />
		</button>
	);
}
export default ThemeButton;
