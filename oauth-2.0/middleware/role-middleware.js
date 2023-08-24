const ApiError = require("../exceptions/api-exception");
const usersService = require('../services/users-service')

module.exports = function (roles){
    return async function (req, res, next){
        try{
            const auth = req.headers.authorization;
            if(!auth){
                throw ApiError.notFound('Пользователь не авторизован')
            }

            const accessToken = auth.split(' ')[1]
            if(!accessToken){
                throw ApiError.notFound('Пользователь не авторизован')
            }
            const permissions = usersService.verify(accessToken).permissions
            let hasRole = false
            for (const permission of permissions){
                const isRole = roles.includes(permission.role.name);
                if(isRole){
                    hasRole = isRole;
                    break;
                }
            }

            if(hasRole === false){
                throw new Error('Недостаточно прав')
            }

            next();
        } catch (e){
            return next(e)
        }
    }
}