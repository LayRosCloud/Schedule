const ClientService = require('../services/client-service')

class ClientController{
    async create(req, res,next){
        const {userId} = req.body
        try{
            const client = await ClientService.create(userId)
            return res.json(client)
        }catch (e){
            return next(e)
        }
    }
}

module.exports = new ClientController()