import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { UserProvider } from "./context/UserContext";
import { GlobalProvider } from "./context/GlobalContext";
import "./config/axiosConfig";

ReactDOM.render(
	<React.StrictMode>
		<GlobalProvider>
			<UserProvider>
				<App />
			</UserProvider>
		</GlobalProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
