const UsersService = require('../services/users-service')

class UsersController{
    async create(req, res,next){
        const {login, password} = req.body
        try{
            const user = await UsersService.create(login, password)
            return res.json(user)
        }catch (e){
            return next(e)
        }
    }

    async login(req, res, next){
        const {login, password, clientId, clientSecret} = req.body
        try{
            const user = await UsersService.login(login, password, clientId, clientSecret)
            return res.json(user)
        }catch (e){
            return next(e)
        }
    }

    async verify(req ,res, next){
        const auth = req.headers.authorization;
        try{
            const response = await UsersService.verify(auth.split(' ')[1])
            return res.json(response)
        }catch (e){
            return next(e)
        }
    }
}

module.exports = new UsersController()