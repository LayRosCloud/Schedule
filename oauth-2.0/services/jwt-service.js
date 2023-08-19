const jwt = require('jsonwebtoken')
const {UserEntity} = require('../core/models')
class JsonWebTokenService{
    async get(accessToken){
        const response = await UserEntity.findOne({where: {accessToken}})
        return response
    }

    verify(token){
        try{
            return jwt.verify(token, process.env.SECRET_KEY)
        }catch (e){
            return null
        }
    }

    create(payload){
        const token = jwt.sign(payload, process.env.SECRET_KEY)
        return token
    }
}

module.exports = new JsonWebTokenService()