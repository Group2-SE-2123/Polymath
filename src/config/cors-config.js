const whitelist = process.env.WHITELISTED_DOMAINS ? process.env.WHITELISTED_DOMAINS.split(",") : [];
const isProduction = process.env.NODE_ENV === "production";

const corsOptions = !isProduction
	? {
			origin(origin, callback) {
				if (!origin || whitelist.indexOf(origin) !== -1) {
					callback(null, true);
				} else {
					callback(new Error("Not allowed by CORS"));
				}
			},

			credentials: true,
	  }
	: {
			origin: "*",
			credentials: true,
	  };

export default corsOptions;
