class ApiError extends Error {
    statuscode: number;
    success: boolean;
    data: any;

    constructor(statuscode: number, message: string, data: any = {}, success: boolean = false) {
        super(message);
        this.statuscode = statuscode;
        this.success = success;
        this.data = data;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError;
