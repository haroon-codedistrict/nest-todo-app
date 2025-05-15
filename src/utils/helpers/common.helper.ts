function env(key: string, defaultValue: string | number = ''): string | number {
    return process.env[key] || defaultValue;
}

function apiSuccessResponse(
    statusCode: number,
    message: string,
    data: null | object = null,
    otherKeys: object = {},
): object {
    return {
        statusCode,
        message,
        data,
        ...otherKeys
    };
}

function apiErrorResponse(
    statusCode: number,
    message: string,
    error: null | string | object = '',
    otherKeys: object = {},
    data: null | object = null,
): object {
    return {
        statusCode,
        message,
        error,
        data,
        ...otherKeys,
    };
}

export { env, apiSuccessResponse, apiErrorResponse };
