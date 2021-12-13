import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";
import { ReactQueryDevtools } from "react-query/devtools";
import App from "./App";

import { UserProvider } from "./context/UserContext";
import { GlobalProvider } from "./context/GlobalContext";
import "./config/axiosConfig";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			cacheTime: 1000 * 60 * 60 * 24,
			refetchOnWindowFocus: false,
			refetchOnmount: false,
			refetchOnReconnect: false,
			retry: false,
			staleTime: 1000 * 60 * 60 * 24,
		},
	},
});

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
