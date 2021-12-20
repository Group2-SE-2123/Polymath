import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RequireAuth from "./auth/RequireAuth";

import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Quiz from "./components/Quiz";
import Sample from "./components/Sample";
import NotFound from "./components/NotFound";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Landing />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/register" element={<Register />}></Route>
				<Route
					path="/dashboard"
					element={
						<RequireAuth>
							<Dashboard />
						</RequireAuth>
					}
				></Route>
				<Route path="/quiz" element={<Quiz />}></Route>
				<Route path="*" element={<NotFound />} />
				<Route path="/sample" element={<Sample />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
