class HttpError extends Error {
	code: any;
	constructor(message: any, errorCode: any) {
		super(message); // Add a "message" property
		this.code = errorCode; // Adds a "code" property
	}
}

export default HttpError;
