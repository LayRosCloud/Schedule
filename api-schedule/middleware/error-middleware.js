const ApiException = require("../exceptions/ApiException");
module.exports = function (error, req, res, next){
    if(error instanceof ApiException){
        return res.status(error.status).json(
            {
                status:error.status,
                message:error.message
            })
    }

    return res.status(500).json(
        {
            status:500,
            message:error.message
        })
}