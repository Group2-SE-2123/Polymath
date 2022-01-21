import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RequireAuth from "./auth/RequireAuth";
import RequireDetails from "./auth/RequireDetails";

import Landing from "./components/Landing";
import Login from "./components/Login";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Quiz from "./components/Quiz";
import ActiveQuiz from "./components/ActiveQuiz";
import NotFound from "./components/NotFound";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Landing />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/signin" element={<SignIn />}></Route>
				<Route path="/register" element={<Register />}></Route>
				<Route
					path="/dashboard"
					element={
						<RequireAuth>
							<Dashboard />
						</RequireAuth>
					}
				></Route>
				<Route
					path="/quiz"
					element={
						<RequireDetails>
							<Quiz />
						</RequireDetails>
					}
				></Route>
				<Route
					path="/active-quiz/:quizId"
					element={
						<RequireAuth>
							<ActiveQuiz />
						</RequireAuth>
					}
				></Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
