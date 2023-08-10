const statusCode = {
    badBody:400,
    notFound: 404,
    internal: 500
}
const badBody = 'Ошибка! Неправильно тело запроса!'
module.exports = class ApiException extends Error{
    constructor(status, message) {
        super(message)
        this.status = status;
    }

    static badBody(){
        return new ApiException(statusCode.notFound, badBody)
    }

    static notFound(message){
        return new ApiException(statusCode.notFound, message)
    }

    static internal(message){
        return new ApiException(statusCode.internal, message)
    }
}