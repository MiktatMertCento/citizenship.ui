type ErrorDto = {
    errors: string[],
    isShow: boolean
}

type Response<T> = {
    data?: T,
    statusCode: number,
    error: ErrorDto,
    
}

export type {Response, ErrorDto}