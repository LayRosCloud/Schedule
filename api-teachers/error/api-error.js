const statusCode = {
    badBody: 400,
    auth: 401,
    forbidden: 403,
    notFound: 404,
    internal: 500
}

const ERROR_MESSAGE_BAD_BODY = 'Ошибка! Неправильное тело запроса';

class ApiError extends Error{
    constructor(status, message) {
        super(message);
        this.status = status;
    }

    static badRequest(message){
        return new ApiError(statusCode.notFound, message)
    }

    static internal(message){
        return new ApiError(statusCode.internal, message)
    }

    static forbidden(message){
        return new ApiError(statusCode.forbidden, message)
    }
    static auth(message){
        return new ApiError(statusCode.auth, message)
    }
    static badBody(){
        return new ApiError(statusCode.badBody, ERROR_MESSAGE_BAD_BODY)
    }
}
module.exports = ApiError