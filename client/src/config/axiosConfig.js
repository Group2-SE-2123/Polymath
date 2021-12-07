import axios from "axios";

const isDevelopment = import.meta.env.VITE_APP_ENV === "development";
const host = isDevelopment ? import.meta.env.VITE_APP_API_ENDPOINT : "";

const axiosConfig = (() => {
	axios.defaults.baseURL = host;
})();

export default axiosConfig;
