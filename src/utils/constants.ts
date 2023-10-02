export const HTTP_SEVERITY = {
    SUCCESS: "success",
    FAILURE: "failure",
}

export const HTTP_STATUS = {
    SUCCESS: "success",
    FAILURE: "failure",
    SERVER_ERROR: "internal server error"
}

export const HTTP_STATUS_CODE = {
    SUCCESS: 200,
    FAILURE: 400,
    SERVER_ERROR: 500
}


export interface IAPIResponse {
    data?: any,
    status?: string,
    code?: number,
    message?: string
}

export interface IResponsePayload {
    data: any,
    message: any
}

export interface IServerResponsePayload {
    message: string
}

export class HTTP_RESPONSE {
    constructor() {

    }
    SUCCESS(payload: IResponsePayload): IAPIResponse {
        const response = {
            status: HTTP_STATUS.SUCCESS,
            code: HTTP_STATUS_CODE.SUCCESS,
            ...payload
        }
        return response;
    }
    FAILURE_RESPONSE(payload: IResponsePayload): IAPIResponse {
        const response = {
            status: HTTP_STATUS.SUCCESS,
            code: HTTP_STATUS_CODE.FAILURE,
            ...payload
        }
        return response;
    }

    SERVER_ERROR(payload: IServerResponsePayload): IAPIResponse {
        const response = {
            status: HTTP_STATUS.SERVER_ERROR,
            code: HTTP_STATUS_CODE.SERVER_ERROR,
            ...payload
        }
        return response;
    }
}