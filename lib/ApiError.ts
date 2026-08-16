export class ApiError extends Error {
    statusCode: number;
    code: string;

    constructor(
        message: string,
        statusCode = 400,
        code = "ERROR"
    ) {
        super(message);

        this.name = "ApiError";
        this.statusCode = statusCode;
        this.code = code;
    }
}