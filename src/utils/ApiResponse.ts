class ApiResponse {
    statuscode: number;
    message: string;
    success: boolean;
    data: any;

    constructor(
        statuscode: number, 
        message: string, 
        data: any = {}, 
        success: boolean = true
    ) {
        this.statuscode = statuscode;
        this.message = message;
        this.success = success;
        this.data = data;
    }
}

export default ApiResponse;
