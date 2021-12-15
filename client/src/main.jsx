import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { QueryClientProvider } from "react-query";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";
import { ReactQueryDevtools } from "react-query/devtools";
import App from "./App";

import { UserProvider } from "./context/UserContext";
import { GlobalProvider } from "./context/GlobalContext";
import queryClient from "./config/queryClient";
import "./config/axiosConfig";

const localStoragePersistor = createWebStoragePersistor({ storage: window.localStorage });

persistQueryClient({
	queryClient,
	persistor: localStoragePersistor,
});

ReactDOM.render(
	<React.StrictMode>
		<GlobalProvider>
			<UserProvider>
				<QueryClientProvider client={queryClient}>
					<ReactQueryDevtools initialIsOpen={false} />
					<App />
				</QueryClientProvider>
			</UserProvider>
		</GlobalProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
