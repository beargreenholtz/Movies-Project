declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly DB_CONNECTION_STRING: string;
			readonly PORT: string;
		}
	}
}

export {};
