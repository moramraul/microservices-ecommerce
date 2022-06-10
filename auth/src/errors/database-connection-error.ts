import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    reason = "Error connecting to database";
    statusCode = 500
    constructor() {
    super("Error connecting to DB");

    // Only becouse we are extending a built in class (Error)
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors() {
        return [
            {
                message: this.reason
            }
        ]
    }
}

