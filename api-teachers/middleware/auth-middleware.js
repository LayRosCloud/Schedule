const ApiError = require("../error/api-error");
const axios = require("axios");

module.exports = function (roles){
    return async function (req, res, next){
        try{
            const auth = req.headers.authorization;
            if(!auth){
                throw ApiError.badRequest('Пользователь не авторизован')
            }

            const accessToken = auth.split(' ')[1]
            if(!accessToken){
                throw ApiError.badRequest('Пользователь не авторизован')
            }

            const permissions = await axios.post(process.env.URL_VERIFY, {}, {headers: {
                    Authorization: `Bearer ${accessToken}`
                }})
            let hasRole = false
            for (const permission of permissions.data){
                const isRole = roles.includes(permission.role.name);
                if(isRole){
                    hasRole = isRole;
                    break;
                }
            }

            if(hasRole === false){
                throw ApiError.forbidden('Ошибка! Недостаточно прав!')
            }

            next();
        } catch (e){
            return next(e)
        }
    }
}